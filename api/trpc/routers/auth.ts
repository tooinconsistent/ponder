import { z } from "npm:zod";

import { publicProcedure, router, userProcedure } from "@/trpc/trpc.ts";

import { getUserIdFromEmailAndPassword } from "@/domains/auth/auth.ts";
import { createSession } from "@/domains/auth/session.ts";

export const authRouter = router({
  whoami: publicProcedure.query(({ ctx }) => {
    return { userId: ctx.userId };
  }),

  login: publicProcedure.input(z.object({
    email: z.string().regex(/[^@]+@[^@]+\.[^@]+/),
    password: z.string().min(8),
  })).mutation(
    async ({ input: { email, password }, ctx: { pgConnection } }) => {
      const userId = await getUserIdFromEmailAndPassword(
        { email, password },
        pgConnection,
      );

      if (userId) {
        const { sessionId } = await createSession(userId, pgConnection);

        // TODO: Add some token generation here, so it's not just a row uuid value
        return {
          token: sessionId,
        };
      }

      return {
        token: null,
      };
    },
  ),

  logout: userProcedure.mutation(() => {}),
});
