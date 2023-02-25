import { DBClient } from "@tooinconsistent/api/lib/db.js";

import {
  selectThreadById,
  unsafelyInsertNewPostForThread,
  unsafelySelectPostsForThread,
} from "./queries/threads.queries.js";
import { JSONContent } from "@tooinconsistent/api/lib/docs.js";

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
