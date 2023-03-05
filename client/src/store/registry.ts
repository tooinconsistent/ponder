import { sideBar, SideBarStore } from "./side_bar.js";
import { view, ViewStore } from "./view.js";
import { channels, ChannelsStore } from "./channels.js";
import { users, UsersStore } from "./users.js";

export interface AppStore {
  sideBar: SideBarStore;
  view: ViewStore;
  channels: ChannelsStore;
  users: UsersStore;
}

export const registry = [sideBar, view, channels, users] as const;
