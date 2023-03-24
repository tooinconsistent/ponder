import { DBClient } from "@ponder/api/lib/db.ts";

import {
  selectChannelInOrg,
  selectChannelById,
  selectThreadsForChannelWithLatestPost,
} from "./queries/channels.queries.ts";

export const getChannelsForUser = async (
  { organisationId }: { organisationId: string },
  pgConnection: DBClient
) => {
  const result = await selectChannelInOrg.execute(
    { organisationId },
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
