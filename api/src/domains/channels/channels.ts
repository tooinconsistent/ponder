import { DBClient } from "@ponder/api/lib/db.ts";

import {
  selectChannelsForUserInOrg,
  selectChannelById,
  unsafelySelectThreadsForChannelWithLatestPost,
} from "./queries/channels.queries.ts";

export const getChannelsForUser = async (
  { userId, organisationId }: { userId: string; organisationId: string },
  pgConnection: DBClient
) => {
  const result = await selectChannelsForUserInOrg.execute(
    { userId, organisationId },
    pgConnection
  );

  return result;
};

export const getChannelById = async (
  {
    userId,
    channelId,
  }: {
    userId: string;
    channelId: string;
  },
  pgConnection: DBClient
) => {
  const [channel] = await selectChannelById.execute(
    {
      channelId,
      userId,
    },
    pgConnection
  );

  if (!channel) {
    return null;
  }

  const threads = (
    await unsafelySelectThreadsForChannelWithLatestPost.execute(
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
