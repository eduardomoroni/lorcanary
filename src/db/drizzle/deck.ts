import {
  CardWithQuantity,
  DBDeckWithCards,
  DeckThumbnail,
  DeckWithCardsAndStats,
} from "@/db/drizzle/types";
import { db } from "@/db/drizzle/index";
import { deckHistories, decks, deckVersionsToDecks } from "@/db/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { getCardById, getDeckColors } from "@/data/lorcanitoCards";
import {
  getDeckListStats,
  getOrCreateDeckVersion,
} from "@/db/drizzle/deck-versions";
import { getProfileByUserId } from "@/db/drizzle/profile";

type EitherOrIds = {
  ownerId: string;
};

const withClauseDeckThumbnails = {
  currentVersion: {
    with: {
      cards: {
        columns: {
          qty: true,
        },
        with: {
          card: {
            columns: {
              publicId: true,
              id: true,
            },
          },
        },
      },
    },
  },
  owner: {
    columns: {
      name: true,
    },
  },
} as const;

const withClause = {
  history: true,
  versions: {
    columns: {
      deckVersionId: true,
    },
  },
  currentVersion: {
    with: {
      cards: {
        columns: {
          qty: true,
        },
        with: {
          card: {
            columns: {
              publicId: true,
              id: true,
            },
          },
        },
      },
    },
  },
  owner: {
    columns: {
      name: true,
    },
  },
} as const;

export const readDecks = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<DeckThumbnail[]> => {
  const data = await db.query.decks.findMany({
    limit,
    offset,
    where: eq(decks.visibility, "public"),
    with: withClauseDeckThumbnails,
  });

  return data.map((deck) => ({
    id: deck.id,
    name: deck.name,
    ownerName: deck.owner?.name,
    ownerProfileId: deck.ownerProfileId,
    deckColors: getDeckColors(deck.currentVersion?.cards.map((c) => c.card)),
    ownerId: deck.ownerId,
    publicId: deck.publicId,
  }));
};

export const readDeck = async (
  publicId: string,
): Promise<DeckWithCardsAndStats> => {
  const deck = await db.query.decks.findFirst({
    where: eq(decks.publicId, publicId),
    with: withClause,
  });

  if (!deck) {
    throw Error("Deck not found");
  }

  const deckStats = await getDeckListStats(deck.id);

  return {
    id: deck.id,
    name: deck.name,
    ownerName: deck.owner?.name,
    ownerId: deck.ownerId,
    ownerProfileId: deck.ownerProfileId,
    publicId: deck.publicId,
    versions: deck.versions.map((v) => v.deckVersionId) || [],
    history:
      deck.history.map((h) => ({
        id: h.versionId,
        note: h.note || "",
        date: new Date(h.createdAt),
      })) || [],
    currentVersion: {
      id: deck.currentVersion?.id,
      cards:
        deck.currentVersion?.cards?.map((c) => ({
          qty: c.qty,
          publicId: c.card.publicId,
          id: c.card.id,
          lorcanitoCard: getCardById(c.card.publicId),
        })) || [],
    },
    stats: deckStats,
  };
};

export const countDecks = async (): Promise<number> => {
  try {
    return db.$count(decks, eq(decks.visibility, "public"));
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const countPlayerDecks = async (
  params: EitherOrIds,
): Promise<number> => {
  const { ownerId } = params;
  return db.$count(decks, eq(decks.ownerId, ownerId));
};

export const createDeck = async (params: {
  name: string;
  cards: CardWithQuantity[];
  playerId: string;
}): Promise<DBDeckWithCards> => {
  const { name, cards, playerId } = params;
  const existingVersion = await getOrCreateDeckVersion(cards);

  if (!existingVersion || !existingVersion.id) {
    throw new Error("Failed to create deck version");
  }

  const profile = await getProfileByUserId(playerId);

  // Create the deck
  const newDeck = await db.transaction(async (tx) => {
    const [newDeck] = await tx
      .insert(decks)
      .values({
        name,
        ownerId: playerId,
        ownerProfileId: profile.id,
        currentVersionId: existingVersion.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!newDeck) {
      throw new Error("Failed to create deck");
    }

    await tx.insert(deckVersionsToDecks).values({
      deckId: newDeck.id,
      deckVersionId: existingVersion.id,
    });
    await tx.insert(deckHistories).values({
      deckId: newDeck.id,
      versionId: existingVersion.id,
      createdAt: new Date(),
      note: "Initial deck version",
    });

    await tx.execute(sql`commit`);

    return newDeck;
  });

  return { ...newDeck, cards: existingVersion.cards };
};
