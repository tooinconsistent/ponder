import { Component, For, JSX } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { SideBarTabs } from "@tooinconsistent/client/store/side_bar.js";

import { ActivityBarButton } from "./ActivityBarButton.jsx";

import { Inbox } from "./icons/Inbox.jsx";
import { ChatBubbles } from "./icons/ChatBubbles.jsx";
import { Cog } from "./icons/Cog.jsx";

type Activities = SideBarTabs;

interface ActivityBarProps {}

export const ActivityBar: Component<ActivityBarProps> = (props) => {
  const { store, actions } = useStore();

  const activities: Record<
    Activities,
    { icon: JSX.Element; openAction: () => void }
  > = {
    inbox: {
      icon: <Inbox />,
      openAction: actions.openInbox,
    },
    channels: {
      icon: <ChatBubbles />,
      openAction: actions.openChannels,
    },
    settings: {
      icon: <Cog />,
      openAction: actions.openSettings,
    },
  };

  const topGroup: Array<Activities> = ["inbox", "channels"];
  const bottomGroup: Array<Activities> = ["settings"];

  return (
    <div class="h-full w-12 bg-[var(--activityBar-background)] border-r border-[var(--activityBar-border)] flex flex-col justify-between">
      {/* Top Group */}
      <div>
        <For each={topGroup}>
          {(activityId) => (
            <ActivityBarButton
              isActive={store.sideBar.currentTab === activityId}
              onClick={(e: MouseEvent) => {
                e.preventDefault();

                if (store.sideBar.currentTab === activityId) {
                  actions.toggleSideBar();
                } else {
                  activities[activityId].openAction();
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
                  actions.toggleSideBar();
                } else {
                  activities[activityId].openAction();
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
