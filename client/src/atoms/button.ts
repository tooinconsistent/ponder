import { classes } from "@ponder/client/lib/classes.ts";

const paddingForSize = {
  xs: "px-2.5 py-1.5",
  sm: "px-3 py-2",
  md: "px-4 py-2",
  lg: "px-4 py-2",
  xl: "px-6 py-3",
};

const textForSize = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-base",
};

const colorsForVariant = {
  primary:
    "bg-[var(--button-background)] text-[var(--button-foreground)] border-[var(--button-border)] hover:bg-[var(--button-hoverBackground)] disabled:bg-[var(--button-disabledBackground)]",
  secondary:
    "bg-[var(--button-secondaryBackground)] text-[var(--button-secondaryForeground)] border-[var(--button-secondaryBorder)] hover:bg-[var(--button-secondaryHoverBackground)] disabled:bg-[var(--button-secondaryDisabledBackground)]",
  white:
    "bg-[var(--button-whiteBackground)] text-[var(--button-whiteForeground)] border-[var(--button-whiteBorder)] hover:bg-[var(--button-whiteHoverBackground)] disabled:bg-[var(--button-whiteDisabledBackground)]",
};

export const buttonClasses = (p?: {
  variant?: "primary" | "secondary" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  return classes(
    "border rounded inline-flex items-center",
    paddingForSize[p?.size ?? "md"],
    textForSize[p?.size ?? "md"],
    colorsForVariant[p?.variant ?? "primary"]
  );
};
