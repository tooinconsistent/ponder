import { App } from "@ponder/client/store/app";

import {
  executeCommand,
  registerCommand,
} from "@ponder/client/lib/commands/commands";
import { addToPalette } from "@ponder/client/lib/commands/palette";

export const init = (app: App) => {
  registerCommand({
    id: "thread.backToChannel",
    name: "Back to channel",
    description: "Goes back to the channel",
    paramsSchema: null,
    handler: () => {
      const threadId = app.store.view.currentViewProps?.threadId ?? "";
      // const thread = app.store.threads[threadId];
      // const channelId = thread?.channelId ?? "";
      // executeCommand("view.openChannel", { channelId });
    },
    when: () => {
      return app.store.view.currentView === "thread";
    },
  });

  addToPalette({ id: "thread.backToChannel" });
};
