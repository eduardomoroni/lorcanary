import { type InferSelectModel } from "drizzle-orm";
import { users } from "./schema";
import { CardColor, LorcanitoCard } from "@/shared/types/lorcanito";

export type User = InferSelectModel<typeof users>;

export interface BaseDeck {
  id: number;
  name: string;
  ownerName: string | null;
  ownerProfileId: number;
  publicId: string;
  ownerId: string;
}

export interface DeckThumbnail extends BaseDeck {
  deckColors: CardColor[];
}

// Define the type for the current version of the deck
export type CurrentVersion = {
  id: number; // Assuming 'id' is the version ID
  cards: Array<DBCardWIthCardJson>;
};

// Define the type for the deck
export type DeckWithCards = {
  id: number;
  name: string;
  versions: number[]; // Array of deck version IDs
  publicId: string;
  ownerId: string;
  ownerName: string | null;
  ownerProfileId: number;
  currentVersion: CurrentVersion;
  history: Array<{
    id: number;
    note: string;
    date: Date;
  }>;
};

// Define the types for the cards
export type DBCard = {
  qty: number;
  publicId: string;
  id: number; // Assuming 'id' is the card's ID
};

export type DBCardWIthCardJson = {
  qty: number;
  publicId: string;
  id: number; // Assuming 'id' is the card's ID
  lorcanitoCard: LorcanitoCard;
};

export type CardWithQuantity = {
  publicId: string;
  qty: number;
};

export type DeckVersionWithCards = {
  id: number;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  cards: Array<DBCard>;
  decks: Array<{ id: number; name: string }>;
};

export type DBDeckWithCards = {
  id: number;
  currentVersionId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  cards: DeckVersionWithCards["cards"];
  ownerId: string;
  ownerProfileId: number;
  publicId: string;
};
