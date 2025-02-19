import { COLOR_COMBINATIONS_TUPLE } from "@/spaces/meta/constants";
import { sql, eq, desc, and, isNotNull } from "drizzle-orm";
import { DBColor, GameCategory, matches } from "@/db/drizzle/schema";
import { db } from "@/db/drizzle/index";

type ColorMatchupStats = {
  deck: string;
  versus: string;
  total_matches: number;
  wins: number;
  overall_winrate: number;
  wins_on_play: number;
  matches_on_play: number;
  play_winrate: number;
  wins_on_draw: number;
  matches_on_draw: number;
  draw_winrate: number;
  mirror_matches: number;
};

export async function getColorMatchupPerformance(
  colors: DBColor[],
): Promise<ColorMatchupStats[]> {
  const colorArray = sql`ARRAY[${sql.join(colors, sql`, `)}]::color[]`;

  const result = await db.execute<ColorMatchupStats>(sql`
    WITH RECURSIVE 
    target_colors AS (
      SELECT ${colorArray} as colors
    ),
    match_colors AS (
      SELECT 
        ${matches.id},
        ${matches.winnerColors},
        ${matches.loserColors},
        ${matches.winnerId},
        ${matches.loserId},
        ${matches.otp},
        ${matches.otd},
        ${matches.category},
        array(SELECT UNNEST(${matches.winnerColors}) ORDER BY 1) = array(SELECT UNNEST(${matches.loserColors}) ORDER BY 1) as is_mirror,
        CASE
          WHEN array(SELECT UNNEST(${matches.winnerColors}) ORDER BY 1) = array(SELECT UNNEST(target_colors.colors) ORDER BY 1) THEN 'winner'
          ELSE 'loser'
        END as our_position
      FROM ${matches}
      CROSS JOIN target_colors
      WHERE 
        array(SELECT UNNEST(${matches.winnerColors}) ORDER BY 1) = array(SELECT UNNEST(target_colors.colors) ORDER BY 1)
        OR array(SELECT UNNEST(${matches.loserColors}) ORDER BY 1) = array(SELECT UNNEST(target_colors.colors) ORDER BY 1)
    ),
    matchups AS (
      SELECT 
        CASE 
          WHEN our_position = 'winner' THEN array(SELECT UNNEST(loser_colors) ORDER BY 1)
          ELSE array(SELECT UNNEST(winner_colors) ORDER BY 1)
        END as opponent_colors,
        is_mirror,
        COUNT(*) as total_matches,
        COUNT(*) FILTER (WHERE our_position = 'winner') as wins,
        COUNT(*) FILTER (WHERE 
          CASE 
            WHEN our_position = 'winner' THEN otp = winner_id
            ELSE otp = loser_id
          END
        ) as matches_on_play,
        COUNT(*) FILTER (WHERE 
          our_position = 'winner' 
          AND otp = winner_id
        ) as wins_on_play,
        COUNT(*) FILTER (WHERE 
          CASE 
            WHEN our_position = 'winner' THEN otd = winner_id
            ELSE otd = loser_id
          END
        ) as matches_on_draw,
        COUNT(*) FILTER (WHERE 
          our_position = 'winner' 
          AND otd = winner_id
        ) as wins_on_draw
      FROM match_colors
      WHERE category = 'ranked'
      GROUP BY opponent_colors, is_mirror
    )
    SELECT 
      array_to_string(opponent_colors, ', ') as versus,
      total_matches,
      wins,
      ROUND((wins::decimal / NULLIF(total_matches, 0) * 100), 2) as overall_winrate,
      wins_on_play,
      matches_on_play,
      ROUND((wins_on_play::decimal / NULLIF(matches_on_play, 0) * 100), 2) as play_winrate,
      wins_on_draw,
      matches_on_draw,
      ROUND((wins_on_draw::decimal / NULLIF(matches_on_draw, 0) * 100), 2) as draw_winrate,
      CASE WHEN is_mirror THEN total_matches ELSE 0 END as mirror_matches
    FROM matchups
    WHERE total_matches >= 1
    ORDER BY total_matches DESC
  `);

  return result.map((row) => ({ ...row, deck: colors.join(", ") }));
}

interface DeckStats {
  deck_id: string;
  usage_count: number;
}

interface DeckWinRate {
  deck_id: string;
  wins: number;
  total_games: number;
  win_rate: number;
}

interface PlayerWinRate {
  player_id: string;
  wins: number;
  total_games: number;
  win_rate: number;
}

interface DeckStats {
  deck_id: string;
  wins: number;
  total_games: number;
  win_rate: number;
  avg_duration: number;
  median_duration: number;
}

interface PlayerStats {
  player_id: string;
  wins: number;
  total_games: number;
  win_rate: number;
  avg_duration: number;
  median_duration: number;
}

interface ServerStats {
  timeStats: {
    avg_duration: number;
    median_duration: number;
  };
  peakHours: Array<{
    hour: number;
    count: number;
  }>;
  peakDays: Array<{
    day: string;
    count: number;
  }>;
  topDecksByWinRate: DeckStats[];
  topPlayersByWinRate: PlayerStats[];
  deckStatsByColor: Array<{
    color: string;
    wins: number;
    total_games: number;
    matches_percentage: number;
    win_rate: number;
    avg_duration: number;
    median_duration: number;
  }>;
}

export async function matchupPerformanceCSV() {
  const results = await Promise.all(
    COLOR_COMBINATIONS_TUPLE.map((colors) =>
      getColorMatchupPerformance(colors),
    ),
  );

  return [
    "deck,versus,total_matches,wins,overall_winrate,wins_on_play,matches_on_play,play_winrate,wins_on_draw,matches_on_draw,draw_winrate,mirror_matches",
    ...results
      .flat()
      .map((row) => ({
        deck: row.deck
          .split(",")
          .map((a) => a.trimStart())
          .join("/"),
        versus: row.versus
          .split(",")
          .map((a) => a.trimStart())
          .join("/"),
        total_matches: row.total_matches,
        wins: row.wins,
        overall_winrate: row.overall_winrate,
        wins_on_play: row.wins_on_play,
        matches_on_play: row.matches_on_play,
        play_winrate: row.play_winrate,
        wins_on_draw: row.wins_on_draw,
        matches_on_draw: row.matches_on_draw,
        draw_winrate: row.draw_winrate,
        mirror_matches: row.mirror_matches,
      }))
      .map((row) => Object.values(row).join(",")),
  ];
}

export async function matchupPerformance() {
  const results = await Promise.all(
    COLOR_COMBINATIONS_TUPLE.map((colors) =>
      getColorMatchupPerformance(colors),
    ),
  );

  return results.flat().map((row) => ({
    deck: row.deck
      .split(",")
      .map((a) => a.trimStart())
      .join("/"),
    versus: row.versus
      .split(",")
      .map((a) => a.trimStart())
      .join("/"),
    total_matches: row.total_matches,
    wins: row.wins,
    overall_winrate: row.overall_winrate,
    wins_on_play: row.wins_on_play,
    matches_on_play: row.matches_on_play,
    play_winrate: row.play_winrate,
    wins_on_draw: row.wins_on_draw,
    matches_on_draw: row.matches_on_draw,
    draw_winrate: row.draw_winrate,
    mirror_matches: row.mirror_matches,
  }));
}
