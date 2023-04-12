import {
  Component,
  JSX,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import uFuzzy from "@leeoniya/ufuzzy";

import { getVisiblePaletteCommands } from "@ponder/client/lib/commands/palette";
import { CommandPaletteRow } from "./CommandPaletteRow";
import {
  deregisterHandlers,
  executeCommand,
  registerHandler,
} from "@ponder/client/lib/commands/commands";

const mark = (part: string, matched: boolean) => {
  // eslint-disable-next-line solid/components-return-once
  return !matched ? (
    <>{part}</>
  ) : (
    <span class="font-semibold text-[var(--commandPalette-matchForeground)]">
      {part}
    </span>
  );
};

const append = (accum: JSX.Element[], part: JSX.Element) => {
  accum.push(part);
  return accum;
};

export const CommandPalette: Component = () => {
  let inputRef: HTMLInputElement | undefined;
  onMount(() => {
    inputRef?.focus();
  });

  const u = new uFuzzy();
  const commands = getVisiblePaletteCommands();
  const commandNames = commands.map((command) => command.name);

  const [searchResults, setSearchResults] = createSignal<{
    idxs: uFuzzy.HaystackIdxs;
    info: uFuzzy.Info;
    order: uFuzzy.InfoIdxOrder;
  } | null>(null);

  const [selectionIdx, setSelectionIdx] = createSignal(0);
  onMount(() => {
    registerHandler("commandPalette.selectPrevious", {
      handler: () => {
        setSelectionIdx((previousIdx) => {
          if (previousIdx > 0) {
            return previousIdx - 1;
          }
          const res = searchResults();
          if (res) {
            return res.idxs.length - 1;
          } else {
            return commandNames.length - 1;
          }
        });
      },
    });

    registerHandler("commandPalette.selectNext", {
      handler: () => {
        setSelectionIdx((previousIdx) => {
          const res = searchResults();
          if (res) {
            if (previousIdx + 1 >= res.idxs.length) {
              return 0;
            }
          } else {
            if (previousIdx + 1 >= commandNames.length) {
              return 0;
            }
          }
          return previousIdx + 1;
        });
      },
    });

    registerHandler("commandPalette.executeSelectedCommand", {
      handler: () => {
        const res = searchResults();
        if (res) {
          const commandId = commands[res.info.idx[selectionIdx()]].id;
          executeCommand(commandId);
        } else {
          const commandId = commands[selectionIdx()].id;
          executeCommand(commandId);
        }
        executeCommand("commandPalette.hide");
      },
    });
  });

  onCleanup(() => {
    deregisterHandlers("commandPalette.selectPrevious");
    deregisterHandlers("commandPalette.selectNext");
    deregisterHandlers("commandPalette.executeSelectedCommand");
  });

  // hide the command palette when clicking outside of it
  const hideClickHandler = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest("#command-palette")
    ) {
      return;
    }
    executeCommand("commandPalette.hide");
  };

  onMount(() => {
    document.addEventListener("click", hideClickHandler);
  });

  onCleanup(() => {
    document.removeEventListener("click", hideClickHandler);
  });

  return (
    <>
      <div
        id="command-palette"
        class="absolute left-[calc(50%-min(40rem,80vw)/2)] top-0 z-50 w-[calc(min(40rem,80vw))] rounded-sm border border-[var(--commandPalette-border)] bg-[var(--commandPalette-background)] text-[var(--commandPalette-foreground)]"
      >
        <div class="p-1 px-2">
          <input
            onInput={(e) => {
              const idxs = u.filter(commandNames, e.currentTarget.value);
              if (!idxs) {
                setSearchResults(null);
                return;
              }
              const info = u.info(idxs, commandNames, e.currentTarget.value);
              const order = u.sort(info, commandNames, e.currentTarget.value);

              setSelectionIdx(0);
              setSearchResults({ idxs, info, order });
            }}
            ref={inputRef}
            class="w-full border border-[var(--input-border)] bg-[var(--input-background)] px-1 py-0.5 text-sm focus:border-[var(--base-focusBorder)] focus:outline-none"
          />
        </div>

        <div class="max-h-96 overflow-y-scroll p-1 px-2 pb-2">
          <Show
            when={searchResults()}
            keyed
            fallback={
              <>
                {
                  // eslint-disable-next-line solid/prefer-for
                  commands.map((cmd, idx) => (
                    <CommandPaletteRow
                      selected={selectionIdx() === idx}
                      command={cmd}
                    >
                      {cmd.name}
                    </CommandPaletteRow>
                  ))
                }
              </>
            }
          >
            {(res) => (
              <>
                {
                  // eslint-disable-next-line solid/prefer-for
                  res.order.map((infoIdx, idx) => {
                    const parts = uFuzzy.highlight(
                      commandNames[res.info.idx[infoIdx]],
                      res.info.ranges[infoIdx],
                      mark,
                      [],
                      append
                    );
                    const cmd = commands[res.info.idx[infoIdx]];
                    return (
                      <CommandPaletteRow
                        selected={selectionIdx() === idx}
                        command={cmd}
                      >
                        {parts}
                      </CommandPaletteRow>
                    );
                  })
                }
              </>
            )}
          </Show>
        </div>
      </div>
    </>
  );
};
