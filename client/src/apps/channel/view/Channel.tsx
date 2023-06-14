import { Component, For, createSignal, onCleanup, onMount } from "solid-js";

import {
  deregisterHandlers,
  executeCommand,
  registerHandler,
} from "@ponder/client/lib/commands/commands.js";
import { useStore } from "@ponder/client/store/app.jsx";

import { ChannelDetails } from "./ChannelDetails.jsx";
import { ThreadRow } from "./ThreadRow.jsx";
import { isChildInView } from "@ponder/client/lib/dom_helpers.js";

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
    const threadId = threads()[selectionIdx()].id;
    const threadItemNode = document.querySelector(`[data-id="${threadId}"]`);

    if (
      threadItemNode &&
      !isChildInView(
        threadItemNode,
        document.querySelector("#channelContainer")
      )
    ) {
      threadItemNode.scrollIntoView({
        block: "center",
      });
    }
  });

  const [isNavigatingUsingKeyboard, setIsNavigatingUsingKeyboard] =
    createSignal(true);
  const mouseNavigationHandler = () => {
    if (isNavigatingUsingKeyboard()) {
      setIsNavigatingUsingKeyboard(false);
    }
  };

  onMount(() => {
    document.addEventListener("mousemove", mouseNavigationHandler);

    registerHandler("channel.selectPreviousThread", {
      handler: () => {
        setIsNavigatingUsingKeyboard(true);
        setSelectionIdx((previousIdx: number) => {
          const newSelectionIdx =
            previousIdx > 0 ? previousIdx - 1 : threads().length - 1;

          const newSelectionThreadId = threads()[newSelectionIdx].id;
          const newSelectionItemNode = document.querySelector(
            `[data-id="${newSelectionThreadId}"]`
          );

          if (
            newSelectionItemNode &&
            !isChildInView(
              newSelectionItemNode,
              document.querySelector("#channelContainer")
            )
          ) {
            newSelectionItemNode.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          return newSelectionIdx;
        });
      },
    });

    registerHandler("channel.selectNextThread", {
      handler: () => {
        setIsNavigatingUsingKeyboard(true);
        setSelectionIdx((previousIdx: number) => {
          const newSelectionIdx =
            previousIdx + 1 >= threads().length ? 0 : previousIdx + 1;

          const newSelectionThreadId = threads()[newSelectionIdx].id;
          const newSelectionItemNode = document.querySelector(
            `[data-id="${newSelectionThreadId}"]`
          );

          if (
            newSelectionItemNode &&
            !isChildInView(
              newSelectionItemNode,
              document.querySelector("#channelContainer")
            )
          ) {
            newSelectionItemNode.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          return newSelectionIdx;
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
    document.removeEventListener("mousemove", mouseNavigationHandler);

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
        <div
          class="flex-1 divide-y divide-[var(--channel-threadRowDivider)] overflow-auto bg-[var(--channel-threadListBackground)] px-9"
          id="channelContainer"
        >
          <For each={threads()}>
            {(thread, idx) => (
              <ThreadRow
                selected={idx() === selectionIdx()}
                // eslint-disable-next-line solid/reactivity
                onHover={() => {
                  if (!isNavigatingUsingKeyboard()) {
                    setSelectionIdx(idx);
                  }
                }}
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
