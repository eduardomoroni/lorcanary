export interface MatchupData {
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
}

export interface ProcessedMatchupData {
  [deck: string]: {
    [versus: string]: MatchupData;
  };
}

export type TimeRange =
  | "all"
  | "week"
  | "two-weeks"
  | "month"
  | "three-months"
  | "six-months"
  | "year"
  | "two-years"
  | "custom";
export type SortType = "matches" | "winrate" | "alphabetical";
