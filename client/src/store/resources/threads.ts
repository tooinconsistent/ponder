import { trpc } from "@ponder/client/lib/trpc";
import { ResourceReturn, createResource } from "solid-js";

interface Thread {
  channelId: string;
  createdAt: Date;
  id: string;
  title: string;
  posts: Array<{
    id: string;
    content: unknown;
    createdAt: Date;
    author: {
      id: string;
      avatarUrl: string | null;
      displayName: string;
    };
  }>;
}

interface ThreadsStore {
  thread: (threadId: string) => ResourceReturn<Thread>;
}

export const id = "threads";

export const init = (): ThreadsStore => {
  const threads = new Map<string, ResourceReturn<Thread>>();

  const getThread = (threadId: string) => {
    const thread = createResource<Thread>(() => {
      return trpc.threads.getById.query({ threadId }) as unknown as Thread;
    });
    threads.set(threadId, thread);
    return thread;
  };

  const store: ThreadsStore = {
    thread: (threadId: string) => {
      if (threads.has(threadId)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return threads.get(threadId)!;
      }
      return getThread(threadId);
    },
  };

  return store;
};
