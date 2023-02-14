import { ParentComponent, createContext } from "solid-js";
import { createStore } from "solid-js/store";

import {
  ColorTheme,
  getInitialTheme,
  injectColorSystem,
  setColorTheme,
} from "./theme.js";

export type Preferences = {
  theme: ColorTheme;
};

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
