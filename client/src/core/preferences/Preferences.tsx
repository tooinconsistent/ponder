import { ParentComponent, createContext } from "solid-js";
import { createStore } from "solid-js/store";

import { getInitialTheme, injectColorSystem, setColorTheme } from "./theme.ts";
import { ColorTheme } from "@ponder/client/lib/theme/theme.ts";

export interface Preferences {
  theme: ColorTheme;
}

// Color theme setup
injectColorSystem();
const initialTheme = getInitialTheme();
setColorTheme(initialTheme);

const [preferences, setPreferences] = createStore<Preferences>({
  theme: initialTheme,
});

export const PreferencesContext = createContext({
  preferences,
  setPreferences,
});

export const PreferencesProvider: ParentComponent = (props) => {
  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {props.children}
    </PreferencesContext.Provider>
  );
};
