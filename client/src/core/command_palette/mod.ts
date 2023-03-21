import { App } from "@ponder/client/store/app";

import { registerCommand } from "@ponder/client/lib/commands/commands";

export const init = (app: App) => {
  registerCommand({
    id: "commandPalette.show",
    name: "Show command palette",
    description: "Shows comand palette",
    paramsSchema: null,
    handler: () => {
      app.setStore("view", "showCommandPalette", true);
    },
  });

  registerCommand({
    id: "commandPalette.hide",
    name: "Hide command palette",
    description: "Hides comand palette",
    paramsSchema: null,
    handler: () => {
      app.setStore("view", "showCommandPalette", false);
    },
    when: () => {
      return app.store.view.showCommandPalette;
    },
  });

  registerCommand({
    id: "commandPalette.selectNext",
    name: "Select next",
    description: "Selects next row in the matched list",
    paramsSchema: null,
  });

  registerCommand({
    id: "commandPalette.selectPrevious",
    name: "Select previous",
    description: "Selects previous row in the matched list",
    paramsSchema: null,
  });

  registerCommand({
    id: "commandPalette.executeSelectedCommand",
    name: "Execute Selected Command",
    description: "Executes currently selected command in the matched list",
    paramsSchema: null,
  });
};
