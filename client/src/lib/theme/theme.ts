import { z } from "zod";

export const ColorTheme = z.object({
  name: z.string(),
  palette: z.record(z.string(), z.string()),
  colors: z.record(
    z.string(),
    z.union([z.string(), z.record(z.string(), z.string())])
  ),
});

export type ColorTheme = z.infer<typeof ColorTheme>;

export const colorsFromTheme = (theme: ColorTheme): Record<string, string> => {
  const parseColor = (color: string): string => {
    // If color is raw hex just return it
    if (color.charAt(0) === "#") {
      return color;
    }

    // TODO: Add color processing functions here.
    // https://github.com/bgrins/TinyColor/blob/master/tinycolor.js

    // Otherwise look it up in palette
    const paletteColor = theme.palette[color];

    if (paletteColor === undefined) {
      throw new Error("Failed to parse theme.");
    }

    return paletteColor;
  };

  const flattenedColorMap = flatten(theme.colors);

  return Object.entries(flattenedColorMap).reduce((acc, [colorName, value]) => {
    const parsedColor = parseColor(value);

    return { ...acc, [colorName]: parsedColor };
  }, {});
};

const flatten = (object: Record<string, string | Record<string, string>>) => {
  let result: Record<string, string> = {};

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
