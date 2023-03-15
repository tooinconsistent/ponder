import { Component, Match, Show, Switch } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";
import { ChannelsSideBarView } from "@tooinconsistent/client/sidebar_apps/channels/ChannelsSideBarView.jsx";
import { SettingsSidebarView } from "@tooinconsistent/client/sidebar_apps/settings/SettingsSideBarView.jsx";

export const SideBar: Component = (_props) => {
  const { store } = useStore();
  // TODO: Add resizability
  return (
    <Show when={store.sideBar.currentTab !== null}>
      <div class="h-full w-72 border-r border-[var(--sideBar-border)] bg-[var(--sideBar-background)] text-[var(--sideBar-foreground)]">
        <Switch>
          <Match when={store.sideBar.currentTab === "channels"}>
            <ChannelsSideBarView />
          </Match>
          <Match when={store.sideBar.currentTab === "settings"}>
            <SettingsSidebarView />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};
