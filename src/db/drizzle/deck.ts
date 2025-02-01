import { DeckThumbnail, DeckWithCardsAndStats } from "@/db/drizzle/types";
import { db } from "@/db/drizzle/index";
import { decks } from "@/db/drizzle/schema";
import { count, eq } from "drizzle-orm";
import { getCardById, getDeckColors } from "@/data/lorcanitoCards";
import { getDeckListStats } from "@/db/drizzle/deck-versions";

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
    const [rows] = await db
      .select({ count: count() })
      .from(decks)
      .where(eq(decks.visibility, "public"));
    return rows.count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
