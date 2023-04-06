import { Component, Match, Suspense, Switch } from "solid-js";

import { useStore } from "@ponder/client/store/app.jsx";

import { Channel } from "@ponder/client/apps/channel/view/Channel.jsx";

import { Thread } from "@ponder/client/apps/thread/view/Thread.jsx";
import { ThreadComposer } from "@ponder/client/apps/thread_composer/view/ThreadComposer.jsx";

import { AdvancedAppSettings } from "@ponder/client/apps/advanced_app_settings/view/AdvancedAppSettings.jsx";

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
