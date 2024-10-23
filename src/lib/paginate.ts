type PaginationResult<T> = {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	data: T[];
};

export function paginate<T>(
	items: T[], // Array of items to paginate
	currentPage: number, // Current page number
	pageSize: number, // Number of items per page
): PaginationResult<T> {
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
