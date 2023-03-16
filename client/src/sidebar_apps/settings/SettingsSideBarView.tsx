import { Component } from "solid-js";

import { classes } from "@ponder/client/lib/classes.ts";
import { useStore } from "@ponder/client/store/app.jsx";

import { SideBarViewTitle } from "../../core/navigation/side_bar/SideBarViewTitle.jsx";
import { SidebarSection } from "../../core/navigation/side_bar/SidebarSection.jsx";

export const SettingsSidebarView: Component = (_props) => {
  const { actions } = useStore();

  return (
    <div class="h-full">
      <SideBarViewTitle title="Settings" />
      <SidebarSection sectionTitle="Advanced Settings">
        <div
          onClick={() => {
            actions.openAdvancedAppSettings({});
          }}
          class={classes(
            "cursor-pointer px-4 py-1 text-sm font-light",
            "hover:bg-[var(--list-hoverBackground)] hover:text-[var(--list-hoverForeground)]"
          )}
        >
          Application Settings
        </div>
      </SidebarSection>
    </div>
  );
};
