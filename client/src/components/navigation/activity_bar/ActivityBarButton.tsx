import { classes } from "@tooinconsistent/client/lib/classes.js";
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
        "w-12 h-12 p-2 text-fg-2 hover:text-fg-0 flex justify-center items-center border-l-2 cursor-pointer",
        props.isActive ? "border-fg-0" : "border-transparent"
      )}
    >
      {props.children}
    </div>
  );
};
