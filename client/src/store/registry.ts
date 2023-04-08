import { SideBarStore } from "../core/navigation/side_bar/mod.ts";

import { ViewStore } from "../core/view/mod.ts";
import { UsersStore } from "./resources/users.ts";

import { ChannelsStore } from "./resources/channels.ts";
import { ThreadsStore } from "./resources/threads.ts";
import { SettingsStore } from "./settings/settings.ts";

export interface AppStore {
  sideBar: SideBarStore;
  view: ViewStore;
  channels: ChannelsStore;
  users: UsersStore;
  threads: ThreadsStore;
  settings: SettingsStore;
}
