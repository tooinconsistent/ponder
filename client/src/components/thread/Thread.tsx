import { Component, For, createResource } from "solid-js";
import { JSONContent } from "@tiptap/core";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { trpc } from "@tooinconsistent/client/lib/trpc.js";

import { ThreadDetails } from "./ThreadDetails.jsx";
import { PostComposer } from "./PostComposer.jsx";
import { Post } from "./Post.jsx";
import { currentUserProfile } from "@tooinconsistent/client/store/users.js";

export const Thread: Component = (_props) => {
  const { store } = useStore();

  const [thread, { mutate: mutateThread }] = createResource(
    () => store.view.currentViewProps?.threadId,
    async (currentThreadId) => {
      const threadDetails = await trpc.threads.getById.query({
        threadId: currentThreadId,
      });
      return threadDetails;
    }
  );

  const submitHandler = async (content: JSONContent, contentPlain: string) => {
    const threadId = thread()?.id;
    if (!threadId) {
      throw new Error("Thread :: submitting without a thread id");
    }

    const newPost = await trpc.threads.replyInThread.mutate({
      threadId,
      content,
      contentPlain,
    });

    if (newPost === null) {
      throw new Error("Thread :: got back null from mutation");
    }

    mutateThread((currentThread) => {
      if (currentThread) {
        return {
          ...currentThread,
          posts: [
            ...currentThread.posts,
            {
              ...newPost,
              author: {
                id: currentUserProfile()?.userId ?? "",
                avatarUrl: currentUserProfile()?.avatarUrl ?? null,
                displayName: currentUserProfile()?.displayName ?? "",
              },
            },
          ],
        };
      }
    });
  };

  return (
    <div class="h-full flex justify-center">
      <div class="h-full flex flex-col max-w-6xl flex-1">
        <ThreadDetails title={thread.latest?.title ?? ""} />
        <div class="flex-1 flex justify-center p-8 overflow-y-auto">
          <div class="max-w-xl w-full">
            <ul role="list">
              <For each={thread.latest?.posts}>
                {(post, _idx) => (
                  <Post
                    content={post.content as JSONContent}
                    createdAt={post.createdAt}
                    author={{
                      avatarUrl: post.author.avatarUrl,
                      displayName: post.author.displayName,
                    }}
                  />
                )}
              </For>
            </ul>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="max-w-xl w-full pb-8">
            <PostComposer onSubmit={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
