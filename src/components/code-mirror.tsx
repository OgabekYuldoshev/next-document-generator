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
		<div className="h-full w-full flex-1 min-h-0 rounded-lg overflow-hidden">
			<div ref={ref} />
		</div>
	);
};

export default CodeMirror;
