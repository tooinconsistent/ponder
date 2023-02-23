import { sideBar, SideBarStore } from "./side_bar.js";
import { view, ViewStore } from "./view.js";

export interface AppStore {
  sideBar: SideBarStore;
  view: ViewStore;
}

export const registry = [sideBar, view] as const;
