import { SetStoreFunction } from "solid-js/store";

import { ActionDefinition } from "@tooinconsistent/client/store/app.jsx";
import { AppStore } from "@tooinconsistent/client/store/registry.js";

import { keybindings } from "./keybindings.js";

export const initialiseShortcuts = (
  actions: ActionDefinition[],
  store: AppStore,
  setStore: SetStoreFunction<AppStore>
) => {
  keybindings(
    window,
    actions.reduce((acc, action) => {
      if (action.shortcut) {
        return {
          ...acc,
          [action.shortcut]: (e: KeyboardEvent) => {
            if (e.repeat) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();

            console.debug(
              `shortcuts :: got shortcut for action :: ${action.id}`
            );
            action.perform({ store, setStore, params: undefined as never });
          },
        };
      }
      return { ...acc };
    }, {})
  );
};
