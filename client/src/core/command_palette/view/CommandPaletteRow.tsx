import { classes } from "@ponder/client/lib/classes";
import { ParentComponent, Show } from "solid-js";

interface CommandPaletteRowProps {
  selected: boolean;
}

export const CommandPaletteRow: ParentComponent<CommandPaletteRowProps> = (
  props
) => {
  return (
    <div
      class={classes(
        "rounded-sm p-1 px-2 text-sm",
        props.selected &&
          "bg-[var(--commandPalette-selectedBackground)] text-[var(--commandPalette-selectedForeground)]"
      )}
    >
      {props.children}
    </div>
  );
};
