import { JSX, ParentComponent, Show, createSignal } from "solid-js";
import { ChevronDown } from "./icons/ChevronDown.tsx";
import { ChevronRight } from "./icons/ChevronRight.tsx";

interface SidebarSectionProps {
  collapsed?: boolean;

  sectionTitle: string;
  sectionHeaderActions?: JSX.Element;
}

export const SidebarSection: ParentComponent<SidebarSectionProps> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const [isOpen, setIsOpen] = createSignal(!props.collapsed);

  return (
    <div>
      <div
        class="flex cursor-pointer select-none justify-between bg-[var(--sideBarSectionHeader-background)] p-1 px-2 text-sm font-semibold text-[var(--sideBarSectionHeader-foreground)]"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div class="flex">
          {isOpen() ? <ChevronDown /> : <ChevronRight />}
          <div>{props.sectionTitle}</div>
        </div>
        <div>{props.sectionHeaderActions}</div>
      </div>
      <Show when={isOpen()}>
        <div>{props.children}</div>
      </Show>
    </div>
  );
};
