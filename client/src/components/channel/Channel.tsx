import { Component, For, createResource } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { trpc } from "@tooinconsistent/client/lib/trpc.js";
import { ChannelDetails } from "./ChannelDetails.jsx";
import { ThreadRow } from "./ThreadRow.jsx";

// interface ChannelProps {}

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
    <div class="h-full flex justify-center">
      <div class="h-full flex flex-col max-w-6xl flex-1">
        <ChannelDetails
          name={channel.latest?.name ?? ""}
          description={channel.latest?.description ?? ""}
        />
        <div class="px-9 divide-y divide-[var(--channel-threadRowDivider)] bg-[var(--channel-threadListBackground)] overflow-auto">
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
