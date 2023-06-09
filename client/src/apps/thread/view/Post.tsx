import { Component, createSignal, onCleanup } from "solid-js";

import { Editor, JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { getFormattedRealtiveTime } from "@ponder/client/lib/relative_time.ts";

import { Avatar } from "@ponder/client/elements/Avatar.tsx";

interface PostProps {
  content: JSONContent;
  createdAt: Date;
  author: {
    avatarUrl: string | null;
    displayName: string;
  };
}

export const Post: Component<PostProps> = (props) => {
  const [_editor, setEditor] = createSignal();
  const initialiseEditor = (editorRef: HTMLDivElement) => {
    const editorInstance = new Editor({
      element: editorRef,
      extensions: [StarterKit],
      editable: false,
      content: props.content,
    });

    onCleanup(() => {
      editorInstance.destroy();
    });

    setEditor(editorInstance);
  };

  return (
    <li class="group">
      <div class="relative pb-8">
        <span
          class="absolute left-5 top-5 -ml-px h-full w-0.5 bg-[var(--base-foreground)] group-last:hidden"
          aria-hidden="true"
        />
        <div class="relative flex items-start space-x-3">
          <Avatar
            avatarUrl={props.author.avatarUrl}
            displayName={props.author.displayName}
            size={10}
          />
          <div class="min-w-0 flex-1">
            <div>
              <div class="text-sm font-medium text-[var(--textHeader-foreground)]">
                {props.author.displayName}
              </div>
              <p class="mt-0.5 text-xs text-[var(--textDescription-foreground)]">
                Commented{" "}
                {getFormattedRealtiveTime(
                  (props.createdAt.valueOf() - Date.now()) / 1000
                )}
              </p>
            </div>
            <div
              class="prose prose-sm prose-default mt-1"
              ref={(ref) => initialiseEditor(ref)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
