import { ParentComponent } from "solid-js";

import { classes } from "@ponder/client/lib/classes";
import { Command, executeCommand } from "@ponder/client/lib/commands/commands";

interface CommandPaletteRowProps {
  selected: boolean;
  command: Command;
}

export const CommandPaletteRow: ParentComponent<CommandPaletteRowProps> = (
  props
) => {
  return (
    <div
      class={classes(
        "cursor-pointer rounded-sm p-1 px-2 text-sm",
        props.selected &&
          "bg-[var(--commandPalette-selectedBackground)] text-[var(--commandPalette-selectedForeground)]"
      )}
      onClick={() => {
        executeCommand(props.command.id);
        executeCommand("commandPalette.hide");
      }}
    >
      {props.children}
    </div>
  );
};
