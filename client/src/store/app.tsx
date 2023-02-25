import { ParentComponent, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

import { AppStore, registry } from "./registry.js";
import { initialiseShortcuts } from "../lib/shortcuts/shortcuts.js";
import { startRouting } from "../lib/router/router.js";
export interface ActionProps<T = never> {
  store: AppStore;
  setStore: SetStoreFunction<AppStore>;
  params: T;
}

export interface ActionDefinition<T = never> {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly shortcut?: string;
  readonly perform: ({ store, setStore, params }: ActionProps<T>) => void;
}

// Get inital store values
const initialStore = registry.reduce<AppStore>((appStore, currentStore) => {
  return { ...appStore, [currentStore.id]: currentStore.init() };
}, {} as AppStore);

// Actions
const actions = registry.map((store) => store.actions).flat();

export type AppActions = (typeof actions)[number]["id"];
export type ActionExecutor = <T>(params: T) => void;

const AppStoreContext = createContext<{
  store: AppStore;
  actions: Record<AppActions, ActionExecutor>;
}>();

export const AppStoreProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AppStore>(initialStore);

  const actionPerformers = actions.reduce<Record<AppActions, ActionExecutor>>(
    (acc, action) => {
      return {
        ...acc,
        [action.id]: (params: unknown) => {
          console.debug(`app :: executing action :: ${action.id}`);
          action.perform({ store, setStore, params: params as never });
        },
      };
    },
    {} as Record<AppActions, ActionExecutor>
  );

  initialiseShortcuts(actions, store, setStore);
  startRouting(actionPerformers, store);
  // https://github.com/leeoniya/uFuzzy -- for command palette

  return (
    <AppStoreContext.Provider value={{ store, actions: actionPerformers }}>
      {props.children}
    </AppStoreContext.Provider>
  );
};

export const useStore = () => {
  const storeContext = useContext(AppStoreContext);

  if (!storeContext) {
    throw new Error("Couldn't find AppStoreContext");
  }

  return storeContext;
};
