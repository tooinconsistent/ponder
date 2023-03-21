import { Component, createSignal, onCleanup, onMount } from "solid-js";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { trpc } from "@ponder/client/lib/trpc.ts";
import { useStore } from "@ponder/client/store/app.jsx";

import { classes } from "@ponder/client/lib/classes.ts";
import { buttonClasses } from "@ponder/client/atoms/button.ts";

import { ThreadDetails } from "./ThreadDetails.jsx";

export const ThreadComposer: Component = (_props) => {
  const { store, actions } = useStore();

  const [editor, setEditor] = createSignal<Editor>();
  const [isEditorEmpty, setIsEditorEmpty] = createSignal(true);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [title, setTitle] = createSignal("");

  const initialiseEditor = (editorRef: HTMLDivElement) => {
    const editorInstance = new Editor({
      element: editorRef,
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: "Your thread begins here..." }),
      ],
      editorProps: {
        attributes: {
          class: "p-1 h-full prose prose-sm prose-default focus:outline-none",
        },
      },
    });

    onCleanup(() => {
      editorInstance.destroy();
    });

    setEditor(editorInstance);
  };

  onMount(() => {
    editor()?.on("update", (event) => {
      setIsEditorEmpty(event.editor.isEmpty);
    });
  });

  const canSubmit = () => {
    return (
      !isEditorEmpty() &&
      !isSubmitting() &&
      title().length > 0 &&
      store.view.currentViewProps?.channelId
    );
  };

  const handleCreate = async () => {
    if (!canSubmit()) {
      return;
    }
    setIsSubmitting(true);
    // canSubmit allows us to infer that below is non-null
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = editor()!.getJSON();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const contentPlain = editor()!.getText();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const channelId = store.view.currentViewProps!.channelId;

    try {
      const newThread = await trpc.threads.createNewThread.mutate({
        channelId,
        title: title(),
        content,
        contentPlain,
      });

      if (newThread) {
        actions.openThread({ threadId: newThread.id });
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="flex h-full justify-center">
      <div class="flex h-full max-w-6xl flex-1 flex-col">
        <ThreadDetails
          title="New Thread"
          channelId={store.view.currentViewProps?.channelId}
        />
        <div class="flex flex-1 justify-center overflow-y-auto p-8 pt-2">
          <div class="flex w-full max-w-xl flex-col rounded-md border border-[var(--threadComposer-border)] bg-[var(--threadComposer-background)] px-4 py-2">
            <div class="flex items-center border-b border-b-[var(--threadComposer-separator)] p-1">
              <div class="mr-2 text-xs uppercase">Create in: </div>
              <div>{store.view.currentViewProps?.channelId}</div>
            </div>
            <input
              class="mt-2 max-h-full w-full border-b border-b-transparent bg-[var(--threadComposer-background)] p-1 text-2xl font-medium text-[var(--textHeader-foreground)] placeholder:text-[var(--textPlaceholder-foreground)] focus:border-b-[var(--threadComposer-focusedBorder)] focus:outline-none"
              placeholder="Title..."
              onInput={(e) => setTitle(e.currentTarget.value)}
            />
            <div
              class="max-h-full min-h-0 flex-1 overflow-scroll"
              ref={initialiseEditor}
            />
            <div class="flex justify-end py-2">
              <button
                class={classes(
                  buttonClasses(),
                  isSubmitting() && "animate-pulse"
                )}
                disabled={!canSubmit()}
                onClick={() => {
                  void handleCreate();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
