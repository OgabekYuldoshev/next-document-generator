"use client";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { constantCase, snakeCase } from "change-case";
import { File, Loader2, Save } from "lucide-react";
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
});

type FormValue = z.infer<typeof formSchema>;

export const NewDocumentDialog = ({ open, onClose }: { open: boolean; onClose(): void }) => {
	const router = useRouter();

	const { mutate, isPending } = trpc.content.create.useMutation({
		onSuccess({ uuid }) {
			onClose()
			router.push(`/c/${uuid}/content`);
			toast.success("Document created successfully");
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
		<Dialog open={open} onOpenChange={onClose}>
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
									{field.value && (
										<FormDescription>
											Your content key:{" "}
											<code>{constantCase(field.value)}</code>
										</FormDescription>
									)}
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
