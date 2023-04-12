import { ColorTheme } from "./theme.ts";

const darkPalette = {
  base0: "#002b36",
  base1: "#073642",

  base2: "#586e75",
  base3: "#657b83",
  base4: "#839496",
  base5: "#93a1a1",

  base6: "#eee8d5",
  base7: "#fdf6e3",

  primary: "#2aa198",
  secondary: "#6c71c4",
  tetriary: "#2aa198",

  error: "#dc322f",
  advanced: "#b58900",
  warning: "#cb4b16",
  success: "#859900",
  uncommon: "#d33682",
};

export const solarizedDarkTheme: ColorTheme = {
  name: "Solarized Dark",
  palette: darkPalette,
  colors: {
    base: {
      background: "base1",
      foreground: "base4",
      focusBorder: "advanced",
    },

    button: {
      background: "primary",
      foreground: "base0",
      border: "transparent",
      hoverBackground: "lighten(primary, 5)",
      disabledBackground: "base2",

      secondaryBackground: "secondary",
      secondaryForeground: "base5",
      secondaryBorder: "transparent",
      secondaryHoverBackground: "lighten(secondary, 5)",
      secondaryDisabledBackground: "base4",

      whiteBackground: "base1",
      whiteForeground: "base4",
      whiteBorder: "base4",
      whiteHoverBackground: "base2",
      whiteDisabledBackground: "base1",
    },

    input: {
      background: "base0",
      foreground: "base5",
      placeholderForeground: "base3",
    },

    inputValidation: {
      errorBackground: "error",
      errorForeground: "base5",
      errorBorder: "error",
      infoBackground: "uncommon",
      infoForeground: "base5",
      infoBorder: "uncommon",
      warningBackground: "warning",
      warningForeground: "base5",
      warningBorder: "warning",
    },

    textDescription: {
      foreground: "base3",
    },

    textHeader: {
      foreground: "base6",
    },

    textPlaceholder: {
      foreground: "base2",
    },

    textLink: {
      activeForeground: "lighten(secondary, 10)",
      foreground: "secondary",
    },

    prose: {
      body: "base4",
      headings: "base6",
      lead: "base4",
      links: "secondary",
      bold: "base6",
      counters: "base3",
      bullets: "base3",
      hr: "base3",
      quotes: "base4",
      quoteBorders: "base5",
      captions: "base5",
      code: "base5",
      preCode: "base0",
      preBg: "base5",
      proseThBorders: "base3",
      proseTdBorders: "base2",
    },

    list: {
      hoverBackground: "base1",
      hoverForeground: "base5",

      inactiveSelectionBackground: "base2",
      inactiveSelectionForeground: "base6",
    },

    activityBar: {
      background: "base1",
      border: "base1",
      foreground: "base6",
      inactiveForeground: "base4",

      activeBorder: "base6",
      activeBackground: "base1",
    },

    sideBar: {
      background: "base0",
      foreground: "base4",
      border: "base1",
    },

    sideBarTitle: {
      foreground: "base5",
    },

    sideBarSectionHeader: {
      background: "base1",
      foreground: "base5",
      border: "base1",
    },

    statusBar: {
      background: "base0",
      foreground: "base4",
      border: "base1",
    },

    commandPalette: {
      background: "base0",
      foreground: "base4",
      border: "base1",
      selectedBackground: "base1",
      selectedForeground: "base4",
      matchForeground: "base6",
    },

    channel: {
      metaDetailsBackground: "base1",
      metaDetailsBorder: "base1",
      threadRowDivider: "base3",
      threadListBackground: "base1",
      threadRowSelectedBackground: "lighten(base1, 5)",
    },

    thread: {
      metaDetailsBackground: "base1",
      metaDetailsBorder: "base1",
      metaDetailsActionBackground: "base1",
      metaDetailsActionHoveredBackground: "lighten(base1, 5)",
      editorBorder: "base4",
      editorActiveBorder: "base6",
    },

    threadComposer: {
      border: "base1",
      background: "base0",
      separator: "base0",
      focusedBorder: "base4",
    },
  },
};

// button.background: Button background color.
// button.foreground: Button foreground color.
// button.border: Button border color.
// button.separator: Button separator color.
// button.hoverBackground: Button background color when hovering.
// button.secondaryForeground: Secondary button foreground color.
// button.secondaryBackground: Secondary button background color.
// button.secondaryHoverBackground: Secondary button background color when hovering.

// base.backround: Base background for all elements, unless overriden.
// base.foreground: Base foreground for all elements, unless overriden.

// activityBar.background: Activity Bar background color.
// activityBar.border: Activity Bar border color with the Side Bar.
// activityBar.foreground: Activity Bar foreground color (for example used for the icons).
// activityBar.inactiveForeground: Activity Bar item foreground color when it is inactive.

// activityBar.activeBorder: Activity Bar active indicator border color.
// activityBar.activeBackground: Activity Bar optional background color for the active element.

// activityBar.dropBorder: Drag and drop feedback color for the activity bar items.

// activityBarBadge.background: Activity notification badge background color.
// activityBarBadge.foreground: Activity notification badge foreground color.

// =======================

// sideBar.background: Side Bar background color.
// sideBar.foreground: Side Bar foreground color.
// sideBar.border: Side Bar border color on the side separating the editor.

// sideBarTitle.foreground: Side Bar title foreground color.

// sideBarSectionHeader.background: Side Bar section header background color.
// sideBarSectionHeader.foreground: Side Bar section header foreground color.
// sideBarSectionHeader.border: Side bar section header border color.

// list.activeSelectionBackground: List/Tree background color for the selected item when the list/tree is active.
// list.activeSelectionForeground: List/Tree foreground color for the selected item when the list/tree is active.
// list.activeSelectionIconForeground: List/Tree icon foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// list.dropBackground: List/Tree drag and drop background when moving items around using the mouse.
// list.focusBackground: List/Tree background color for the focused item when the list/tree is active.
// list.focusForeground: List/Tree foreground color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// list.focusHighlightForeground: List/Tree foreground color of the match highlights on actively focused items when searching inside the list/tree.
// list.focusOutline: List/Tree outline color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// list.focusAndSelectionOutline: List/Tree outline color for the focused item when the list/tree is active and selected. An active list/tree has keyboard focus, an inactive does not.
// list.highlightForeground: List/Tree foreground color of the match highlights when searching inside the list/tree.
// list.hoverBackground: List/Tree background when hovering over items using the mouse.
// list.hoverForeground: List/Tree foreground when hovering over items using the mouse.
// list.inactiveSelectionBackground: List/Tree background color for the selected item when the list/tree is inactive.
// list.inactiveSelectionForeground: List/Tree foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// list.inactiveSelectionIconForeground: List/Tree icon foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// list.inactiveFocusBackground: List background color for the focused item when the list is inactive. An active list has keyboard focus, an inactive does not. Currently only supported in lists.
// list.inactiveFocusOutline: List/Tree outline color for the focused item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// list.invalidItemForeground: List/Tree foreground color for invalid items, for example an unresolved root in explorer.
// list.errorForeground: Foreground color of list items containing errors.
// list.warningForeground: Foreground color of list items containing warnings.
// listFilterWidget.background: List/Tree Filter background color of typed text when searching inside the list/tree.
// listFilterWidget.outline: List/Tree Filter Widget's outline color of typed text when searching inside the list/tree.
// listFilterWidget.noMatchesOutline: List/Tree Filter Widget's outline color when no match is found of typed text when searching inside the list/tree.
// listFilterWidget.shadow: Shadown color of the type filter widget in lists and tree
// list.filterMatchBackground: Background color of the filtered matches in lists and trees.
// list.filterMatchBorder: Border color of the filtered matches in lists and trees.
// list.deemphasizedForeground: List/Tree foreground color for items that are deemphasized.
// tree.indentGuidesStroke: Tree Widget's stroke color for indent guides.
// tree.inactiveIndentGuidesStroke: Tree stroke color for the indentation guides that are not active.
// tree.tableColumnsBorder: Tree stroke color for the indentation guides.
// tree.tableOddRowsBackground: Background color for odd table rows.
