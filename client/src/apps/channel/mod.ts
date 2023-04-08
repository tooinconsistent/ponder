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
  });

  registerCommand({
    id: "view.openChannel",
    name: "Open Channel",
    description: "Opens specified channel.",
    paramsSchema: OpenChannelParams,
    handler: (params: Static<typeof OpenChannelParams>) => {
      app.setStore(
        produce((s) => {
          s.view.currentView = "channel";
          s.view.currentViewProps = { channelId: params.channelId };
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
};
