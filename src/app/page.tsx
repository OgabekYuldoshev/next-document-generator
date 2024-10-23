"use client";

import { CreateDocumentDialog } from "@/components/create-document-dialog";
import { DataTable, TableActions } from "@/components/ui/data-table";
import dayjs from "dayjs";

import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

export default function Home() {
	const [page] = useQueryParam("page", withDefault(NumberParam, 0));
	const [size] = useQueryParam("size", withDefault(NumberParam, 10));

	const router = useRouter();

	const { data, isFetched } = trpc.document.list.useQuery(
		{
			currentPage: page,
			pageSize: size,
		},
		{
			initialData: {
				data: [],
				currentPage: 0,
				pageSize: 0,
				totalItems: 0,
				totalPages: 0,
			},
			retry: false,
		},
	);

	return (
		<div className="flex flex-col w-full">
			<div className="h-16 border-b">
				<div className="w-full h-full mx-auto max-w-screen-lg px-2.5 flex items-center justify-between">
					<h2>LOGO</h2>
					<CreateDocumentDialog />
				</div>
			</div>
			<div className="w-full max-w-screen-lg px-2.5 py-4 mx-auto">
				<h2 className="font-bold text-xl">Your documents</h2>
				<div className="mt-4">
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
									return dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
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
													onClick: () => router.push(`/edit/${item.uuid}`),
												},
											]}
										/>
									);
								},
							},
						]}
						meta={{
							currentPage: data.currentPage,
							total: data.totalPages,
							size: data.pageSize,
						}}
						data={data.data}
					/>
				</div>
			</div>
		</div>
	);
}
