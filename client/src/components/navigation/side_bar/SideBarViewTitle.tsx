import { Component, JSX } from "solid-js";

interface SideBarViewTitleProps {
  title: string;
  actions?: JSX.Element;
}

export const SideBarViewTitle: Component<SideBarViewTitleProps> = (props) => {
  return (
    <div class="py-2 p-5 text-[var(--sideBarTitle-foreground)] flex">
      <div class="font-light">{props.title}</div>
      <div>{props.actions}</div>
    </div>
  );
};
