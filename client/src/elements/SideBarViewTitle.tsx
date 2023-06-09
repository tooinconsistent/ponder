import { Component, JSX } from "solid-js";

interface SideBarViewTitleProps {
  title: string;
  actions?: JSX.Element;
}

export const SideBarViewTitle: Component<SideBarViewTitleProps> = (props) => {
  return (
    <div class="flex p-5 py-2 text-[var(--sideBarTitle-foreground)]">
      <div class="font-light">{props.title}</div>
      <div>{props.actions}</div>
    </div>
  );
};
