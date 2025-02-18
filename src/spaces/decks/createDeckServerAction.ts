"use server";

import { countPlayerDecks, createDeck } from "@/db/drizzle/deck";
import { currentUser } from "@clerk/nextjs/server";

const DECK_LIMIT = 10;

export const createDeckServerAction = async (
  cards: Array<{ qty: number; publicId: string }>,
  formData: FormData,
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not SignedIn");
  }

  const decksCount = await countPlayerDecks({ ownerId: user.id });

  if (decksCount > DECK_LIMIT) {
    console.log("You have reached the maximum number of decks.");
    throw new Error("You have reached the maximum number of decks.");
  }

  const name = formData.get("name");

  if (!name || cards.length === 0 || typeof name !== "string") {
    throw new Error("Invalid deck name or cards");
  }

  return createDeck({ name, cards, playerId: user.id });
};
