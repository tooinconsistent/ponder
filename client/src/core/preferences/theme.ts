import { ColorTheme, colorsFromTheme } from "@ponder/client/lib/theme/theme.js";

import { solarizedDarkTheme } from "@ponder/client/lib/theme/solarized.js";

const THEME_LOCAL_STORAGE_KEY = "ponder/theme";

export const getInitialTheme = (): ColorTheme => {
  const storedThemeString = globalThis.localStorage.getItem(
    THEME_LOCAL_STORAGE_KEY
  );

  try {
    const storedTheme = JSON.parse(storedThemeString ?? "") as ColorTheme;
    return ColorTheme.parse(storedTheme);
  } catch (err) {
    return solarizedDarkTheme;
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

  const colors = colorsFromTheme(newTheme);
  const colorVariables = Object.entries(colors).map(
    ([colorName, value]) => `--${colorName.replace(".", "-")}: ${value};`
  );

  themeStyleElement.innerHTML = `
    :root {
      ${colorVariables.join("\n")}
    }  
  `;
};

// TODO: maybe bring back below at some point or delete

// export const injectColorTransitions = () => {
//   const transitionsStyleElement = document.createElement("style");
//   transitionsStyleElement.id = "ponder-color-transitions";
//   document.head.appendChild(transitionsStyleElement);
//   transitionsStyleElement.innerHTML = `
//     :root {
//       --theme-transition: 500ms;
//     }

//     *,
//     *::before,
//     *::after {
//       transition: background-color var(--theme-transition),
//       color var(--theme-transition);
//     }
//   `;
// };

// export const removeColorTransitions = () => {
//   const transitionsStyleElement = document.getElementById(
//     "ponder-color-transitions"
//   );

//   if (transitionsStyleElement) {
//     transitionsStyleElement.remove();
//   }
// };
