import { Component } from "solid-js";

import { Navigation } from "./navigation/Navigation.jsx";
import { View } from "./view/View.jsx";
import { StatusBar } from "./status_bar/StatusBar.jsx";

export const Root: Component = () => {
  return (
    <div class="h-full">
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
