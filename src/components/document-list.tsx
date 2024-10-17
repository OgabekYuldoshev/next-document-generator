"use client";
import { trpc } from "@/lib/trpc-client";
import React from "react";

export const DocumentList = () => {
	const { data } = trpc.document.loadDocuments.useQuery(undefined, {
		initialData: [],
		retry: false,
	});

	return (
		<div className="mt-2">
			{data.map((item) => {
				return <div key={item.uuid}>{item.title}</div>;
			})}
		</div>
	);
};
