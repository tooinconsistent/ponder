import { Component } from "solid-js";

import { ActivityBar } from "./activity_bar/ActivityBar.jsx";
import { SideBar } from "./side_bar/SideBar.jsx";

interface NavigationProps {}

export const Navigation: Component<NavigationProps> = (props) => {
  return (
    <div class="h-full flex">
      <ActivityBar />
      <SideBar />
    </div>
  );
};
