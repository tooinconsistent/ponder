import Ajv from "ajv";
const ajv = new Ajv();

export interface Command {
  id: string;
  name: string;
  description: string;
  // TODO: do proper json schema typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSchema: any | null;

  handler?: CommandHandler;
  when?: () => boolean;
  enabled?: () => boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CommandHandler = (args?: any) => Promise<unknown> | unknown;

export const registeredCommands = new Map<string, Command>();

const decorateHandlerWithValidatior = (
  command: Command
): CommandHandler | undefined => {
  if (!command.paramsSchema || !command.handler) {
    return command.handler;
  }

  const validator = ajv.compile(command.paramsSchema);
  const { handler } = command;

  return (args?: unknown) => {
    const validArgs = validator(args);
    if (!validArgs) {
      console.error(
        `commands :: tried to execute ${
          command.id
        } with invalid params: ${JSON.stringify(validator.errors)}.`
      );
      return;
    }

    return handler(args);
  };
};

export const registerCommand = (command: Command) => {
  registeredCommands.set(command.id, {
    ...command,
    handler: decorateHandlerWithValidatior(command),
  });
};

export const registerHandler = (
  commandId: string,
  handlers: Pick<Command, "handler" | "when" | "enabled">
) => {
  console.debug(`commands :: registering handler for ${commandId}`);

  const command = registeredCommands.get(commandId);

  if (!command) {
    console.error(
      `commands :: trying to register handler for undefined command: ${commandId}`
    );
    return;
  }

  registeredCommands.set(commandId, {
    ...command,
    ...handlers,
    handler: decorateHandlerWithValidatior({ ...command, ...handlers }),
  });
};

export const deregisterHandlers = (commandId: string) => {
  console.debug(`commands :: deregistering handler for ${commandId}`);

  const command = registeredCommands.get(commandId);

  if (!command) {
    console.error(
      `commands :: trying to deregister handler for undefined command: ${commandId}`
    );
    return;
  }

  const {
    handler: _handler,
    when: _when,
    enabled: _enabled,
    ...commandDefinition
  } = command;

  registeredCommands.set(commandId, commandDefinition);
};

export const executeCommand = <T>(
  commandId: string,
  args?: unknown
): Promise<T | undefined> | T | undefined => {
  const command = registeredCommands.get(commandId);

  if (!command) {
    console.error(`commands :: command not registered: ${commandId}`);
    return;
  }

  if (!command.handler) {
    console.error(`commands :: handler not registered for: ${commandId}`);
    return;
  }

  console.debug(`commands :: executing ${commandId}`);
  return command.handler(args) as Promise<T> | T;
};

// eslint-disable-next-line
(globalThis as any)._debug ??= {};
// eslint-disable-next-line
(globalThis as any)._debug.executeCommand = executeCommand;
