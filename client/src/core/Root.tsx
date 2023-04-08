import { Component, Show } from "solid-js";

import { Navigation } from "./navigation/Navigation.jsx";
import { View } from "./view/view/View.jsx";
import { StatusBar } from "./status_bar/StatusBar.jsx";
import { CommandPalette } from "./command_palette/view/CommandPalette.jsx";

import { useStore } from "../store/app.jsx";

export const Root: Component = () => {
  const { store } = useStore();
  return (
    <div class="relative h-full">
      <Show when={store.view.showCommandPalette}>
        <CommandPalette />
      </Show>

      <div class="flex h-[calc(100%-1.5rem)] bg-[var(--base-background)] text-[var(--base-foreground)]">
        <Navigation />
        <View />
      </div>
      <div class="h-6">
        <StatusBar />
      </div>
    </div>
  );
};
