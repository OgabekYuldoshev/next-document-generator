import { Form } from "@/components/ui/form";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1),
});

type FormValue = z.infer<typeof validationSchema>;

export type EditFormProps = {
	uuid: string;
	initialValues: FormValue;
	children(props: {
		form: UseFormReturn<FormValue>;
		isPending: boolean;
	}): ReactNode;
};
export default function EditForm(props: EditFormProps) {
	const { initialValues, uuid } = props;
	const { mutate, isPending } = trpc.document.update.useMutation();
	const form = useForm({
		resolver: zodResolver(validationSchema),
		defaultValues: initialValues,
	});

	function onSubmit(values: FormValue) {
		mutate({
			uuid,
			...values,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{props.children({ form, isPending })}
			</form>
		</Form>
	);
}
