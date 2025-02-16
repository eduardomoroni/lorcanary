import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@clerk/nextjs/server";
import { createTRPCContext } from "@/data/api/trpc";
import { AppRouter, createCaller } from "@/data/api/root";
import { createQueryClient } from "@/data/api/query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const init = await headers();
  const heads = new Headers(init);
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    auth: await auth(),
    headers: heads,
    // TODO: This can cause problems
    req: {} as never,
    res: {} as never,
  });
});

const getQueryClient = cache(createQueryClient);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
