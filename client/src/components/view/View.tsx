import { Component, Match, Suspense, Switch } from "solid-js";

import { useStore } from "@tooinconsistent/client/store/app.jsx";

import { Channel } from "../channel/Channel.jsx";
import { Thread } from "../thread/Thread.jsx";

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
        </Switch>
      </Suspense>
    </div>
  );
};
