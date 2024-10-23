import type { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useMemo } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	meta: {
		total: number;
		currentPage: number;
		size: number;
	};
	pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	meta,
	pageSizeOptions = [10, 25, 30, 40, 50, 100],
}: DataTableProps<TData, TValue>) {
	const [_, setCurrentPage] = useQueryParam(
		"page",
		withDefault(NumberParam, 0),
	);

	const [size, setSize] = useQueryParam("size", withDefault(NumberParam, 0));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const renderTableBody = useMemo(() => {
		if (isLoading) {
			return (
				<TableRow>
					<TableCell colSpan={columns.length} className="h-24 text-center">
						Loading…
					</TableCell>
				</TableRow>
			);
		}

		if (table.getRowModel().rows?.length) {
			return table.getRowModel().rows.map((row) => (
				<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			));
		}

		return (
			<TableRow>
				<TableCell colSpan={columns.length} className="text-center">
					No result!
				</TableCell>
			</TableRow>
		);
	}, [columns.length, isLoading, table.getRowModel, data]);

	return (
		<div className="relative">
			<div className="rounded-md border bg-white dark:bg-background">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>{renderTableBody}</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length
						? `${table.getFilteredSelectedRowModel().rows.length} of{" "}`
						: null}
					{meta.size} size
				</div>
				<div className="flex items-center space-x-2">
					<p className="whitespace-nowrap text-sm font-medium">Per page</p>
					<Select
						value={String(meta.size)}
						onValueChange={(size) => setSize(Number(size))}
					>
						<SelectTrigger className="h-8 w-[4.5rem]">
							<SelectValue placeholder={String(meta.size)} />
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizeOptions.map((pageSize) => (
								<SelectItem key={pageSize} value={String(pageSize)}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex justify-end">
					<Pagination
						currentPage={meta.currentPage + 1}
						totalPages={meta.total}
						onPageChange={(pageNumber: number) =>
							setCurrentPage(pageNumber - 1)
						}
						showPreviousNext
					/>
				</div>
			</div>
		</div>
	);
}

export interface ITableActions {
	actions: Array<{ label: string } & Omit<DropdownMenuItemProps, "children">>;
}

export const TableActions = ({ actions }: ITableActions) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{actions.map((action) => {
					return (
						<DropdownMenuItem {...action} key={action.label}>
							{action.label}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

import {
	Pagination as PaginationBase,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export const generatePaginationLinks = (
	currentPage: number,
	totalPages: number,
	onPageChange: (page: number) => void,
) => {
	const pages: JSX.Element[] = [];
	if (totalPages <= 6) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={() => onPageChange(i)}
						isActive={i === currentPage}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}
	} else {
		for (let i = 1; i <= 2; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={() => onPageChange(i)}
						isActive={i === currentPage}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}
		if (2 < currentPage && currentPage < totalPages - 1) {
			pages.push(<PaginationEllipsis />);
			pages.push(
				<PaginationItem key={currentPage}>
					<PaginationLink
						onClick={() => onPageChange(currentPage)}
						isActive={true}
					>
						{currentPage}
					</PaginationLink>
				</PaginationItem>,
			);
		}
		pages.push(<PaginationEllipsis />);
		for (let i = totalPages - 1; i <= totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={() => onPageChange(i)}
						isActive={i === currentPage}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}
	}
	return pages;
};

type PaginatorProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (pageNumber: number) => void;
	showPreviousNext: boolean;
};

function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	showPreviousNext,
}: PaginatorProps) {
	return (
		<PaginationBase>
			<PaginationContent>
				{showPreviousNext && totalPages ? (
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage - 1 < 1}
						/>
					</PaginationItem>
				) : null}
				{generatePaginationLinks(currentPage, totalPages, onPageChange)}
				{showPreviousNext && totalPages ? (
					<PaginationItem>
						<PaginationNext
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage > totalPages - 1}
						/>
					</PaginationItem>
				) : null}
			</PaginationContent>
		</PaginationBase>
	);
}
