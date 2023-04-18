import { Component, Setter, onCleanup } from "solid-js";

import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab, defaultKeymap } from "@codemirror/commands";
import { linter, lintGutter, lintKeymap } from "@codemirror/lint";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";

interface JsonEditorProps {
  doc: string;
  readOnly?: boolean;
  skipLint?: boolean;
  setEditor?: Setter<EditorView>;
}

export const JsonEditor: Component<JsonEditorProps> = (props) => {
  const initialiseEditor = (editorRef: HTMLDivElement) => {
    const editorInstance = new EditorView({
      doc: props.doc,
      extensions: [
        basicSetup,
        // TODO: remove this any cast after prosemirror is updated
        // eslint-disable-next-line
        keymap.of([...defaultKeymap, indentWithTab, ...lintKeymap] as any),
        json(),
        ...(props.skipLint ? [] : [lintGutter(), linter(jsonParseLinter())]),
        EditorView.theme({}, { dark: false }),
        EditorState.readOnly.of(props.readOnly ?? false),
      ],
      parent: editorRef,
    });

    onCleanup(() => {
      editorInstance.destroy();
    });

    if (props.setEditor) {
      props.setEditor(editorInstance);
    }
  };

  return (
    <div class="bg-white text-black">
      <div ref={(ref) => initialiseEditor(ref)} />
    </div>
  );
};
