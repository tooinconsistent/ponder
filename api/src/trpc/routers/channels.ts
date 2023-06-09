import { z } from "zod";

import { router, userProcedure } from "@ponder/api/trpc/trpc.ts";

import {
  getChannelById,
  getAllChannelsForUser,
  getJoinedChannelsForUser,
} from "@ponder/api/domains/channels/channels.ts";

export const channelsRouter = router({
  listAll: userProcedure
    .input(
      z.object({
        organisationId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getAllChannelsForUser(
        {
          organisationId: input.organisationId,
        },
        ctx.pgConnection
      );
    }),
  listJoined: userProcedure
    .input(
      z.object({
        organisationId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return getJoinedChannelsForUser(
        {
          organisationId: input.organisationId,
          userId: ctx.userId,
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
