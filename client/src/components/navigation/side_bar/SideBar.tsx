import { Component, Match, Show, Switch } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { ChannelsSideBarView } from "../channels/ChannelsSideBarView.jsx";

interface SideBarProps {}

export const SideBar: Component<SideBarProps> = (props) => {
  const { store } = useStore();
  // TODO: Add resizability
  return (
    <Show when={store.sideBar.currentTab !== null}>
      <div class="h-full w-72">
        <Switch>
          <Match when={store.sideBar.currentTab === "channels"}>
            <ChannelsSideBarView />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};
