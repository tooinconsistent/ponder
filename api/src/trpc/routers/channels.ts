import { z } from "zod";

import { router, userProcedure } from "@ponder/api/trpc/trpc.ts";

import {
  getChannelById,
  getChannelsForUser,
} from "@ponder/api/domains/channels/channels.ts";

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
      return getChannelById({ channelId: input.channelId }, ctx.pgConnection);
    }),
});
