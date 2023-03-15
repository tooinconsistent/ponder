import { Component } from "solid-js";

export const StatusBar: Component = () => {
  return (
    <div class="h-full border-t border-[var(--statusBar-border)] bg-[var(--statusBar-background)] text-[var(--statusBar-foreground)]">
      <div class="flex h-full items-center justify-end px-4">
        <div class="text-xs">crafted with &lt;3 by Andreea & siwek</div>
      </div>
    </div>
  );
};
