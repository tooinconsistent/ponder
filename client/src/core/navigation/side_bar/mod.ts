import { App } from "@ponder/client/store/app.tsx";

import { registerCommand } from "@ponder/client/lib/commands/commands.ts";
import { addToPalette } from "@ponder/client/lib/commands/palette.ts";

export type SideBarTabs = "inbox" | "channels" | "settings";

export interface SideBarStore {
  currentTab: SideBarTabs | null;
  preToggleTab: SideBarTabs | null;
}

export const init = (app: App) => {
  const store: SideBarStore = {
    currentTab: "channels",
    preToggleTab: null,
  };

  app.setStore("sideBar", store);

  registerCommand({
    id: "sideBar.toggle",
    name: "View: Toggle side bar visibility",
    description:
      "Toggles the side bar open and closed. If it is open, it will close it. If it is closed, it will open it.",
    paramsSchema: null,
    handler: () => {
      if (app.store.sideBar.currentTab !== null) {
        app.setStore("sideBar", "preToggleTab", app.store.sideBar.currentTab);
        app.setStore("sideBar", "currentTab", null);
      } else {
        app.setStore("sideBar", "currentTab", app.store.sideBar.preToggleTab);
        app.setStore("sideBar", "preToggleTab", null);
      }
    },
  });
  addToPalette({ id: "sideBar.toggle" });
};
