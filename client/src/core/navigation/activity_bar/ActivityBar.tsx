import { Component, For, JSX } from "solid-js";

import { useStore } from "@ponder/client/store/app.tsx";
import { SideBarTabs } from "@ponder/client/core/navigation/side_bar/mod.ts";

import { ActivityBarButton } from "./ActivityBarButton.jsx";

import { ChatBubbles } from "./icons/ChatBubbles.jsx";
import { executeCommand } from "@ponder/client/lib/commands/commands.js";
// import { Inbox } from "./icons/Inbox.jsx";
// import { Cog } from "./icons/Cog.jsx";

type Activities = SideBarTabs;

export const ActivityBar: Component = (_props) => {
  const { store } = useStore();

  // TODO: remove the ignore once other stuff is ready
  // @ts-expect-error TEMPORARY HACK
  const activities: Record<
    Activities,
    { icon: JSX.Element; openCommand: string }
  > = {
    // inbox: {
    //   icon: <Inbox />,
    //   openAction: actions.openInbox,
    // },
    channels: {
      icon: <ChatBubbles />,
      openCommand: "sideBar.openChannels",
    },
    // settings: {
    //   icon: <Cog />,
    //   openAction: actions.openSettings,
    // },
  };

  // const topGroup: Array<Activities> = ["inbox", "channels"];
  // const bottomGroup: Array<Activities> = ["settings"];

  const topGroup: Activities[] = ["channels"];
  const bottomGroup: Activities[] = [];

  return (
    <div class="flex h-full w-12 flex-col justify-between border-r border-[var(--activityBar-border)] bg-[var(--activityBar-background)]">
      {/* Top Group */}
      <div>
        <For each={topGroup}>
          {(activityId) => (
            <ActivityBarButton
              isActive={store.sideBar.currentTab === activityId}
              onClick={(e: MouseEvent) => {
                e.preventDefault();

                if (store.sideBar.currentTab === activityId) {
                  executeCommand("sideBar.toggle");
                } else {
                  executeCommand(activities[activityId].openCommand);
                }
              }}
            >
              {activities[activityId].icon}
            </ActivityBarButton>
          )}
        </For>
      </div>
      {/* Bottom Group */}
      <div>
        <For each={bottomGroup}>
          {(activityId) => (
            <ActivityBarButton
              isActive={store.sideBar.currentTab === activityId}
              onClick={(e: MouseEvent) => {
                e.preventDefault();

                if (store.sideBar.currentTab === activityId) {
                  executeCommand("sideBar.toggle");
                } else {
                  executeCommand(activities[activityId].openCommand);
                }
              }}
            >
              {activities[activityId].icon}
            </ActivityBarButton>
          )}
        </For>
      </div>
    </div>
  );
};
