export interface MatchupData {
  deck: string;
  versus: string;
  total_matches: string;
  wins: string;
  overall_winrate: string;
  wins_on_play: string;
  matches_on_play: string;
  play_winrate: string;
  wins_on_draw: string;
  matches_on_draw: string;
  draw_winrate: string;
  mirror_matches: string;
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
