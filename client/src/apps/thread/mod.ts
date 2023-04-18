import { Static, Type } from "@sinclair/typebox";
import { produce } from "solid-js/store";

import { App } from "@ponder/client/store/app";

import {
  executeCommand,
  registerCommand,
} from "@ponder/client/lib/commands/commands";
import { addToPalette } from "@ponder/client/lib/commands/palette";

export const init = (app: App) => {
  const OpenThreadParams = Type.Object({
    threadId: Type.String(),
  });

  registerCommand({
    id: "view.openThread",
    name: "View: Open Thread",
    description: "Opens specified Thread.",
    paramsSchema: OpenThreadParams,
    handler: (params: Static<typeof OpenThreadParams>) => {
      app.setStore(
        produce((s) => {
          s.view.currentView = "thread";
          s.view.currentViewProps = { threadId: params.threadId };
        })
      );
    },
  });

  registerCommand({
    id: "thread.backToChannel",
    name: "Thread: Back to channel",
    description: "Goes back to the channel",
    paramsSchema: null,
    handler: () => {
      const threadId = app.store.view.currentViewProps?.threadId ?? "";
      const [thread] = app.store.threads.thread(threadId);
      const channelId = thread()?.channelId ?? "";
      executeCommand("view.openChannel", {
        channelId,
        selectedThreadId: threadId,
      });
    },
    when: () => {
      return app.store.view.currentView === "thread";
    },
  });

  addToPalette({ id: "thread.backToChannel" });

  registerCommand({
    id: "thread.replyToThread",
    name: "Thread: Reply to the thread",
    description: "Replies to the thread with current message in the editor",
    paramsSchema: null,
  });

  addToPalette({ id: "thread.replyToThread" });
};
