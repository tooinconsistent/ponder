import { Component, For } from "solid-js";

import { useStore } from "@ponder/client/store/app.tsx";
import { classes } from "@ponder/client/lib/classes.ts";

import { SideBarViewTitle } from "@ponder/client/atoms/SideBarViewTitle.tsx";
import { SidebarSection } from "@ponder/client/atoms/SidebarSection.tsx";

export const ChannelsSideBarView: Component = (_props) => {
  const { store } = useStore();

  const currentChannel = () => {
    return (
      store.view.currentView === "channel" &&
      store.view.currentViewProps?.channelId
    );
  };

  const sortedChannels = () => {
    const [channels] = store.channels.listAll();
    const sortedCopy = [...(channels() ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCopy;
  };

  return (
    <div class="h-full">
      <SideBarViewTitle title="Channels" />
      <SidebarSection sectionTitle="All Channels">
        <For each={sortedChannels()}>
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
  );
};
