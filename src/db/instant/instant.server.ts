import "server-only";
import { init } from "@instantdb/admin";
import { env } from "@/env.mjs";

const instantServerSideDB = init({
  appId: env.NEXT_PUBLIC_INSTANT_APP_ID,
  adminToken: env.INSTANT_APP_ADMIN_TOKEN,
});

export async function getLiveGamesByDeckListId(deckListId: number) {
  const response = await instantServerSideDB.query({
    lobbies: {
      $: {
        // Matches last 20min on average, and we have 300 matches per hour
        // So we should have 100 matches in the last 20min
        // and half of them are worth watching
        limit: 100,
        order: {
          serverCreatedAt: "desc",
        },
        where: {
          and: [
            {
              gameId: {
                $isNull: false,
              },
            },
          ],
        },
      },
    },
  });

  return response.lobbies
    .filter((lobby) => {
      return lobby.deckLists?.includes(deckListId);
    })
    .map((lobby) => lobby.gameId);
}
