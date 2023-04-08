import { JSX, ParentComponent } from "solid-js";

interface SidebarSectionProps {
  sectionTitle: string;
  sectionHeaderActions?: JSX.Element;
}

export const SidebarSection: ParentComponent<SidebarSectionProps> = (props) => {
  return (
    <>
      <div class="flex justify-between bg-[var(--sideBarSectionHeader-background)] p-1 px-2 text-sm font-semibold text-[var(--sideBarSectionHeader-foreground)]">
        <div>{props.sectionTitle}</div>
        <div>{props.sectionHeaderActions}</div>
      </div>
      <div>{props.children}</div>
    </>
  );
};
