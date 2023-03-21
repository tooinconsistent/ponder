import { SetStoreFunction } from "solid-js/store";

import { ActionDefinition } from "@ponder/client/store/app.jsx";
import { AppStore } from "@ponder/client/store/registry.ts";

import { keys } from "./keys.ts";

export const initialiseShortcuts = (
  actions: ActionDefinition[],
  store: AppStore,
  setStore: SetStoreFunction<AppStore>
) => {
  keys(
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
