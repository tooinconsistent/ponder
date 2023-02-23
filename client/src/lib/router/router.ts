import { routeToRegex } from "./routeHelper.js";
import { routes } from "./routes.js";

const routeMatchers = routes.map((route) => ({
  ...route,
  ...routeToRegex(route.route),
}));

export class Router {
  constructor(private viewStore: Instance<typeof ViewStore>) {}

  matchPath = (path: string) => {
    let matchingRoute = routeMatchers.find((routeMatcher) =>
      routeMatcher.pattern.test(path)
    );

    if (!matchingRoute) {
      // TODO: Handle 404 gracefully
      console.error(`ROUTER::"${path}" not found`);
      matchingRoute = routeMatchers[0];
    }

    const matches = matchingRoute.pattern.exec(path)!;
    const routeParams = matchingRoute.keys.reduce(
      (rp, key, i) => ({ ...rp, [key]: matches[i + 1] }),
      {}
    );

    console.debug(`ROUTER::Scrolling to top`);
    window.scrollTo(0, 0);

    console.debug(`ROUTER::Navigating to ${matchingRoute.route}`);
    return matchingRoute.handler(this.viewStore, routeParams);
  };

  clickListener = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement)?.closest("a");
    const path = anchor?.pathname;
    if (!path || anchor?.target || anchor?.host !== window.location.host)
      return;
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.button ||
      event.defaultPrevented
    )
      return;

    console.debug(`ROUTER::Handling click on the target: ${event.target}`);
    event.preventDefault();
    this.matchPath(path);
  };

  historyListener = () => {
    console.debug(`ROUTER::Handling history PopState event`);
    this.matchPath(document.location.pathname);
  };

  syncLocationWithStore = () => {
    // Keep browser history in sync with the store
    autorun(() => {
      const path = this.viewStore.currentPath;
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
      `ROUTER::${replace ? "Replacing" : "Pushing"} "${path}" to history`
    );
    if (replace) {
      window.history.replaceState(null, "", path);
    }
    this.matchPath(path);
  };
}

export const startRouting = (viewStore: Instance<typeof ViewStore>) => {
  const router = new Router(viewStore);

  // Attach to the browser event handlers
  router.attachListeners();

  // Run the initial routing
  router.matchPath(document.location.pathname);

  return router;
};

const RouterContext = React.createContext<{ router: Router }>({
  router: {} as Router,
});

export const useRouter = () => useContext(RouterContext);
export const RouterProvider = RouterContext.Provider;
