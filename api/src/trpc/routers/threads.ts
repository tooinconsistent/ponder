import { z } from "zod";

import { router, userProcedure } from "@tooinconsistent/api/trpc/trpc.js";

import {
  getThreadById,
  replyInThread,
} from "@tooinconsistent/api/domains/channels/threads.js";

export const threadsRouter = router({
  getById: userProcedure
    .input(
      z.object({
        threadId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getThreadById(
        { userId: ctx.userId, threadId: input.threadId },
        ctx.pgConnection
      );
    }),

  replyInThread: userProcedure
    .input(
      z.object({
        threadId: z.string().uuid(),
        // TODO: Tighten this type
        content: z.any(),
        contentPlain: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return replyInThread(
        {
          userId: ctx.userId,
          threadId: input.threadId,
          content: input.content,
          contentPlain: input.contentPlain,
        },
        ctx.pgConnection
      );
    }),
});
