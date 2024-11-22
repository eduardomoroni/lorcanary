import type { DeckWithCards } from "@/db/types";
import { db } from "@/db/index";

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
} as const;

export const readDecks = async ({
  offset,
  limit,
}: {
  limit: number;
  offset: number;
}): Promise<DeckWithCards[]> => {
  const decks = await db.query.decks.findMany({
    limit,
    offset,
    with: withClause,
  });

  return decks.map((deck) => ({
    id: deck.id,
    name: deck.name,
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
        })) || [],
    },
  }));
};
