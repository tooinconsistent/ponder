import { applicationSettings } from "./applicationSettings.js";

type ApplicationSettings = {
  [K in keyof typeof applicationSettings]: (typeof applicationSettings)[K]["defaultValue"];
};

export interface SettingsStore {
  applicationSettings: ApplicationSettings;
}

const id = "settings";

const init = (): SettingsStore => {
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

  return store;
};

const actions = [] as const;

const effects = [] as const;

export const settings = {
  id,
  init,
  actions,
  effects,
};
