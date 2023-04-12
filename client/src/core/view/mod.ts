import { App } from "@ponder/client/store/app.tsx";

export type MainViews =
  | "home"
  | "channel"
  | "thread"
  | "new_thread"
  | "advanced_app_settings";

export interface ViewStore {
  currentView: MainViews;
  currentViewProps: Record<string, string | null> | null;
  showCommandPalette: boolean;
}

export const init = (app: App) => {
  const store: ViewStore = {
    currentView: "home",
    currentViewProps: null,
    showCommandPalette: false,
  };

  app.setStore("view", store);
};
