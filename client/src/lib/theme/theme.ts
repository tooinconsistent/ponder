import { z } from "zod";
import { hexToRgb, hslToRgb, lighten, rgbToHex, rgbToHsl } from "./colors.js";

export const ColorTheme = z.object({
  name: z.string(),
  palette: z.record(z.string(), z.string()),
  colors: z.record(
    z.string(),
    z.union([z.string(), z.record(z.string(), z.string())])
  ),
});

const functionMatch = /^(\w+)\(([\w\s(),]+)\)$/;

export type ColorTheme = z.infer<typeof ColorTheme>;

export const colorsFromTheme = (theme: ColorTheme): Record<string, string> => {
  const parseColor = (color: string): string => {
    // If color is raw hex just return it
    if (color.startsWith("#") || color === "transparent") {
      return color;
    }

    // test for function
    const functionMatchResult = functionMatch.exec(color);
    if (functionMatchResult) {
      if (functionMatchResult[1] === "lighten") {
        const [color, amount] = functionMatchResult[2].split(",");

        if (!color || !amount || Number.isNaN(Number(amount))) {
          throw new Error(
            "Failed to parse theme :: invalid application of lighten."
          );
        }

        const parsedColor = parseColor(color);
        const lightenBy = Number(amount);

        const hsl = rgbToHsl(hexToRgb(parsedColor));
        const lightened = lighten(hsl, lightenBy);
        const result = rgbToHex(hslToRgb(lightened));

        return result;
      }

      throw new Error("Failed to parse theme :: unknown function.");
    }

    // TODO: Add color processing functions here.
    // https://github.com/bgrins/TinyColor/blob/master/tinycolor.js

    // Otherwise look it up in palette
    const paletteColor = theme.palette[color];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (paletteColor === undefined) {
      throw new Error("Failed to parse theme :: failed to lookup color.");
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
