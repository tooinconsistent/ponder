import { Component, For } from "solid-js";
import { JSONContent } from "@tiptap/core";

import { onMount } from "solid-js";

import { useStore } from "@ponder/client/store/app.jsx";
import { trpc } from "@ponder/client/lib/trpc.ts";

import { ThreadDetails } from "./ThreadDetails.jsx";
import { PostComposer } from "./PostComposer.jsx";
import { Post } from "./Post.jsx";

export const Thread: Component = (_props) => {
  const { store } = useStore();

  const thread = () => {
    return store.threads.thread(store.view.currentViewProps?.threadId ?? "");
  };

  // TODO: Scroll to unread
  const scrollToLastPost = (smoothly?: boolean) => {
    const lastPost = document.querySelector("ul[role=list] > li:last-child");
    if (lastPost) {
      lastPost.scrollIntoView({
        behavior: smoothly ? "smooth" : "auto",
        block: "start",
      });
    }
  };

  onMount(() => {
    scrollToLastPost();
  });

  const submitHandler = async (content: JSONContent, contentPlain: string) => {
    const threadId = thread()[0].latest?.id;
    if (!threadId) {
      throw new Error("Thread :: submitting without a thread id");
    }

    const newPost = await trpc.threads.replyInThread.mutate({
      threadId,
      content,
      contentPlain,
    });

    thread()[1].mutate((currentThread) => {
      if (currentThread) {
        return {
          ...currentThread,
          posts: [
            ...currentThread.posts,
            {
              ...newPost,
              author: {
                id: store.users.currentUserProfile?.userId ?? "",
                avatarUrl: store.users.currentUserProfile?.avatarUrl ?? null,
                displayName: store.users.currentUserProfile?.displayName ?? "",
              },
            },
          ],
        };
      }
    });

    scrollToLastPost(true);
  };

  return (
    <div class="flex h-full justify-center">
      <div class="flex h-full max-w-6xl flex-1 flex-col">
        <ThreadDetails
          title={thread()[0].latest?.title ?? ""}
          channelId={thread()[0].latest?.channelId}
        />
        <div class="flex flex-1 justify-center overflow-y-auto p-8">
          <div class="w-full max-w-xl">
            <ul role="list">
              <For each={thread()[0].latest?.posts}>
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
        <div class="flex justify-center px-8 pb-8">
          <div class="w-full max-w-xl">
            <PostComposer onSubmit={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
