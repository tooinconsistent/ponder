import { DBClient } from "@ponder/api/lib/db.ts";

import {
  selectAllChannelslInOrg,
  selectAllChannelsJoinedByUser,
  selectChannelById,
  selectThreadsForChannelWithLatestPost,
} from "./queries/channels.queries.ts";

export const getAllChannelsForUser = async (
  { organisationId }: { organisationId: string },
  pgConnection: DBClient
) => {
  const result = await selectAllChannelslInOrg.execute(
    { organisationId },
    pgConnection
  );

  return result;
};

export const getJoinedChannelsForUser = async (
  { organisationId, userId }: { organisationId: string; userId: string },
  pgConnection: DBClient
) => {
  const result = await selectAllChannelsJoinedByUser.execute(
    { organisationId, userId },
    pgConnection
  );

  return result;
};

export const getChannelById = async (
  {
    channelId,
  }: {
    channelId: string;
  },
  pgConnection: DBClient
) => {
  const [channel] = await selectChannelById.execute(
    {
      channelId,
    },
    pgConnection
  );

  if (!channel) {
    return null;
  }

  const threads = (
    await selectThreadsForChannelWithLatestPost.execute(
      {
        channelId,
      },
      pgConnection
    )
  ).map((thread) => ({
    id: thread.id,
    channelId: thread.channelId,
    title: thread.title,
    latestPost: {
      id: thread.latestPostId,
      createdAt: thread.latestPostCreatedAt,
      contentPlain: thread.latestPostContentPlain,
      authorId: thread.latestPostAuthorId,
      author: {
        avatarUrl: thread.latestPostAuthorAvatarUrl,
        displayName: thread.latestPostAuthorDisplayName,
      },
    },
  }));

  return {
    ...channel,
    threads,
  };
};
