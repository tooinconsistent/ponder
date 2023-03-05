import { Component, For } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { classes } from "@tooinconsistent/client/lib/classes.js";

import { SideBarViewTitle } from "../side_bar/SideBarViewTitle.jsx";
import { SidebarSection } from "../side_bar/SidebarSection.jsx";

export const ChannelsSideBarView: Component = (_props) => {
  const { actions, store } = useStore();

  const currentChannel = () => {
    return (
      store.view.currentView === "channel" &&
      store.view.currentViewProps?.channelId
    );
  };

  return (
    <div class="h-full">
      <SideBarViewTitle title="Channels" />
      <SidebarSection sectionTitle="Joined Channels">
        <For each={store.channels.channels}>
          {(channel) => (
            <div
              onClick={() => {
                actions.openChannel({ channelId: channel.id });
              }}
              class={classes(
                "cursor-pointer px-4 py-1 text-sm font-light",
                currentChannel() !== channel.id &&
                  "hover:bg-[var(--list-hoverBackground)] hover:text-[var(--list-hoverForeground)]",
                currentChannel() === channel.id &&
                  "bg-[var(--list-inactiveSelectionBackground)] text-[var(--list-inactiveSelectionForeground)]"
              )}
            >
              # {channel.name}
            </div>
          )}
        </For>
      </SidebarSection>
    </div>
  );
};
