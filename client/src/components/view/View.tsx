import { Component, Match, Suspense, Switch } from "solid-js";

import { Channel } from "../channel/Channel.jsx";

import { useStore } from "@tooinconsistent/client/store/app.jsx";

export const View: Component = (_props) => {
  const { store } = useStore();

  return (
    <div class="flex-1 overflow-hidden">
      <Suspense>
        <Switch>
          <Match when={store.view.currentView === "channel"}>
            <Channel />
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
};
