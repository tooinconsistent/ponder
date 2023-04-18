import { Static, Type } from "@sinclair/typebox";
import { produce } from "solid-js/store";

import type { App } from "@ponder/client/store/app";

import {
  executeCommand,
  registerCommand,
} from "@ponder/client/lib/commands/commands";
import { addToPalette } from "@ponder/client/lib/commands/palette";

export const init = (app: App) => {
  const OpenChannelParams = Type.Object({
    channelId: Type.String(),
    selectedThreadId: Type.Optional(Type.String()),
  });

  registerCommand({
    id: "view.openChannel",
    name: "Open Channel",
    description: "Opens channel app for a specifed channel.",
    paramsSchema: OpenChannelParams,
    handler: (params: Static<typeof OpenChannelParams>) => {
      app.setStore(
        produce((s) => {
          s.view.currentView = "channel";
          s.view.currentViewProps = {
            channelId: params.channelId,
            selectedThreadId: params.selectedThreadId ?? null,
          };
        })
      );
    },
  });

  registerCommand({
    id: "channel.newThread",
    name: "Channel: Create new thread",
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

  registerCommand({
    id: "channel.selectNextThread",
    name: "Select next",
    description: "Selects next thread row in the channel view",
    paramsSchema: null,
  });

  registerCommand({
    id: "channel.selectPreviousThread",
    name: "Select previous",
    description: "Selects previous thread row in the channel view",
    paramsSchema: null,
  });

  registerCommand({
    id: "channel.openSelectedThread",
    name: "Open Selected Thread",
    description: "Opens currently selected thread in the channel view",
    paramsSchema: null,
  });
};
