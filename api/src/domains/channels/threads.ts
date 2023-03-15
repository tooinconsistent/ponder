import { DBClient } from "@ponder/api/lib/db.js";

import { JSONContent } from "@ponder/api/lib/docs.js";

import {
  selectThreadById,
  unsafelyInsertNewPostForThread,
  unsafelyInsertNewThreadInChannel,
  unsafelySelectPostsForThread,
} from "./queries/threads.queries.js";
import { selectChannelById } from "./queries/channels.queries.js";

export const getThreadById = async (
  {
    userId,
    threadId,
  }: {
    userId: string;
    threadId: string;
  },
  pgConnection: DBClient
) => {
  const [thread] = await selectThreadById.execute(
    {
      threadId,
      userId,
    },
    pgConnection
  );

  if (!thread) {
    return null;
  }

  const posts = (
    await unsafelySelectPostsForThread.execute(
      {
        threadId,
      },
      pgConnection
    )
  ).map((post) => ({
    id: post.id,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      id: post.authorId,
      avatarUrl: post.avatarUrl,
      displayName: post.displayName,
    },
  }));

  return {
    ...thread,
    posts,
  };
};

export const replyInThread = async (
  {
    userId,
    threadId,
    content,
    contentPlain,
  }: {
    userId: string;
    threadId: string;
    content: JSONContent;
    contentPlain: string;
  },
  pgConnection: DBClient
) => {
  const [thread] = await selectThreadById.execute(
    {
      threadId,
      userId,
    },
    pgConnection
  );

  if (!thread) {
    return null;
  }

  const [newPost] = await unsafelyInsertNewPostForThread.execute(
    {
      newPost: {
        threadId: thread.id,
        authorId: userId,
        content,
        contentPlain,
      },
    },
    pgConnection
  );

  return newPost ?? null;
};

export const createNewThread = async (
  {
    userId,
    channelId,
    title,
    content,
    contentPlain,
  }: {
    userId: string;
    channelId: string;
    title: string;
    content: JSONContent;
    contentPlain: string;
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

  const [result] = await unsafelyInsertNewThreadInChannel.execute(
    {
      newThread: { channelId, title, authorId: userId },
      initalPostContent: content,
      initalPostContentPlain: contentPlain,
      initialPostAuthorId: userId,
    },
    pgConnection
  );

  if (!result) {
    return null;
  }

  return {
    id: result.threadId,
    title: result.title,
    channelId: result.channelId,
    posts: [
      {
        id: result.postId,
        content: result.content,
        contentPlain: result.contentPlain,
        authorId: result.authorId,
      },
    ],
  };
};
