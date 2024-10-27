"use client";

import { TEST } from "@/constants";
import { useCodeMirror } from "@/hooks/use-code-mirror";
import React from "react";

const Page = () => {
	const [editorRef] = useCodeMirror<HTMLDivElement>({
		value: TEST,
		onChange(e) {
			console.log(e.doc.toString());
		},
	});

	return (
		<div className="max-w-screen-lg mx-auto p-4">
			<div ref={editorRef} />
		</div>
	);
};

export default Page;
