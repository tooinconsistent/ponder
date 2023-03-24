import { DBClient } from "@ponder/api/lib/db.ts";

import { JSONContent } from "@ponder/api/lib/docs.ts";

import {
  Json,
  selectThreadById,
  insertNewPostForThread,
  insertNewThreadInChannel,
  selectPostsForThread,
} from "./queries/threads.queries.ts";

export const getThreadById = async (
  {
    threadId,
  }: {
    threadId: string;
  },
  pgConnection: DBClient
) => {
  const [thread] = await selectThreadById.execute(
    {
      threadId,
    },
    pgConnection
  );

  if (!thread) {
    return null;
  }

  const posts = (
    await selectPostsForThread.execute(
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
  const [newPost] = await insertNewPostForThread.execute(
    {
      newPost: {
        threadId: threadId,
        authorId: userId,
        content: content as Json,
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
  await pgConnection.query("BEGIN");

  const [newThread] = await insertNewThreadInChannel.execute(
    {
      newThread: { channelId, title, authorId: userId },
    },
    pgConnection
  );

  if (!newThread) {
    await pgConnection.query("ROLLBACK");
    return null;
  }

  const [initialPost] = await insertNewPostForThread.execute(
    {
      newPost: {
        threadId: newThread.id,
        authorId: userId,
        content: content as Json,
        contentPlain,
      },
    },
    pgConnection
  );

  if (!initialPost) {
    await pgConnection.query("ROLLBACK");
    return null;
  }

  await pgConnection.query("COMMIT");

  return {
    id: newThread.id,
    title: newThread.title,
    channelId: newThread.channelId,
    authorId: newThread.authorId,
    createdAt: newThread.createdAt,
    posts: [
      {
        id: initialPost.id,
        content: initialPost.content,
        contentPlain: initialPost.contentPlain,
        authorId: initialPost.authorId,
      },
    ],
  };
};
