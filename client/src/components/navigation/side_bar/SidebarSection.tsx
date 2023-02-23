import { JSX, ParentComponent, children } from "solid-js";

interface SidebarSectionProps {
  sectionTitle: string;
  sectionHeaderActions?: JSX.Element;
}

export const SidebarSection: ParentComponent<SidebarSectionProps> = (props) => {
  return (
    <>
      <div class="bg-[var(--sideBarSectionHeader-background)] text-[var(--sideBarSectionHeader-foreground)] flex justify-between p-1 px-2 text-sm font-semibold">
        <div>{props.sectionTitle}</div>
        <div>{props.sectionHeaderActions}</div>
      </div>
      <div>{props.children}</div>
    </>
  );
};
