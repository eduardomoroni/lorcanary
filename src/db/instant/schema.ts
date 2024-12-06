export type Game = {
  id: string;
  name: string;
  visibility: "public" | "private";
  mode: "best-of-one" | "best-of-two" | "best-of-three";
  category: "casual" | "ranked" | "private";
  lobbyId: string;
  matchesId: string[];
  winner?: string | null;
  createdAt: number;
  updatedAt: number;
};

export type Lobby = {
  id: string;
  name: string;
  visibility: "public" | "private";
  status: "started" | "waiting" | "created" | "rejected";
  mode: Game["mode"];
  enforcement?: "casual" | "competitive";
  category: "casual" | "ranked" | "private" | "solo";
  gameId?: string;
  deckLists: number[];
  createdAt: number;
  updatedAt: number;
  players: Record<string, { name: string; id: string; deckVersionId: number }>;
  decks: Record<string, { qty: number; publicId: string }>;
};

export type Schema = {
  lobbies: Lobby;
  games: Game;
};
