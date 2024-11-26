import { db } from "@/db/drizzle/index";
import { eq, or, sql } from "drizzle-orm";
import { deckVersions, gameResult } from "@/db/drizzle/schema";

interface DeckStats {
  deck_id: number;
  total_games: number;
  total_games_otd: number;
  total_games_otp: number;
  total_games_mirror: number;
  win_rate: number;
  win_rate_otd: number;
  win_rate_otp: number;
  avg_duration: number;
  median_duration: number;
  distinct_players: number;
}

export const getDeckStats = async (deckId: number): Promise<DeckStats> => {
  const statsQuery = await db
    .select({
      total_games: sql<number>`
          COUNT(*) FILTER (WHERE winner_deck_id = ${deckId} OR loser_deck_id = ${deckId})
        `.as("total_games"),
      total_games_otd: sql<number>`
          COUNT(*) FILTER (WHERE (winner_deck_id = ${deckId} AND winner_id = otd) OR (loser_deck_id = ${deckId} AND loser_id = otd))
        `.as("total_games_otd"),
      total_games_otp: sql<number>`
          COUNT(*) FILTER (WHERE (winner_deck_id = ${deckId} AND winner_id = otp) OR (loser_deck_id = ${deckId} AND loser_id = otp))
        `.as("total_games_otp"),
      total_games_mirror: sql<number>`
          COUNT(*) FILTER (WHERE winner_deck_id = ${deckId} AND loser_deck_id = ${deckId})
        `.as("total_games_mirror"),
      wins: sql<number>`
          COUNT(*) FILTER (WHERE winner_deck_id = ${deckId})
        `.as("wins"),
      wins_otd: sql<number>`
          COUNT(*) FILTER (WHERE winner_deck_id = ${deckId} AND winner_id = otd)
        `.as("wins_otd"),
      wins_otp: sql<number>`
          COUNT(*) FILTER (WHERE winner_deck_id = ${deckId} AND winner_id = otp)
        `.as("wins_otp"),
      avg_duration: sql<number>`AVG((metadata->>'duration')::float)`.as(
        "avg_duration",
      ),
      median_duration:
        sql<number>`PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (metadata->>'duration')::float)`.as(
          "median_duration",
        ),
      distinct_players: sql<number>`
        COUNT(DISTINCT CASE 
            WHEN winner_deck_id = ${deckId} THEN winner_id
            WHEN loser_deck_id = ${deckId} THEN loser_id
            ELSE NULL
        END)
      `.as("distinct_players"),
    })
    .from(gameResult)
    .where(sql`winner_deck_id = ${deckId} OR loser_deck_id = ${deckId}`)
    .groupBy(sql`${deckId}`);

  const stats = statsQuery[0];

  return {
    deck_id: deckId,
    total_games: Number(stats.total_games),
    total_games_otd: Number(stats.total_games_otd),
    total_games_otp: Number(stats.total_games_otp),
    total_games_mirror: Number(stats.total_games_mirror),
    win_rate: Number((stats.wins / stats.total_games) * 100),
    win_rate_otd: Number((stats.wins_otd / stats.total_games_otd) * 100),
    win_rate_otp: Number((stats.wins_otp / stats.total_games_otp) * 100),
    avg_duration: Math.round(Number(stats.avg_duration)),
    median_duration: Number(stats.median_duration),
    distinct_players: Number(stats.distinct_players),
  };
};

export const readList = async ({
  id,
  publicId,
}: {
  publicId: string;
  id: number;
}) => {
  const deckStats = await getDeckStats(id);

  const deckList = await db.query.deckVersions.findFirst({
    where: or(eq(deckVersions.id, id), eq(deckVersions.publicId, publicId)),
    with: {
      cards: {
        columns: {
          qty: true,
          cardId: true,
        },
      },
      currentPlayers: {
        limit: 25,
        // TODO: orderBy top 25 players
        orderBy: (players, { desc }) => [desc(players.id)],
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { ...deckList, ...deckStats };
};
