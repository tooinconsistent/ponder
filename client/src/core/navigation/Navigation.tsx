import { Component } from "solid-js";

import { ActivityBar } from "./activity_bar/ActivityBar.jsx";
import { SideBar } from "./side_bar/SideBar.jsx";

export const Navigation: Component = (_props) => {
  return (
    <div class="flex h-full">
      <ActivityBar />
      <SideBar />
    </div>
  );
};
