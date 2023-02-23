import { ParentComponent } from "solid-js";

import { classes } from "@tooinconsistent/client/lib/classes.js";

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
    "bg-[var(--button-background)] text-[var(--button-foreground)] border-[var(--button-border)] hover:bg-[var(--button-hoverBackground)]",
  secondary:
    "bg-[var(--button-secondaryBackground)] text-[var(--button-secondaryForeground)] border-[var(--button-secondaryBorder)] hover:bg-[var(--button-secondaryHoverBackground)]",
  white:
    "bg-[var(--button-whiteBackground)] text-[var(--button-whiteForeground)] border-[var(--button-whiteBorder)] hover:bg-[var(--button-whiteHoverBackground)]",
};

interface ButtonProps {
  variant?: "primary" | "secondary" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class={classes(
        "border rounded inline-flex items-center",
        paddingForSize[props.size ?? "md"],
        textForSize[props.size ?? "md"],
        colorsForVariant[props.variant ?? "primary"]
      )}
    >
      {props.children}
    </button>
  );
};
