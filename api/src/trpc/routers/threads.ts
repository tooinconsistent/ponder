import { z } from "zod";

import { router, userProcedure } from "@ponder/api/trpc/trpc.ts";
import { JSONContent } from "@ponder/api/lib/docs.ts";

import {
  createNewThread,
  getThreadById,
  replyInThread,
} from "@ponder/api/domains/channels/threads.ts";

export const threadsRouter = router({
  getById: userProcedure
    .input(
      z.object({
        threadId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getThreadById({ threadId: input.threadId }, ctx.pgConnection);
    }),

  createNewThread: userProcedure
    .input(
      z.object({
        channelId: z.string().uuid(),
        // TODO: Tighten this type
        title: z.string(),
        content: z.unknown(),
        contentPlain: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return createNewThread(
        {
          userId: ctx.userId,
          channelId: input.channelId,
          title: input.title,
          content: input.content as JSONContent,
          contentPlain: input.contentPlain,
        },
        ctx.pgConnection
      );
    }),

  replyInThread: userProcedure
    .input(
      z.object({
        threadId: z.string().uuid(),
        // TODO: Tighten this type
        content: z.unknown(),
        contentPlain: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return replyInThread(
        {
          userId: ctx.userId,
          threadId: input.threadId,
          content: input.content as JSONContent,
          contentPlain: input.contentPlain,
        },
        ctx.pgConnection
      );
    }),
});
