import { App } from "@ponder/client/store/app.tsx";

import { registerCommand } from "@ponder/client/lib/commands/commands.ts";
import { addToPalette } from "@ponder/client/lib/commands/palette.ts";

export type SideBarTabs = "inbox" | "channels" | "settings";

export interface SideBarStore {
  currentTab: SideBarTabs | null;
  preToggleTab: SideBarTabs | null;
}

export const init = (app: App) => {
  registerCommand({
    id: "sideBar.openChannels",
    name: "View: Show channels",
    description: "Opens the channels tab in the side bar.",
    paramsSchema: null,
    handler: () => {
      app.setStore("sideBar", "currentTab", "channels");
    },
  });
  addToPalette({ id: "sideBar.openChannels" });
};
