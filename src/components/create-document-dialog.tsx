"use client";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { constantCase, snakeCase } from "change-case";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
	title: z.string().min(3),
	key: z.string().min(3),
});

type FormValue = z.infer<typeof formSchema>;

export const CreateDocumentDialog = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const { mutate, isPending } = trpc.document.create.useMutation({
		onSuccess({ uuid }) {
			toast.success("Document created successfully");
			setOpen(false);
			router.push(`/edit/${uuid}`);
		},
	});
	const form = useForm<FormValue>({
		mode: "onTouched",
		resolver: zodResolver(formSchema),
	});
	function onSubmit(values: FormValue) {
		mutate(values);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>New document</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New document</DialogTitle>
					<DialogDescription>
						Create a new document and start editing on it!
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1 gap-y-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Write..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="key"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Key</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Write..." />
									</FormControl>
									{field.value && (
										<FormDescription>
											Your key should be like this:{" "}
											<code>{constantCase(field.value)}</code>
										</FormDescription>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end">
							<Button disabled={isPending} type="submit">
								{isPending ? (
									<Loader2 size={18} className="animate-spin mr-2" />
								) : (
									<Save size={18} className="mr-2" />
								)}
								Save
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
