import { useCodeMirror } from "@/hooks/use-code-mirror";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	name: string;
}
const CodeMirror = (props: Props) => {
	const { watch, setValue } = useFormContext();

	const [ref] = useCodeMirror<HTMLDivElement>({
		value: watch(props.name),
		onChange(state) {
			setValue(props.name, state.doc.toString());
		},
	});

	return (
		<div ref={ref} className="flex-1 w-full" />
	);
};

export default CodeMirror;
