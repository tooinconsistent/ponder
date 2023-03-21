import { Static, Type } from "@sinclair/typebox";

import { produce } from "solid-js/store";

import { App } from "@ponder/client/store/app";

import { registerCommand } from "@ponder/client/lib/commands/commands";
// import { addToPalette } from "@ponder/client/lib/commands/palette";

export const init = (app: App) => {
  const OpenThreadComposerParams = Type.Object({
    channelId: Type.String(),
  });

  console.log(OpenThreadComposerParams);

  registerCommand({
    id: "view.openThreadComposer",
    name: "Open Thread Composer",
    description: "Opens thread composer for the specified channel.",
    paramsSchema: OpenThreadComposerParams,
    handler: (params: Static<typeof OpenThreadComposerParams>) => {
      app.setStore(
        produce((s) => {
          s.view.currentView = "new_thread";
          s.view.currentViewProps = { channelId: params.channelId };
        })
      );
    },
  });
};
