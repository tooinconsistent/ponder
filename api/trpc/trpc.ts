import { initTRPC } from "npm:@trpc/server";
import superjson from "npm:superjson";

import type { Context } from "./context.ts";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// const isAuthed = t.middleware(({ next, ctx }) => {
//   if (!ctx.user) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//     });
//   }
//   return next({
//     ctx: {
//       // Infers the `session` as non-nullable
//       uset: ctx.user,
//     },
//   });
// });

export const middleware = t.middleware;
export const router = t.router;

// Procedure helpers
export const publicProcedure = t.procedure;
export const userProcedure = t.procedure;
