export interface Card {
  qty: number;
  card: {
    id: number;
    publicId: string;
    name: string;
  };
}

export interface Player {
  id: number;
  name: string;
  rankedMMR: number;
}

export interface DeckStats {
  id: number;
  hash: string;
  publicId: string;
  metadata: {
    colors: string[];
  };
  createdAt: string;
  updatedAt: string;
  cards: Card[];
  currentPlayers: Player[];
  deck_id: number;
  total_games: number;
  total_games_otd: number;
  total_games_otp: number;
  total_games_mirror: number;
  win_rate: number;
  win_rate_otd: number;
  win_rate_otp: number;
  avg_duration: number;
  distinct_players: number;
  median_duration: number;
  liveGames?: string[];
}
