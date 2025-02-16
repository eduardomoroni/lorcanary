import { db } from "@/db/drizzle/index";
import { eq, inArray, or, sql } from "drizzle-orm";
import {
  deckVersions,
  deckVersionsToCards,
  gameResult,
} from "@/db/drizzle/schema";
import { CardWithQuantity, DeckVersionWithCards } from "@/db/drizzle/types";
import { getDeckColors } from "@/data/lorcanitoCards";
import { hashDeck, normalizeDeckInput } from "@/lib/utils";

export interface DeckStats {
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

type DeckVersion = typeof deckVersions.$inferSelect;
type DeckVersionWithRelations = DeckVersion & {
  cards: Array<{
    qty: number;
    card: {
      id: number;
      publicId: string;
    };
  }>;
  decks: Array<{
    deck: {
      id: number;
      name: string;
    };
  }>;
};

const withClause = {
  cards: {
    with: {
      card: {
        columns: {
          publicId: true,
          id: true,
        },
      },
    },
  },
  decks: {
    with: {
      deck: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

export const getDeckListStats = async (
  deckId: number,
): Promise<DeckStats | null> => {
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

  if (!stats) {
    return null;
  }

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
  const deckStats = await getDeckListStats(id);

  const deckList = await db.query.deckVersions.findFirst({
    where: or(eq(deckVersions.id, id), eq(deckVersions.publicId, publicId)),
    with: {
      cards: {
        columns: {
          qty: true,
        },
        with: {
          card: {
            columns: {
              id: true,
              publicId: true,
              name: true,
            },
          },
        },
      },
      currentPlayers: {
        limit: 25,
        // TODO: orderBy top 25 players
        orderBy: (players, { desc }) => [desc(players.rankedMMR)],
        columns: {
          id: true,
          name: true,
          rankedMMR: true,
        },
      },
    },
  });

  return { ...deckList, ...deckStats };
};

export const getOrCreateDeckVersion = async (
  cards: CardWithQuantity[] = [],
): Promise<DeckVersionWithCards> => {
  const cardsWithQuantity = normalizeDeckInput(cards);
  const colors = getDeckColors(
    cardsWithQuantity.map((c) => ({ publicId: c.publicId })),
  );

  // Generate hash from sorted cards and quantities
  const hash = hashDeck(cardsWithQuantity);

  // Check if version already exists
  const existingVersion = await db.query.deckVersions.findFirst({
    where: eq(deckVersions.hash, hash),
    with: withClause,
  });

  if (existingVersion) {
    return mapDeckVersion(existingVersion);
  }

  // Start a transaction
  const transaction = await db.transaction(async (tx) => {
    // Create new deck version
    const [newVersion] = await tx
      .insert(deckVersions)
      .values({
        hash,
        metadata: { colors },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!newVersion) {
      throw new Error("Failed to create deck version");
    }

    // Get all card IDs in one query
    const cardIds = await tx.query.cards.findMany({
      where: (fields) =>
        inArray(
          fields.publicId,
          cardsWithQuantity.map((c) => c.publicId),
        ),
      columns: {
        id: true,
        publicId: true,
      },
    });

    // Create card to version relationships
    const value = cardsWithQuantity.map((card) => {
      const dbCard = cardIds.find((c) => c.publicId === card.publicId);
      if (!dbCard) {
        throw new Error(`Card with publicId ${card.publicId} not found`);
      }
      return {
        deckVersionId: newVersion.id,
        cardId: dbCard.id,
        qty: card.qty,
      };
    });

    await tx.insert(deckVersionsToCards).values(value);

    console.log(
      `Created deck version ${newVersion.id} with ${cardsWithQuantity.length} cards`,
    );
    await tx.execute(sql`commit`);
    return newVersion;
  });

  // newVersion needs a with clause to get cards
  // return getDeckVersionById(transaction.id);
  return { ...transaction, cards: [], decks: [] };
};

function mapDeckVersion(
  version: DeckVersionWithRelations,
): DeckVersionWithCards {
  return {
    id: version.id,
    hash: version.hash,
    createdAt: version.createdAt,
    updatedAt: version.updatedAt,
    cards: version.cards.map((c) => ({
      qty: c.qty,
      publicId: c.card.publicId,
      id: c.card.id,
    })),
    decks: version.decks.map((d) => ({
      id: d.deck.id,
      name: d.deck.name,
    })),
  };
}
