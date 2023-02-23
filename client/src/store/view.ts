import { produce } from "solid-js/store";
import { ActionProps } from "./app.jsx";

export type MainViews = "home" | "channel" | "thread";

export interface ViewStore {
  currentView: MainViews;
  currentViewProps: Record<string, string> | null;
}

const id = "view";

export const init = () => {
  const store: ViewStore = {
    currentView: "home",
    currentViewProps: null,
  };

  return store;
};

export const actions = [
  {
    id: "openChannel",
    title: "Open Channel",
    perform: ({ setStore, params }: ActionProps<{ channelId: string }>) => {
      setStore(
        produce((s) => {
          s.view.currentView = "channel";
          s.view.currentViewProps = { channelId: params.channelId };
        })
      );
    },
  },
] as const;

const effects = [] as const;

export const view = {
  id,
  init,
  actions,
  effects,
};
