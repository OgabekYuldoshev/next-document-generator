import path from "path";
import { CONTENT_PATH } from "@/constants";
import type { DocumentMetaData } from "@/types";
import { readFile, readdir, stat } from "fs/promises";
import matter from "gray-matter";
import memo from "memoize-one";
import { firstBy } from "thenby";
const contentDir = path.join(process.cwd(), CONTENT_PATH);

interface Options {
	currentPage?: number;
	size?: number;
}

export async function load({ currentPage = 1, size = 2 }: Options = {}) {
	// Read the files in the folder
	const c = await readdir(contentDir);
	// Set created  time from file stat
	const contents = await Promise.all(
		c.map(async (f) => {
			const statistics = await stat(path.join(contentDir, f));
			return {
				path: f,
				created_at: statistics.birthtime,
			};
		}),
	);

	// Sort by creation date in descending order
	contents.sort(firstBy("created_at", { direction: "desc" }));
	// Totoal page
	const total = Math.ceil(contents.length / size);
	// Pagenation contents
	const currentContents = contents.slice(
		currentPage * size,
		(currentPage + 1) * size,
	);

	return {
		contents,
		pagenation: {
			data: currentContents,
			total,
			currentPage,
			size,
		},
		getMetaData(contentsPath: string[]) {
			return Promise.all(
				contentsPath.map(async (p) => {
					const filePath = path.join(contentDir, p);
					const fileContent = await readFile(filePath);
					const fileStat = await stat(filePath);
					const { data } = matter(fileContent);
					data.created_at = fileStat.mtime;
					return data as DocumentMetaData;
				}),
			);
		},
		async find(key: string) {
			const filePath = contents.find((c) => c.path.includes(key));
			if (!filePath) {
				return null;
			}
			const fileContent = await readFile(path.join(contentDir, filePath.path));
			const parsedContent = matter(fileContent);
			return {
				meta: parsedContent.data as DocumentMetaData,
				content: parsedContent.content,
			};
		},

		// async getFile(key: string) {
		// 	const filePath = contents.find((c) => c.path.includes(key));
		// 	if (!filePath) {
		// 		return null;
		// 	}
		// 	const fileContent = await readFile(path.join(contentDir, filePath.path));
		// 	const parsedContent = matter(fileContent);

		// 	return {
		// 		meta: parsedContent.data as DocumentMetaData,
		// 		content: parsedContent,
		// 	};
		// },
		// getFilesMetaData(array) {
		// 	return Promise.all(
		// 		currentFiles.map(async (file) => {
		// 			const filePath = path.join(contentDir, file.path);
		// 			const fileContent = await readFile(filePath);
		// 			const { data } = matter(fileContent);
		// 			return data as DocumentMetaData;
		// 		}),
		// 	);
		// },
	};
}

// export const load = memo(async () => {
// 	const files = await readdir(contentDir);
// 	console.log(files);

// 	return files;
// });
