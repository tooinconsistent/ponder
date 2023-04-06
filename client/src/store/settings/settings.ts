import { App } from "../app.tsx";
import { applicationSettings } from "./applicationSettings.ts";

type ApplicationSettings = {
  [K in keyof typeof applicationSettings]: (typeof applicationSettings)[K]["defaultValue"];
};

export interface SettingsStore {
  applicationSettings: ApplicationSettings;
}

export const init = (app: App) => {
  const userSettings = {};

  const defaultSettings = (
    Object.keys(applicationSettings) as Array<keyof typeof applicationSettings>
  ).reduce((pv, cv) => {
    return {
      ...pv,
      [cv]: applicationSettings[cv].defaultValue,
    };
  }, {} as ApplicationSettings);

  const store: SettingsStore = {
    applicationSettings: { ...defaultSettings, ...userSettings },
  };

  app.setStore("settings", store);
};
