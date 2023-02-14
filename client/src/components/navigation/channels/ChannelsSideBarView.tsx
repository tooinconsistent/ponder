import { Component } from "solid-js";

import { SideBarViewTitle } from "../side_bar/SideBarViewTitle.jsx";

interface ChannelsSideBarViewProps {}

export const ChannelsSideBarView: Component<ChannelsSideBarViewProps> = (
  props
) => {
  return (
    <div class="h-full">
      <SideBarViewTitle title="Channels" />
    </div>
  );
};
