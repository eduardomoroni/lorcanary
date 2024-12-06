import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  index,
  real,
} from "drizzle-orm/pg-core";
import { type InferSelectModel, relations } from "drizzle-orm";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
} as const;

export const users = pgTable(`lorcanito-db_user`, {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  settings: jsonb("settings"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  profile: one(profiles),
  ranks: many(userRanks),
  decks: many(decks, { relationName: "deck_owner" }),
}));

export const categoryEnum = pgEnum("category", [
  "casual",
  "ranked",
  "private",
  "solo",
]);
export type GameCategory = (typeof categoryEnum.enumValues)[number];

export const colorEnum = pgEnum("color", [
  "amber",
  "amethyst",
  "ruby",
  "sapphire",
  "steel",
  "emerald",
]);
export type DBColor = (typeof colorEnum.enumValues)[number];

export const userRanks = pgTable("user_rank", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  category: categoryEnum(),
  gamesPlayed: integer("gamesPlayed").default(0).notNull(),
  gamesWon: integer("gamesWon").default(0).notNull(),
  rank: integer("rank").default(1200).notNull(),
  highestRank: integer("highestRank").default(1200).notNull(),
  ...timestamps,
});
export type SelectUserRank = InferSelectModel<typeof userRanks>;

export const userRanksRelations = relations(userRanks, ({ one }) => ({
  user: one(users, {
    fields: [userRanks.userId],
    references: [users.id],
  }),
}));

export const regionEnum = pgEnum("region", [
  "americas",
  "europe",
  "asia",
  "earth",
]);
export type PlayerRegion = (typeof regionEnum.enumValues)[number];

export type GameResultMetadata = {
  winnerElo: number;
  eloGained: number;
  loserElo: number;
  eloLost: number;
  winnerColors: string[];
  loserColors: string[];
  duration: number;
};

export type GameResult = {
  winnerId: number;
  winnerDeckId: number;
  loserId: number;
  loserDeckId: number;
  otp: number;
  otd: number;
  name?: string;
  metadata?: GameResultMetadata;
};

export const gameResult = pgTable(
  `game_result`,
  {
    id: serial("id").primaryKey(),
    winnerId: integer("winner_id").notNull(),
    winnerDeckId: integer("winner_deck_id").notNull(),
    loserId: integer("loser_id").notNull(),
    loserDeckId: integer("loser_deck_id").notNull(),
    otp: integer("otp").notNull(),
    otd: integer("otd").notNull(),
    name: varchar("name"),
    metadata: jsonb("metadata").$type<GameResultMetadata>(),
    ...timestamps,
  },
  (table) => {
    return {
      winnerIdIdx: index("winner_id_idx").on(table.winnerId),
      winnerDeckIdIdx: index("winner_deck_id_idx").on(table.winnerDeckId),
      loserIdIdx: index("loser_id_idx").on(table.loserId),
      loserDeckIdIdx: index("loser_deck_id_idx").on(table.loserDeckId),
      metadata: index("metadata_idx").on(table.metadata),
    };
  },
);

export const gameResultRelations = relations(gameResult, ({ one, many }) => ({
  winner: one(profiles, {
    fields: [gameResult.winnerId],
    references: [profiles.id],
    relationName: "game_result_winner",
  }),
  loser: one(profiles, {
    fields: [gameResult.loserId],
    references: [profiles.id],
    relationName: "game_result_loser",
  }),
  goingFirst: one(profiles, {
    fields: [gameResult.otp],
    references: [profiles.id],
    relationName: "going_first",
  }),
  goingSecond: one(profiles, {
    fields: [gameResult.otd],
    references: [profiles.id],
    relationName: "going_second",
  }),
  winningDeck: one(deckVersions, {
    fields: [gameResult.winnerDeckId],
    references: [deckVersions.id],
    relationName: "winning_deck",
  }),
  losingDeck: one(deckVersions, {
    fields: [gameResult.loserDeckId],
    references: [deckVersions.id],
    relationName: "losing_deck",
  }),
}));

export const profiles = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  tier: integer("tier").default(0).notNull(),
  region: regionEnum().default("earth").notNull(),
  country: varchar("country", { length: 255 }),
  userId: varchar("user_id").references(() => users.id),
  settings: jsonb("settings"),
  metadata: jsonb("metadata"),
  preferredColor: colorEnum(),
  rankedMMR: real("ranked_mmr").default(1200).notNull(),
  currentDeckId: integer("current_deck_id"), // This is a deck version id
  ...timestamps,
});
export type SelectProfile = InferSelectModel<typeof profiles>;

export const profileRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  decks: many(decks, { relationName: "deck_owner_profile" }),
  currentDeck: one(deckVersions, {
    fields: [profiles.currentDeckId],
    references: [deckVersions.id],
    relationName: "current_deck",
  }),
}));

export const cards = pgTable(`cards`, {
  id: serial("id").primaryKey(),
  publicId: varchar("public_id", { length: 255 })
    .notNull()
    .unique()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  cardData: jsonb("card_data").notNull(),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const cardsRelations = relations(cards, ({ many }) => ({
  decks: many(deckVersionsToCards),
}));

export const deckVersions = pgTable(`deck_versions`, {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull(),
  publicId: varchar("public_id", { length: 255 })
    .notNull()
    .unique()
    .$defaultFn(() => crypto.randomUUID()),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const deckVersionsRelations = relations(deckVersions, ({ many }) => ({
  cards: many(deckVersionsToCards),
  decks: many(deckVersionsToDecks),
  currentDecks: many(decks, {
    relationName: "deck_versioning",
  }),
  currentPlayers: many(profiles, {
    relationName: "current_deck",
  }),
}));

export const deckVersionsToDecks = pgTable(
  `deck_versions_to_decks`,
  {
    deckVersionId: integer("deck_version_id")
      .notNull()
      .references(() => deckVersions.id),
    deckId: integer("deck_id")
      .notNull()
      .references(() => decks.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.deckId, t.deckVersionId] }),
  }),
);

export const deckVersionsToDecksRelations = relations(
  deckVersionsToDecks,
  ({ one }) => ({
    deck: one(decks, {
      fields: [deckVersionsToDecks.deckId],
      references: [decks.id],
    }),
    deckVersion: one(deckVersions, {
      fields: [deckVersionsToDecks.deckVersionId],
      references: [deckVersions.id],
    }),
  }),
);

export const deckVersionsToCards = pgTable(
  `deck_versions_to_cards`,
  {
    deckVersionId: integer("deck_version_id")
      .notNull()
      .references(() => deckVersions.id),
    cardId: integer("card_id")
      .notNull()
      .references(() => cards.id),
    qty: integer("qty").default(1).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.deckVersionId] }),
  }),
);

export const deckVersionsToCardsRelations = relations(
  deckVersionsToCards,
  ({ one }) => ({
    card: one(cards, {
      fields: [deckVersionsToCards.cardId],
      references: [cards.id],
    }),
    deckVersion: one(deckVersions, {
      fields: [deckVersionsToCards.deckVersionId],
      references: [deckVersions.id],
    }),
  }),
);

// CLean up on delete
export const deckHistories = pgTable(`deck_histories`, {
  id: serial("id").primaryKey(),
  note: text("note"),
  versionId: integer("version").notNull(),
  deckId: integer("deck").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const deckHistoriesRelations = relations(deckHistories, ({ one }) => ({
  currentVersion: one(decks, {
    fields: [deckHistories.deckId],
    references: [decks.id],
    relationName: "deck_history",
  }),
}));

export const decks = pgTable(`decks`, {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  publicId: varchar("public_id", { length: 255 })
    .notNull()
    .unique()
    .$defaultFn(() => crypto.randomUUID()),
  ownerId: varchar("owner_id", { length: 255 }).notNull(),
  ownerProfileId: integer("owner_profile_id").notNull(),
  currentVersionId: integer("current_version_id").notNull(),
  ...timestamps,
});

export const decksRelations = relations(decks, ({ many, one }) => ({
  versions: many(deckVersionsToDecks),
  history: many(deckHistories, { relationName: "deck_history" }),
  ownerProfile: one(profiles, {
    fields: [decks.ownerProfileId],
    references: [profiles.id],
    relationName: "deck_owner_profile",
  }),
  owner: one(users, {
    fields: [decks.ownerId],
    references: [users.id],
    relationName: "deck_owner",
  }),
  currentVersion: one(deckVersions, {
    fields: [decks.currentVersionId],
    references: [deckVersions.id],
    relationName: "deck_versioning",
  }),
}));
