"use client";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
	const { id } = useParams<{ id: string }>();
	const { data, isFetched, isError, error } = trpc.document.single.useQuery(
		{ key: id },
		{
			retry: false,
		},
	);

	if (!isFetched) {
		return (
			<main className="w-full h-screen flex items-center justify-center">
				<Loader2 className="animate-spin" />
			</main>
		);
	}

	if (isError) {
		return (
			<main className="w-full h-screen flex items-center justify-center">
				<div>{error.message}</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col">
			<div>Hello</div>
		</main>
	);
}
