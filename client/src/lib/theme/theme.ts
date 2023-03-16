import { z } from "zod";
// TODO: move to typebox
// import { Static, Type } from '@sinclair/typebox'

import { hexToRgb, hslToRgb, lighten, rgbToHex, rgbToHsl } from "./colors.ts";

export const ColorTheme = z.object({
  name: z.string(),
  palette: z.record(z.string(), z.string()),
  colors: z.record(
    z.string(),
    z.union([z.string(), z.record(z.string(), z.string())])
  ),
});

const functionMatch = /^(\w+)\(([\w\s(),]+)\)$/;
const parseColor = (color: string, theme: ColorTheme): string => {
  // If color is raw hex just return it
  if (color.startsWith("#") || color === "transparent") {
    return color;
  }

  // test for function
  const functionMatchResult = functionMatch.exec(color);
  if (functionMatchResult) {
    // TODO: Add more color processing functions here.
    // https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
    if (functionMatchResult[1] === "lighten") {
      const [color, amount] = functionMatchResult[2].split(",");

      if (!color || !amount || Number.isNaN(Number(amount))) {
        throw new Error(
          "Failed to parse theme :: invalid application of lighten."
        );
      }

      const parsedColor = parseColor(color, theme);
      const lightenBy = Number(amount);

      const hsl = rgbToHsl(hexToRgb(parsedColor));
      const lightened = lighten(hsl, lightenBy);
      const result = rgbToHex(hslToRgb(lightened));

      return result;
    }

    throw new Error("Failed to parse theme :: unknown function.");
  }

  // Otherwise look it up in palette
  const paletteColor = theme.palette[color];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (paletteColor === undefined) {
    throw new Error(
      `Failed to parse theme :: failed to look up the color: ${color}.`
    );
  }

  return paletteColor;
};

export type ColorTheme = z.infer<typeof ColorTheme>;

export const colorsFromTheme = (theme: ColorTheme): Record<string, string> => {
  ColorTheme.parse(theme);

  const flattenedColorMap = flatten(theme.colors);

  return Object.entries(flattenedColorMap).reduce((acc, [colorName, value]) => {
    const parsedColor = parseColor(value, theme);

    return { ...acc, [colorName]: parsedColor };
  }, {});
};

const flatten = (object: Record<string, string | Record<string, string>>) => {
  const result: Record<string, string> = {};

  for (const key in object) {
    const current = object[key];
    if (typeof current === "object") {
      for (const childKey in current) {
        result[`${key}.${childKey}`] = current[childKey];
      }
    } else {
      result[key] = object[key] as string;
    }
  }

  return result;
};
