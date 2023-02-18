import { ColorTheme } from "./theme.js";

const darkPalette = {
  base0: "#002b36",
  base1: "#073642",

  base2: "#586e75",
  base3: "#657b83",
  base4: "#839496",
  base5: "#93a1a1",

  base6: "#eee8d5",
  base7: "#fdf6e3",

  primary: "#2aa198",
  secondary: "#6c71c4",
  tetriary: "#2aa198",

  error: "#dc322f",
  advanced: "#b58900",
  warning: "#cb4b16",
  success: "#859900",
  uncommon: "#d33682",
};

export const solarizedDarkTheme: ColorTheme = {
  name: "Solarized Dark",
  palette: darkPalette,
  colors: {
    base: {
      background: "base0",
      foreground: "base4",
    },

    activityBar: {
      background: "base1",
      border: "base1",
      foreground: "base6",
      inactiveForeground: "base4",

      activeBorder: "base6",
      activeBackground: "base1",
    },

    sideBar: {
      background: "base1",
      foreground: "base4",
      border: "base1",
    },

    sideBarTitle: {
      foreground: "base5",
    },
  },
};

// base.backround: Base background for all elements, unless overriden.
// base.foreground: Base foreground for all elements, unless overriden.

// activityBar.background: Activity Bar background color.
// activityBar.border: Activity Bar border color with the Side Bar.
// activityBar.foreground: Activity Bar foreground color (for example used for the icons).
// activityBar.inactiveForeground: Activity Bar item foreground color when it is inactive.

// activityBar.activeBorder: Activity Bar active indicator border color.
// activityBar.activeBackground: Activity Bar optional background color for the active element.

// activityBar.dropBorder: Drag and drop feedback color for the activity bar items.

// activityBarBadge.background: Activity notification badge background color.
// activityBarBadge.foreground: Activity notification badge foreground color.

// =======================

// sideBar.background: Side Bar background color.
// sideBar.foreground: Side Bar foreground color.
// sideBar.border: Side Bar border color on the side separating the editor.

// sideBarTitle.foreground: Side Bar title foreground color.

// sideBarSectionHeader.background: Side Bar section header background color.
// sideBarSectionHeader.foreground: Side Bar section header foreground color.
// sideBarSectionHeader.border: Side bar section header border color.
