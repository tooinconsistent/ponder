import { Component, createSignal } from "solid-js";

import { EditorView } from "codemirror";

import { classes } from "@ponder/client/lib/classes.ts";
import { buttonClasses } from "../../atoms/button.ts";

import { JsonEditor } from "./json_editor/JsonEditor.jsx";
import { applicationSettings } from "@ponder/client/store/settings/applicationSettings.ts";

const getDefaultSettingsJson = () => {
  const settings = Object.entries(applicationSettings).map(
    ([settingsKey, settingsDefinition]) => {
      return `  // ${settingsDefinition.description}
  "${settingsKey}": ${JSON.stringify(settingsDefinition.defaultValue)},`;
    }
  );

  return `{
${settings.join("\n")}
}`;
};

export const AdvancedAppSettings: Component = (_props) => {
  const [userSettingsEditor, setUserSettingsEditor] =
    createSignal<EditorView>();

  return (
    <div class="px-10 py-8">
      <h1 class="mb-3 text-[var(--textHeader-foreground)]">Your Settings</h1>
      <div class="mb-3 text-sm text-[var(--textDescription-foreground)]">
        Must be valid JSON.
      </div>
      <JsonEditor doc="{\n\n}" setEditor={setUserSettingsEditor} />
      <button
        class={classes(
          buttonClasses({ variant: "primary", size: "md" }),
          "mt-2"
        )}
        onClick={() => {
          console.log(userSettingsEditor()?.state.doc.sliceString(0));
        }}
      >
        Save
      </button>

      <h1 class="mt-6 text-[var(--textHeader-foreground)]">Default Settings</h1>
      <div class="mb-3 text-sm text-[var(--textDescription-foreground)]">
        Provided for reference, you can edit them in your own settings.
      </div>
      <JsonEditor doc={getDefaultSettingsJson()} readOnly skipLint />
    </div>
  );
};
