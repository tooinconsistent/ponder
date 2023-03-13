import { Component, For, JSX } from "solid-js";

import {
  ActionExecutor,
  useStore,
} from "@tooinconsistent/client/store/app.jsx";
import { SideBarTabs } from "@tooinconsistent/client/store/side_bar.js";

import { ActivityBarButton } from "./ActivityBarButton.jsx";

import { Inbox } from "./icons/Inbox.jsx";
import { ChatBubbles } from "./icons/ChatBubbles.jsx";
import { Cog } from "./icons/Cog.jsx";

type Activities = SideBarTabs;

interface ActivityBarProps {}

export const ActivityBar: Component<ActivityBarProps> = (props) => {
  const { store, actions } = useStore();

  // TODO: remove the ignore once other stuff is ready
  // @ts-ignore
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

  const topGroup: Array<Activities> = ["inbox", "channels"];
  const bottomGroup: Array<Activities> = ["settings"];

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
