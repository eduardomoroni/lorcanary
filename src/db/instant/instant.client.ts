import { env } from "@/env.mjs";
import type { Schema } from "@/db/instant/schema";
import { init } from "@instantdb/react";

export const instantClientSideDB = init<Schema>({
  appId: env.NEXT_PUBLIC_INSTANT_APP_ID,
  devtool: false,
});

export function useLiveGamesByDeckListId(deckListId: string) {
  const { data, isLoading, error } = instantClientSideDB.useQuery({
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

  return {
    data:
      data?.lobbies.filter((lobby) => {
        return lobby.deckLists?.includes(Number(deckListId));
      }) || [],
    isLoading,
    error,
  };
}
