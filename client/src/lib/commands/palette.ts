import { Command, registeredCommands } from "./commands";

interface PaletteCommand {
  id: string;
}

const paletteCommands: PaletteCommand[] = [];

export const sortPaletteCommands = () => {
  paletteCommands.sort((a, b) => {
    const commandA = registeredCommands.get(a.id);
    const commandB = registeredCommands.get(b.id);

    if (!commandA || !commandB) {
      return 0;
    }

    return commandA.name.localeCompare(commandB.name);
  });
};

export const addToPalette = (command: PaletteCommand) => {
  if (paletteCommands.find((c) => command.id === c.id)) {
    console.error(
      `palette :: tried to add already existing command: ${command.id}`
    );

    return;
  }
  paletteCommands.push(command);
};

export const getVisiblePaletteCommands = (): Command[] => {
  return paletteCommands
    .map((paletteCommand) => {
      const command = registeredCommands.get(paletteCommand.id);
      if (!command) {
        console.error("palette :: non-existing command registered in palette");
        return null;
      }

      if (!command.handler) {
        return null;
      }

      if (command.when && !command.when()) {
        return null;
      }

      return command;
    })
    .filter((cmd): cmd is Command => cmd !== null);
};
