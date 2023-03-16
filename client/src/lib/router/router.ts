import { createEffect } from "solid-js";

import { AppStore } from "@ponder/client/store/registry.ts";
import { ActionExecutor, AppActions } from "@ponder/client/store/app.jsx";

import { routes } from "./routes.ts";
import { injectValuesIntoRoute, routeToRegex } from "./routeHelper.ts";

const routeMatchers = routes.map((route) => ({
  ...route,
  ...routeToRegex(route.route),
}));

export class Router {
  constructor(
    private store: AppStore,
    private actions: Record<AppActions, ActionExecutor>
  ) {}

  matchPath = (path: string) => {
    let matchingRoute = routeMatchers.find((routeMatcher) =>
      routeMatcher.pattern.test(path)
    );

    if (!matchingRoute) {
      // TODO: Handle 404 gracefully
      console.error(`router :: "${path}" not found`);
      matchingRoute = routeMatchers[0];
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const matches = matchingRoute.pattern
      .exec(path)!
      // This fixes weird behaviour in safari, that somehow returns undefined as a string
      .map((match) => (match === "undefined" ? undefined : match));

    const routeParams = matchingRoute.keys.reduce(
      (rp, key, i) => ({ ...rp, [key]: matches[i + 1] || null }),
      {}
    );

    console.debug(`router :: Scrolling to top`);
    window.scrollTo(0, 0);

    console.debug(
      `router :: Navigating to ${matchingRoute.route} with ${JSON.stringify(
        routeParams
      )}`
    );
    return matchingRoute.handler(this.actions, routeParams);
  };

  clickListener = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement | null)?.closest("a");
    const path = anchor?.pathname;
    if (!path || anchor.target || anchor.host !== window.location.host) {
      return;
    }

    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.button ||
      event.defaultPrevented
    ) {
      return;
    }

    console.debug(
      `router :: Handling click on the target: ${String(event.target)}`
    );
    event.preventDefault();
    this.matchPath(path);
  };

  historyListener = () => {
    console.debug(`router :: Handling history PopState event`);
    this.matchPath(document.location.pathname);
  };

  syncLocationWithStore = () => {
    // Keep browser history in sync with the store
    createEffect(() => {
      const currentView = this.store.view.currentView;
      const currentRoute = routeMatchers.find(
        (routeMatcher) => routeMatcher.view === currentView
      );

      if (!currentRoute) {
        throw new Error("couldn't find route for curent view");
      }

      const path = injectValuesIntoRoute(
        currentRoute.route,
        this.store.view.currentViewProps ?? {}
      );

      if (path !== window.location.pathname)
        window.history.pushState(null, "", path);
    });
  };

  attachListeners = () => {
    document.addEventListener("click", this.clickListener);
    window.addEventListener("popstate", this.historyListener);
    this.syncLocationWithStore();
  };

  redirect = (path: string, replace?: boolean) => {
    // If we're replacing the state we have to do it here
    // Otherwise we'll let the `syncLocationWithStore` take care of it
    console.debug(
      `router :: ${replace ? "Replacing" : "Pushing"} "${path}" to history`
    );
    if (replace) {
      window.history.replaceState(null, "", path);
    }
    this.matchPath(path);
  };
}

export const startRouting = (
  actions: Record<AppActions, ActionExecutor>,
  store: AppStore
) => {
  const router = new Router(store, actions);

  // Attach to the browser event handlers
  router.attachListeners();

  // Run the initial routing
  router.matchPath(document.location.pathname);

  return router;
};
