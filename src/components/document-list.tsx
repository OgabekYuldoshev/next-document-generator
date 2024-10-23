"use client";
import { trpc } from "@/lib/trpc-client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { DataTable, TableActions } from "./ui/data-table";
export const DocumentList = () => {
	const router = useRouter();
	const { data, isFetched } = trpc.document.loadDocuments.useQuery(
		{
			currentPage: 0,
			size: 25,
		},
		{
			initialData: {
				items: [],
				meta: {
					size: 0,
					currentPage: 0,
					total: 0,
				},
			},
			retry: false,
		},
	);

	return (
		<div className="mt-2">
			<DataTable
				isLoading={!isFetched}
				columns={[
					{
						header: "Title",
						accessorKey: "title",
					},
					{
						header: "Key",
						accessorKey: "key",
					},

					{
						header: "Created date",
						accessorFn(item) {
							return dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss");
						},
					},
					{
						id: "actions",
						cell({ row }) {
							const item = row.original;
							return (
								<TableActions
									actions={[
										{
											label: "Edit",
											onClick: () => router.push(`/edit/${item.key}`),
										},
									]}
								/>
							);
						},
					},
				]}
				meta={data.meta}
				data={data.items}
			/>
		</div>
	);
};
