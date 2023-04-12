import { executeCommand, registeredCommands } from "../commands/commands";
import { keys } from "./keys.ts";

interface KeyBinding {
  key: string;
  command: string;
  everywhere?: boolean;
  repeats?: boolean;
}

const bindings: KeyBinding[] = [
  { key: "$mod+k", command: "commandPalette.show" },
  { key: "Escape", command: "commandPalette.hide", everywhere: true },
  { key: "Escape", command: "thread.backToChannel" },
  {
    key: "ArrowUp",
    command: "commandPalette.selectPrevious",
    everywhere: true,
    repeats: true,
  },
  {
    key: "ArrowDown",
    command: "commandPalette.selectNext",
    everywhere: true,
    repeats: true,
  },
  {
    key: "Enter",
    command: "commandPalette.executeSelectedCommand",
    everywhere: true,
  },
  { key: "c", command: "channel.newThread" },
  { key: "$mod+Shift+b", command: "sideBar.toggle" },
  { key: "$mod+Enter", command: "thread.replyToThread" },
];

export const initialiseKeyBindings = () => {
  const uniqueKeys = [...new Set(bindings.map((binding) => binding.key))];

  const commandsMap = new Map(
    uniqueKeys.map((key) => [
      key,
      bindings.filter((binding) => binding.key === key),
    ])
  );

  keys(
    window,
    uniqueKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: (e: KeyboardEvent) => {
          const keyBindings = commandsMap.get(key);

          if (!keyBindings?.some((kb) => kb.repeats) && e.repeat) {
            return;
          }

          if (
            !keyBindings?.some((kb) => kb.everywhere) &&
            !key.includes("+") &&
            (document.activeElement?.nodeName.toLowerCase() === "input" ||
              document.activeElement?.attributes.getNamedItem("contenteditable")
                ?.value === "true")
          ) {
            return;
          }

          let handled = false;

          keyBindings?.forEach((keyBinding) => {
            if (handled) {
              return;
            }

            console.debug(
              `keybindings :: got shortcut for command :: ${keyBinding.command}`
            );
            const command = registeredCommands.get(keyBinding.command);

            if (!command) {
              console.error(
                `keybindings :: ${keyBinding.command} command doesn't exist`
              );
              return;
            }

            if (!command.handler) {
              return;
            }

            if (command.when && !command.when()) {
              return;
            }

            if (command.enabled && !command.enabled()) {
              return;
            }

            executeCommand(command.id);

            e.preventDefault();
            e.stopPropagation();

            handled = true;
          });
        },
      };
    }, {})
  );
};
