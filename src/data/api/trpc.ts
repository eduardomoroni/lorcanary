import { initTRPC, TRPCError } from "@trpc/server";
import { z, ZodError } from "zod";
import type { AuthObject } from "@clerk/backend";
import type { NextRequest, NextResponse } from "next/server";
import superjson from "superjson";
import { currentUser } from "@clerk/nextjs/server";

export type CreateContextOptions = {
  req: NextRequest;
  res: NextResponse;
  auth: AuthObject;
  userProfileId?: number;
  tier?: number;
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: AuthObject;
  req: NextRequest;
  res: NextResponse;
}) => {
  // Get the session from the server using the getServerSession wrapper function
  const start = performance.now();
  const end = performance.now();
  console.log(
    `createTRPCContext took ${(end - start).toFixed(3)}ms to execute`,
  );
  const context: CreateContextOptions = {
    auth: opts.auth,
    req: opts.req,
    res: opts.res,
  };
  return createInnerTRPCContext(context);
};

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createInnerTRPCContext = (
  opts: CreateContextOptions,
): CreateContextOptions => {
  return {
    res: opts.res,
    req: opts.req,
    auth: opts.auth,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  // disabled for now
  // if (t._config.isDev) {
  //   // artificial delay in dev
  //   const waitMs = Math.floor(Math.random() * 400) + 100;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */

export const authenticatedProcedure = t.procedure.use(timingMiddleware).use(
  t.middleware(async ({ ctx, next, input }) => {
    if (!ctx.auth || !ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (input?.playerId && input.playerId !== ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = await currentUser();
    const discordId = user?.publicMetadata.discordId;
    const userTier = user?.publicMetadata.tier || 0;
    const userProfileId = user?.publicMetadata.profileId || 0;

    return next({
      ctx: {
        ...ctx,
        auth: ctx.auth,
        discordId: discordId,
        userTier,
        userProfileId,
      },
    });
  }),
);
