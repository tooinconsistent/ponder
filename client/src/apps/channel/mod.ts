import { App } from "@ponder/client/store/app";

import {
  executeCommand,
  registerCommand,
} from "@ponder/client/lib/commands/commands";
import { addToPalette } from "@ponder/client/lib/commands/palette";

export const init = (app: App) => {
  registerCommand({
    id: "channel.newThread",
    name: "Create new thread",
    description: "Creates new thread in the channel",
    paramsSchema: null,
    handler: () => {
      executeCommand("view.openThreadComposer", {
        channelId: app.store.view.currentViewProps?.channelId ?? "",
      });
    },
    when: () => {
      return app.store.view.currentView === "channel";
    },
  });

  addToPalette({ id: "channel.newThread" });
};
