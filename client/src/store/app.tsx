import { ParentComponent, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

import { AppStore } from "./registry.ts";
import { startRouting } from "../lib/router/router.ts";

import { init as initChannel } from "../apps/channel/mod.ts";
import { init as initThread } from "../apps/thread/mod.ts";
import { init as initThreadComposer } from "../apps/thread_composer/mod.ts";

import { init as initChannels } from "../sidebar_apps/channels/mod.ts";

import { init as initThreadResource } from "./resources/threads.ts";
import { init as initChannelResource } from "./resources/channels.ts";
import { init as initUsersResource } from "./resources/users.ts";

import { init as initView } from "../core/view/mod.ts";
import { init as initPalette } from "../core/command_palette/mod.ts";
import { init as initSideBar } from "../core/navigation/side_bar/mod.ts";

import { initialiseKeyBindings } from "../lib/keybindings/keybindings.ts";
import { sortPaletteCommands } from "../lib/commands/palette.ts";

export interface App {
  store: AppStore;
  setStore: SetStoreFunction<AppStore>;
}

const AppStoreContext = createContext<{
  store: AppStore;
}>();

export const AppStoreProvider: ParentComponent = (props) => {
  // Get inital store values
  const [store, setStore] = createStore<AppStore>({} as AppStore);

  const app = { store, setStore };

  // Initialise core
  initView(app);
  initPalette(app);
  initialiseKeyBindings();
  initSideBar(app);

  // Initialise apps
  initChannel(app);
  initThread(app);
  initThreadComposer(app);

  // Initialise sidebar apps
  initChannels(app);

  // Initialise resources
  initThreadResource(app);
  initChannelResource(app);
  initUsersResource(app);

  // Various random bits
  sortPaletteCommands();
  // Start routing
  startRouting(app);

  return (
    <AppStoreContext.Provider value={{ store }}>
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
