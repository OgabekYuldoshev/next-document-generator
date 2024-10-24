type PaginationResult<T> = {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	data: T[];
};

export function paginate<T>(items: T[], currentPage: number, pageSize: number,): PaginationResult<T> {
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const page = Math.max(1, Math.min(currentPage, totalPages));
	const start = (page - 1) * pageSize;
	const data = items.slice(start, start + pageSize);

	return {
		totalItems,
		totalPages,
		currentPage: page,
		pageSize,
		data,
	};
}
