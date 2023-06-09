import { Component, For } from "solid-js";

import { useStore } from "@ponder/client/store/app.tsx";
import { classes } from "@ponder/client/lib/classes.ts";

import { SideBarViewTitle } from "@ponder/client/elements/SideBarViewTitle.tsx";
import { SidebarSection } from "@ponder/client/elements/SidebarSection.tsx";

export const ChannelsSideBarView: Component = (_props) => {
  const { store } = useStore();

  const currentChannel = () => {
    return (
      store.view.currentView === "channel" &&
      store.view.currentViewProps?.channelId
    );
  };

  const sortedJoinedChannels = () => {
    const [joinedChannels] = store.channels.listJoined();
    const sortedCopy = [...(joinedChannels() ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCopy;
  };

  const sortedAllChannels = () => {
    const [channels] = store.channels.listAll();
    const sortedCopy = [...(channels() ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCopy;
  };

  return (
    <div class="flex h-full flex-col">
      <SideBarViewTitle title="Channels" />
      <div class="flex flex-1 flex-col justify-between">
        <SidebarSection sectionTitle="Joined Channels">
          <For each={sortedJoinedChannels()}>
            {(channel) => (
              <a
                href={`/channel/${channel.id}`}
                class={classes(
                  "block cursor-pointer px-4 py-1 text-sm font-light",
                  currentChannel() !== channel.id &&
                    "hover:bg-[var(--list-hoverBackground)] hover:text-[var(--list-hoverForeground)]",
                  currentChannel() === channel.id &&
                    "bg-[var(--list-inactiveSelectionBackground)] text-[var(--list-inactiveSelectionForeground)]"
                )}
              >
                # {channel.name}
              </a>
            )}
          </For>
        </SidebarSection>

        <SidebarSection sectionTitle="All Channels" collapsed>
          <For each={sortedAllChannels()}>
            {(channel) => (
              <a
                href={`/channel/${channel.id}`}
                class={classes(
                  "block cursor-pointer px-4 py-1 text-sm font-light",
                  currentChannel() !== channel.id &&
                    "hover:bg-[var(--list-hoverBackground)] hover:text-[var(--list-hoverForeground)]",
                  currentChannel() === channel.id &&
                    "bg-[var(--list-inactiveSelectionBackground)] text-[var(--list-inactiveSelectionForeground)]"
                )}
              >
                # {channel.name}
              </a>
            )}
          </For>
        </SidebarSection>
      </div>
    </div>
  );
};
