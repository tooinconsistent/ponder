import {
  ActionExecutor,
  AppActions,
} from "@tooinconsistent/client/store/app.jsx";

import { MainViews } from "@tooinconsistent/client/store/view.js";

interface RouteDefinition {
  route: string;
  view: MainViews;
  handler: (
    actions: Record<AppActions, ActionExecutor>,
    // TODO:
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
    route: "/thread/:threadId",
    view: "thread",
    handler: (actions, routeParams: { threadId: string }) => {
      actions.openThread({ threadId: routeParams.threadId });
    },
  },
  // {
  //   route: "/settings",
  //   handler: (actions) => actions.openSettingsView(),
  // },
];
