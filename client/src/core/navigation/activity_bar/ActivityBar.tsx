import { Component, For, JSX } from "solid-js";

import { ActionExecutor, useStore } from "@ponder/client/store/app.jsx";
import { SideBarTabs } from "@ponder/client/store/side_bar.ts";

import { ActivityBarButton } from "./ActivityBarButton.jsx";

import { ChatBubbles } from "./icons/ChatBubbles.jsx";
// import { Inbox } from "./icons/Inbox.jsx";
// import { Cog } from "./icons/Cog.jsx";

type Activities = SideBarTabs;

export const ActivityBar: Component = (_props) => {
  const { store, actions } = useStore();

  // TODO: remove the ignore once other stuff is ready
  // @ts-expect-error TEMPORARY HACK
  const activities: Record<
    Activities,
    { icon: JSX.Element; openAction: ActionExecutor }
  > = {
    // inbox: {
    //   icon: <Inbox />,
    //   openAction: actions.openInbox,
    // },
    channels: {
      icon: <ChatBubbles />,
      openAction: actions.openChannels,
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
                  actions.toggleSideBar({});
                } else {
                  activities[activityId].openAction({});
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
                  actions.toggleSideBar({});
                } else {
                  activities[activityId].openAction({});
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
