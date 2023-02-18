import { ParentComponent, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

import {
  SideBarStore,
  init as initSideBar,
  actions as sideBarActions,
} from "./side_bar.js";
import { keybindings } from "../lib/keybindings.js";

export type ActionProps = {
  store: AppStore;
  setStore: SetStoreFunction<AppStore>;
  params?: any;
};

export type ActionDefinition = {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly shortcut?: string;
  readonly perform: ({ store, setStore, params }: ActionProps) => void;
};

export type AppStore = {
  sideBar: SideBarStore;
};

// Actions
const actions = [...sideBarActions];
type AppActions = (typeof actions)[number]["id"];

const AppStoreContext = createContext<{
  store: AppStore;
  actions: Record<AppActions, () => void>;
}>();

export const AppStoreProvider: ParentComponent = (props) => {
  const sideBar = initSideBar();

  const [store, setStore] = createStore<AppStore>({ sideBar });

  const actionPerformers = actions.reduce((acc, action: ActionDefinition) => {
    return {
      ...acc,
      [action.id]: (params: any) => {
        console.log(`executing action :: ${action.id}`);
        action.perform({ store, setStore, params });
      },
    };
  }, {} as Record<AppActions, () => void>);

  keybindings(
    window,
    actions.reduce((acc, action: ActionDefinition) => {
      if (action.shortcut) {
        return {
          ...acc,
          [action.shortcut]: (e: KeyboardEvent) => {
            if (e.repeat) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();

            console.log(`got shortcut for action :: ${action.id}`);
            action.perform({ store, setStore });
          },
        };
      }
      return { ...acc };
    }, {})
  );

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
