import { Component } from "solid-js";

import { classes } from "@ponder/client/lib/classes.ts";

import { SideBarViewTitle } from "@ponder/client/atoms/SideBarViewTitle.jsx";
import { SidebarSection } from "@ponder/client/atoms/SidebarSection.jsx";
import { executeCommand } from "@ponder/client/lib/commands/commands";

export const SettingsSidebarView: Component = (_props) => {
  return (
    <div class="h-full">
      <SideBarViewTitle title="Settings" />
      <SidebarSection sectionTitle="Advanced Settings">
        <div
          onClick={() => {
            executeCommand("view.openAdvancedAppSettings");
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
