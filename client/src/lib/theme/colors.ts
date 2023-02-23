interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Hsl {
  h: number;
  s: number;
  l: number;
}

// TODO: add better hex handling
export const hexToRgb = (rgbHex: string): Rgb => {
  const match = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(
    rgbHex
  );

  if (!match) {
    throw new Error("Error parsing rgb hex string.");
  }

  return {
    r: Number.parseInt(match[1], 16) / 255,
    g: Number.parseInt(match[2], 16) / 255,
    b: Number.parseInt(match[3], 16) / 255,
  };
};

export const rgbToHex = (color: Rgb): string => {
  return `#${Math.round(color.r * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(color.g * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(color.b * 255)
    .toString(16)
    .padStart(2, "0")}`;
};

// https://www.w3.org/TR/css-color-4/#rgb-to-hsl
export const rgbToHsl = (color: Rgb) => {
  const red = color.r;
  const green = color.g;
  const blue = color.b;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let hue = NaN;
  let sat = 0;
  const light = (min + max) / 2;
  const d = max - min;

  if (d !== 0) {
    sat =
      light === 0 || light === 1
        ? 0
        : (max - light) / Math.min(light, 1 - light);

    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      case blue:
        hue = (red - green) / d + 4;
    }

    hue = hue * 60;
  }

  return { h: hue, s: sat * 100, l: light * 100 };
};

export const hslToRgb = (color: Hsl): Rgb => {
  let hue = color.h % 360;

  if (hue < 0) {
    hue += 360;
  }

  const sat = color.s / 100;
  const light = color.l / 100;

  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };

  return { r: f(0), g: f(8), b: f(4) };
};

export const lighten = (color: Hsl, amount: number) => {
  return { ...color, l: Math.min(100, color.l + amount) };
};
