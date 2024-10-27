"use client";
import CodeMirror from "@/components/code-mirror";
import { Button, buttonVariants } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Home, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import EditForm from "./form";

export default function Page() {
	const { uuid } = useParams<{ uuid: string }>();
	const { data, isFetched, isError, error } = trpc.content.single.useQuery(
		{ uuid },
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

	if (isError || !data) {
		return (
			<main className="w-full h-screen flex items-center justify-center">
				<div>{error?.message}</div>
			</main>
		);
	}

	return (
		<EditForm
			uuid={data.uuid}
			initialValues={{
				title: data.title,
				content: data.content,
			}}
		>
			{({ isPending }) => (
				<main className="flex flex-col">
					<div className="h-20 border-b flex-shrink-0">
						<div className="w-full h-full px-6 flex items-center justify-between">
							<h2 className="font-bold">LOGO</h2>
							<div className="flex items-center gap-4">
								<Link
									href={"/"}
									className={buttonVariants({ variant: "outline" })}
								>
									<Home size={18} />
									Go back
								</Link>
								<Button type="submit" variant={"secondary"}>
									{isPending ? <Loader2 size={18} /> : <Save size={18} />}
									Save
								</Button>
							</div>
						</div>
					</div>
					<div className="flex-1 p-8 flex gap-2 min-h-0 h-full">
						<CodeMirror name="content" />
					</div>
				</main>
			)}
		</EditForm>
	);
}
