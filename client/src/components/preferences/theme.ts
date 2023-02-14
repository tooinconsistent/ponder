import z from "zod";

const THEME_LOCAL_STORAGE_KEY = "ponder/theme";

const ColorTheme = z.object({
  background: z.string(),

  "base-0": z.string(),
  "base-1": z.string(),
  "base-2": z.string(),

  "fg-0": z.string(),
  "fg-1": z.string(),
  "fg-2": z.string(),

  accent: z.string(),
  primary: z.string(),
  secondary: z.string(),
  tetriary: z.string(),

  error: z.string(),
  advanced: z.string(),
  warning: z.string(),
  success: z.string(),
  uncommon: z.string(),
});

export type ColorTheme = z.infer<typeof ColorTheme>;

const NORD_THEME: ColorTheme = {
  background: "#2E3440",

  "base-0": "#3B4252",
  "base-1": "#434C5E",
  "base-2": "#4C566A",

  "fg-0": "#ECEFF4",
  "fg-1": "#E5E9F0",
  "fg-2": "#D8DEE9",

  accent: "#8FBCBB",
  primary: "#88C0D0",
  secondary: "#81A1C1",
  tetriary: "#5E81AC",

  error: "#BF616A",
  advanced: "#D08770",
  warning: "#EBCB8B",
  success: "#A3BE8C",
  uncommon: "#B48EAD",
};

const SOLARIZED_LIGHT_THEME: ColorTheme = {
  background: "#fdf6e3",

  "base-0": "#eee8d5",
  "base-1": "#93a1a1",
  "base-2": "#839496",

  "fg-0": "#657b83",
  "fg-1": "#586e75",
  "fg-2": "#073642",

  accent: "#8FBCBB",
  primary: "#88C0D0",
  secondary: "#81A1C1",
  tetriary: "#5E81AC",

  error: "#BF616A",
  advanced: "#D08770",
  warning: "#EBCB8B",
  success: "#A3BE8C",
  uncommon: "#B48EAD",
};

export const getInitialTheme = (): ColorTheme => {
  const storedThemeString = globalThis.localStorage.getItem(
    THEME_LOCAL_STORAGE_KEY
  );

  try {
    const storedTheme = JSON.parse(storedThemeString ?? "");
    return ColorTheme.parse(storedTheme);
  } catch (err) {
    return NORD_THEME;
    // return SOLARIZED_LIGHT_THEME;
  }
};

export const injectColorSystem = () => {
  const themeStyleElement = document.createElement("style");
  themeStyleElement.id = "ponder-color-theme";
  document.head.appendChild(themeStyleElement);
};

export const setColorTheme = (newTheme: ColorTheme) => {
  const themeStyleElement = document.getElementById("ponder-color-theme");
  if (!themeStyleElement) {
    throw new Error("theme :: Tried to set theme before style injection.");
  }
  themeStyleElement.innerHTML = `
    :root {
      --color-background: ${newTheme.background};

      --color-base-0: ${newTheme["base-0"]};
      --color-base-1: ${newTheme["base-1"]};
      --color-base-2: ${newTheme["base-2"]};

      --color-fg-0: ${newTheme["fg-0"]};
      --color-fg-1: ${newTheme["fg-1"]};
      --color-fg-2: ${newTheme["fg-2"]};

      --color-accent: ${newTheme.accent};
      --color-primary: ${newTheme.primary};
      --color-secondary: ${newTheme.secondary};
      --color-tetriary: ${newTheme.tetriary};

      --color-error: ${newTheme.error};
      --color-advanced: ${newTheme.advanced};
      --color-warning: ${newTheme.warning};
      --color-success: ${newTheme.success};
      --color-uncommon: ${newTheme.uncommon};
    }  
  `;
};

export const injectColorTransitions = () => {
  const transitionsStyleElement = document.createElement("style");
  transitionsStyleElement.id = "ponder-color-transitions";
  document.head.appendChild(transitionsStyleElement);
  transitionsStyleElement.innerHTML = `
    :root {
      --theme-transition: 500ms;
    }

    *,
    *::before,
    *::after {
      transition: background-color var(--theme-transition),
      color var(--theme-transition);
    }
  `;
};

export const removeColorTransitions = () => {
  const transitionsStyleElement = document.getElementById(
    "ponder-color-transitions"
  );

  if (transitionsStyleElement) {
    transitionsStyleElement.remove();
  }
};
