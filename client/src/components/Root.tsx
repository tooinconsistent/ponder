import { Component } from "solid-js";

import { EnsureAuthenticated } from "./auth/EnsureAuthenticated.jsx";

import { Navigation } from "./navigation/Navigation.jsx";
import { Main } from "./main/Main.jsx";

export const Root: Component = () => {
  return (
    <EnsureAuthenticated>
      <div class="h-full bg-background flex">
        <Navigation />
        <Main />
      </div>
    </EnsureAuthenticated>
  );
};
