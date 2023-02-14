import { z } from "zod";

import {
  publicProcedure,
  router,
  userProcedure,
} from "@tooinconsistent/api/trpc/trpc.js";

import { getUserIdFromEmailAndPassword } from "@tooinconsistent/api/domains/auth/auth.js";
import { createSession } from "@tooinconsistent/api/domains/auth/session.js";

export const authRouter = router({
  whoami: publicProcedure.query(({ ctx }) => {
    return { userId: ctx.userId };
  }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().regex(/[^@]+@[^@]+\.[^@]+/),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input: { email, password }, ctx: { pgConnection } }) => {
      const userId = await getUserIdFromEmailAndPassword(
        { email, password },
        pgConnection
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
    }),

  logout: userProcedure.mutation(() => {}),
});
