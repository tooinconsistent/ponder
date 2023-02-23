import { z } from "zod";

import { router, userProcedure } from "@tooinconsistent/api/trpc/trpc.js";

import {
  getChannelById,
  getChannelsForUser,
} from "@tooinconsistent/api/domains/channels/channels.js";

export const channelsRouter = router({
  listAll: userProcedure
    .input(
      z.object({
        organisationId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getChannelsForUser(
        {
          userId: ctx.userId,
          organisationId: input.organisationId,
        },
        ctx.pgConnection
      );
    }),
  getById: userProcedure
    .input(
      z.object({
        channelId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getChannelById(
        { userId: ctx.userId, channelId: input.channelId },
        ctx.pgConnection
      );
    }),
});
