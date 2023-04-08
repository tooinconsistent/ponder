import { MainViews } from "@ponder/client/core/view/mod.ts";

import { executeCommand } from "@ponder/client/lib/commands/commands.ts";

interface RouteDefinition {
  route: string;
  view: MainViews;
  handler: (
    // TODO: type this in some reasonable way
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routeParams: any
  ) => void;
}

export const routes: RouteDefinition[] = [
  {
    route: "/",
    view: "home",
    handler: () => {
      return;
    },
  },
  {
    route: "/channel/:channelId",
    view: "channel",
    handler: (routeParams: { channelId: string }) => {
      executeCommand("view.openChannel", { channelId: routeParams.channelId });
    },
  },
  {
    route: "/thread/new/:channelId?",
    view: "new_thread",
    handler: (routeParams: { channelId: string }) => {
      executeCommand("view.openThreadComposer", {
        channelId: routeParams.channelId,
      });
    },
  },
  {
    route: "/thread/:threadId",
    view: "thread",
    handler: (routeParams: { threadId: string }) => {
      executeCommand("view.openThread", { threadId: routeParams.threadId });
    },
  },
  {
    route: "/advanced_app_settings",
    view: "advanced_app_settings",
    handler: () => {
      executeCommand("view.openAdvancedAppSettings");
    },
  },
];
