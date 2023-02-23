import { ActionProps } from "./app.jsx";

export type SideBarTabs = "inbox" | "channels" | "settings";

export interface SideBarStore {
  currentTab: SideBarTabs | null;
  preToggleTab: SideBarTabs | null;
}

const id = "sideBar";

const init = (): SideBarStore => {
  const store: SideBarStore = {
    currentTab: "inbox",
    preToggleTab: null,
  };

  return store;
};

const actions = [
  {
    id: "openChannels",
    title: "Open Channels",
    shortcut: "$mod+Shift+c",
    perform: ({ setStore }: ActionProps) => {
      setStore("sideBar", "currentTab", "channels");
    },
  },
  {
    id: "openInbox",
    title: "Open Inbox",
    shortcut: "$mod+Shift+i",
    perform: ({ setStore }: ActionProps) => {
      setStore("sideBar", "currentTab", "inbox");
    },
  },
  {
    id: "openSettings",
    title: "Open Settings",
    shortcut: "$mod+Shift+s",
    perform: ({ setStore }: ActionProps) => {
      setStore("sideBar", "currentTab", "settings");
    },
  },
  {
    id: "toggleSideBar",
    title: "Toggle SideBar",
    shortcut: "$mod+b",
    perform: ({ store, setStore }: ActionProps) => {
      if (store.sideBar.currentTab !== null) {
        setStore("sideBar", "preToggleTab", store.sideBar.currentTab);
        setStore("sideBar", "currentTab", null);
      } else {
        setStore("sideBar", "currentTab", store.sideBar.preToggleTab);
        setStore("sideBar", "preToggleTab", null);
      }
    },
  },
] as const;

const effects = [] as const;

export const sideBar = {
  id,
  init,
  actions,
  effects,
};
