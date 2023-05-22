import { Component, For, createSignal, onCleanup, onMount } from "solid-js";

import {
  deregisterHandlers,
  executeCommand,
  registerHandler,
} from "@ponder/client/lib/commands/commands.js";
import { useStore } from "@ponder/client/store/app.jsx";

import { ChannelDetails } from "./ChannelDetails.jsx";
import { ThreadRow } from "./ThreadRow.jsx";

export const Channel: Component = (_props) => {
  const { store } = useStore();

  const channel = () => {
    return store.channels.channel(
      store.view.currentViewProps?.channelId ?? ""
    )[0];
  };

  const threads = () => channel().latest?.threads ?? [];

  const [selectionIdx, setSelectionIdx] = createSignal(
    Math.max(
      threads().findIndex(
        (thread) => thread.id === store.view.currentViewProps?.selectedThreadId
      ),
      0
    )
  );

  onMount(() => {
    registerHandler("channel.selectPreviousThread", {
      handler: () => {
        setSelectionIdx((previousIdx: number) => {
          if (previousIdx > 0) {
            const itemNode = document.querySelector(
              `[data-id="${previousIdx - 1}"]`
            );
            itemNode?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            return previousIdx - 1;
          }

          const itemNode = document.querySelector(
            `[data-id="${threads().length - 1}"]`
          );
          itemNode?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return threads().length - 1;
        });
      },
    });

    registerHandler("channel.selectNextThread", {
      handler: () => {
        setSelectionIdx((previousIdx: number) => {
          if (previousIdx + 1 >= threads().length) {
            const itemNode = document.querySelector(`[data-id="${0}"]`);
            itemNode?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            return 0;
          }
          const itemNode = document.querySelector(
            `[data-id="${previousIdx + 1}"]`
          );
          itemNode?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          return previousIdx + 1;
        });
      },
    });

    registerHandler("channel.openSelectedThread", {
      handler: () => {
        const threadId = threads()[selectionIdx()].id;
        executeCommand("view.openThread", { threadId });
      },
    });
  });

  onCleanup(() => {
    deregisterHandlers("channel.selectPreviousThread");
    deregisterHandlers("channel.selectNextThread");
    deregisterHandlers("channel.openSelectedThread");
  });

  return (
    <div class="flex h-full justify-center">
      <div class="flex h-full max-w-6xl flex-1 flex-col">
        <ChannelDetails
          name={channel().latest?.name ?? ""}
          description={channel().latest?.description ?? ""}
          isPrivate={!channel().latest?.isPublic}
          channelId={channel().latest?.id ?? null}
        />
        <div class="flex-1 divide-y divide-[var(--channel-threadRowDivider)] overflow-auto bg-[var(--channel-threadListBackground)] px-9">
          <For each={threads()}>
            {(thread, idx) => (
              <ThreadRow
                selected={idx() === selectionIdx()}
                // eslint-disable-next-line solid/reactivity
                threadId={thread.id}
                title={thread.title}
                latestPost={{
                  content: thread.latestPost.contentPlain,
                  createdAt: thread.latestPost.createdAt,
                  author: {
                    avatarUrl: thread.latestPost.author.avatarUrl,
                    displayName: thread.latestPost.author.displayName,
                  },
                }}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
