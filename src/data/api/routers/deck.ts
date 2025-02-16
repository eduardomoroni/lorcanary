import { z } from "zod";
import { authenticatedProcedure, createTRPCRouter } from "@/data/api/trpc";
import { countPlayerDecks, createDeck } from "@/db/drizzle/deck";

const DECK_LIMIT = 10;

export const deckRouter = createTRPCRouter({
  createDeck: authenticatedProcedure
    .input(
      z.object({
        name: z.string(),
        cards: z.array(
          z.object({
            publicId: z.string(),
            qty: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const decksCount = await countPlayerDecks({ ownerId: ctx.auth.userId });

        if (decksCount > DECK_LIMIT) {
          console.log("You have reached the maximum number of decks.");
          throw new Error("You have reached the maximum number of decks.");
        }

        return createDeck({ ...input, playerId: ctx.auth.userId });
      } catch (e) {
        console.error(e);
        throw new Error("Failed to create deck.", e as Error);
      }
    }),
});
