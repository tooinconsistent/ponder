import { Component, Match, Suspense, Switch } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";

import { Channel } from "../channel/Channel.jsx";

import { Thread } from "../thread/Thread.jsx";
import { ThreadComposer } from "../thread/ThreadComposer.jsx";

import { AdvancedAppSettings } from "../settings/AdvancedAppSettings.jsx";

export const View: Component = (_props) => {
  const { store } = useStore();

  return (
    <div class="flex-1 overflow-hidden">
      <Suspense>
        <Switch>
          <Match when={store.view.currentView === "channel"}>
            <Channel />
          </Match>
          <Match when={store.view.currentView === "thread"}>
            <Thread />
          </Match>
          <Match when={store.view.currentView === "new_thread"}>
            <ThreadComposer />
          </Match>
          <Match when={store.view.currentView === "advanced_app_settings"}>
            <AdvancedAppSettings />
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
};
