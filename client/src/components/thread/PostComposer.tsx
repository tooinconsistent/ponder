import { Component, createSignal, onCleanup, onMount } from "solid-js";

import StarterKit from "@tiptap/starter-kit";
import { Editor, JSONContent } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";

import { useStore } from "@tooinconsistent/client/store/app.jsx";

import { buttonClasses } from "../atoms/button.js";
import { Avatar } from "../atoms/Avatar.jsx";

interface PostComposerProps {
  onSubmit: (reply: JSONContent, replyPlain: string) => Promise<void>;
}

export const PostComposer: Component<PostComposerProps> = (props) => {
  const { store } = useStore();

  const [editor, setEditor] = createSignal<Editor>();
  const [isEmpty, setIsEmpty] = createSignal(true);

  const initialiseEditor = (editorRef: HTMLDivElement) => {
    const editorInstance = new Editor({
      element: editorRef,
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: "Reply..." }),
      ],
      editorProps: {
        attributes: {
          class:
            "py-1 px-2 min-h-[8rem] max-h-96 overflow-scroll border border-[var(--thread-editorBorder)] rounded-sm prose prose-sm prose-default focus:outline-none focus:border-[var(--thread-editorActiveBorder)]",
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
      setIsEmpty(event.editor.isEmpty);
    });
  });

  const handleReply = async () => {
    const reply = editor()?.getJSON();
    const replyPlain = editor()?.getText();
    if (reply && replyPlain) {
      try {
        await props.onSubmit(reply, replyPlain);
        // TODO: This can be disabled once tiptap fixes their typings
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        editor()?.commands.clearContent();
      } catch {
        console.error("post compose :: failed to submit reply");
      }
    }
  };

  return (
    <div class="flex space-x-3">
      <div>
        <Avatar
          avatarUrl={store.users.currentUserProfile?.avatarUrl ?? null}
          displayName={store.users.currentUserProfile?.displayName ?? ""}
          size={10}
        />
      </div>
      <div class="flex-1">
        <div ref={(ref) => initialiseEditor(ref)} />
        <div class="mt-2 flex justify-end">
          <button
            class={buttonClasses()}
            disabled={isEmpty()}
            onClick={() => {
              void handleReply();
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
