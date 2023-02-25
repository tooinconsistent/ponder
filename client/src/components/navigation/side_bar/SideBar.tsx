import { Component, Match, Show, Switch } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { ChannelsSideBarView } from "../channels/ChannelsSideBarView.jsx";

export const SideBar: Component = (_props) => {
  const { store } = useStore();
  // TODO: Add resizability
  return (
    <Show when={store.sideBar.currentTab !== null}>
      <div class="fg-[var(--sideBar-foreground)] h-full w-72 border-r border-[var(--sideBar-border)] bg-[var(--sideBar-background)]">
        <Switch>
          <Match when={store.sideBar.currentTab === "channels"}>
            <ChannelsSideBarView />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};
