import { classes } from "@ponder/client/lib/classes.js";
import { ParentComponent } from "solid-js";

interface ActivityBarButtonProps {
  isActive: boolean;
  onClick: (e: MouseEvent) => void;
}

export const ActivityBarButton: ParentComponent<ActivityBarButtonProps> = (
  props
) => {
  return (
    <div
      onClick={props.onClick}
      class={classes(
        "flex h-12 w-12 cursor-pointer items-center justify-center border-l-2 p-2",
        props.isActive
          ? "text-[var(--activityBar-foreground)]"
          : "text-[var(--activityBar-inactiveForeground)] hover:text-[var(--activityBar-foreground)]",
        props.isActive
          ? "border-[var(--activityBar-activeBorder)]"
          : "border-transparent",
        props.isActive ? "bg-[var(--activityBar-activeBackground)]" : null
      )}
    >
      {props.children}
    </div>
  );
};
