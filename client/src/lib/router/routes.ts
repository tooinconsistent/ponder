import { ActionExecutor, AppActions } from "@ponder/client/store/app.jsx";

import { MainViews } from "@ponder/client/store/view.js";

interface RouteDefinition {
  route: string;
  view: MainViews;
  handler: (
    actions: Record<AppActions, ActionExecutor>,
    // TODO: type this in some reasonable way
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routeParams: any
  ) => void;
}

export const routes: RouteDefinition[] = [
  {
    route: "/",
    view: "home",
    handler: (_actions) => {
      return;
    },
  },
  {
    route: "/channel/:channelId",
    view: "channel",
    handler: (actions, routeParams: { channelId: string }) => {
      actions.openChannel({ channelId: routeParams.channelId });
    },
  },
  {
    route: "/thread/new/:channelId?",
    view: "new_thread",
    handler: (actions, routeParams: { channelId: string }) => {
      actions.openNewThread({ channelId: routeParams.channelId });
    },
  },
  {
    route: "/thread/:threadId",
    view: "thread",
    handler: (actions, routeParams: { threadId: string }) => {
      actions.openThread({ threadId: routeParams.threadId });
    },
  },
  {
    route: "/advanced_app_settings",
    view: "advanced_app_settings",
    handler: (actions) => {
      actions.openAdvancedAppSettings({});
    },
  },
  // {
  //   route: "/settings",
  //   handler: (actions) => actions.openSettingsView(),
  // },
];
