import path from "path";
import { CONTENT_PATH } from "@/constants";
import type { DocumentMetaData } from "@/types";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), CONTENT_PATH);

export async function load() {
	const files = await readdir(contentDir);
	const contents = await Promise.all(
		files.map(async (file) => {
			const filePath = path.join(contentDir, file);
			const content = await readFile(filePath);
			const meta = matter(content)?.data as DocumentMetaData;
			return meta;
		}),
	);

	return contents;
}
