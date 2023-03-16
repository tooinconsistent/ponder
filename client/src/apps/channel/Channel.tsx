import { Component, For, createResource } from "solid-js";

import { useStore } from "@ponder/client/store/app.jsx";
import { trpc } from "@ponder/client/lib/trpc.ts";
import { ChannelDetails } from "./ChannelDetails.jsx";
import { ThreadRow } from "./ThreadRow.jsx";

export const Channel: Component = (_props) => {
  const { store } = useStore();

  const [channel] = createResource(
    () => store.view.currentViewProps?.channelId,
    async (currentChannelId) => {
      const channelDetails = await trpc.channels.getById.query({
        channelId: currentChannelId,
      });
      return channelDetails;
    }
  );

  return (
    <div class="flex h-full justify-center">
      <div class="flex h-full max-w-6xl flex-1 flex-col">
        <ChannelDetails
          name={channel.latest?.name ?? ""}
          description={channel.latest?.description ?? ""}
          isPrivate={!channel.latest?.isPublic}
          channelId={channel.latest?.id ?? null}
        />
        <div class="flex-1 divide-y divide-[var(--channel-threadRowDivider)] overflow-auto bg-[var(--channel-threadListBackground)] px-9">
          <For each={channel.latest?.threads ?? []}>
            {(thread) => (
              <ThreadRow
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
