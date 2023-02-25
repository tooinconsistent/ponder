import { Component } from "solid-js";

import { EnsureAuthenticated } from "./auth/EnsureAuthenticated.jsx";

import { Navigation } from "./navigation/Navigation.jsx";
import { View } from "./view/View.jsx";

export const Root: Component = () => {
  return (
    <EnsureAuthenticated>
      <div class="flex h-full bg-[var(--base-background)] text-[var(--base-foreground)]">
        <Navigation />
        <View />
      </div>
    </EnsureAuthenticated>
  );
};
