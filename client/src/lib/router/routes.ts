interface RouteDefinition {
  route: string;
  handler: <T = void>(viewStore: any, routeParams?: T) => void;
}

export const routes: RouteDefinition[] = [
  {
    route: "/channel/:channelId",
    handler: (viewStore, routeParams) =>
      viewStore.openDecisionView({ channelId: routeParams.channelId }),
  },
  {
    route: "/settings",
    handler: (viewStore) => viewStore.openSettingsView(),
  },
];
