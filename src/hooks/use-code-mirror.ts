import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import { html } from "@codemirror/lang-html";
import { indentWithTab } from "@codemirror/commands";

import { EditorView, basicSetup } from "codemirror";
import type { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";

const baseTheme = EditorView.baseTheme({
	"&": {
		backgroundColor: "transparent !important",
		height: "100%",
	},
});

interface Props {
	value: string;
	onChange?: (editorState: EditorState) => void;
}

export const useCodeMirror = <T extends Element>(
	props: Props,
): [MutableRefObject<T | null>, EditorView?] => {
	const initialized = useRef(false);
	const containerRef = useRef<T>(null);
	const [editorView, setEditorView] = useState<EditorView>();
	const { value, onChange } = props;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (initialized.current) return;
		if (!containerRef.current) return;
		initialized.current = true;

		const view = new EditorView({
			doc: value,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				baseTheme,
				html(),
				oneDark,
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.changes) {
						onChange?.(update.state);
					}
				}),
			],
			parent: containerRef.current,
		});

		setEditorView(view);
	}, [containerRef]);

	return [containerRef, editorView];
};
