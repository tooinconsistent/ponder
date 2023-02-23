import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context.js";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;

const isAuthenticated = middleware(({ next, ctx }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // Infers the `userId` as non-nullable
      userId: ctx.userId,
    },
  });
});

// Procedure helpers
export const publicProcedure = t.procedure;
export const userProcedure = t.procedure.use(isAuthenticated);
