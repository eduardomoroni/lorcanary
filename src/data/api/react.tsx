"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, TRPCLink } from "@trpc/react-query";
import { httpLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { createQueryClient } from "./query-client";
import { observable } from "@trpc/server/observable";
import { AppRouter } from "@/data/api/root";

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const customLink: TRPCLink<AppRouter> = () => {
    return ({ next, op }) => {
      return observable((observer) => {
        const unsubscribe = next(op).subscribe({
          next(value) {
            observer.next(value);
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            observer.complete();
          },
        });

        return unsubscribe;
      });
    };
  };

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        customLink,
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpLink({
          transformer: superjson,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
