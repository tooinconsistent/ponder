import { sideBar, SideBarStore } from "./side_bar.ts";
import { view, ViewStore } from "./view.ts";
import { channels, ChannelsStore } from "./channels.ts";
import { users, UsersStore } from "./users.ts";

export interface AppStore {
  sideBar: SideBarStore;
  view: ViewStore;
  channels: ChannelsStore;
  users: UsersStore;
}

export const registry = [sideBar, view, channels, users] as const;
