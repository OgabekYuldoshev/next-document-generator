import { existsSync } from "fs";
import path from "path";
import { BASIC_HTML, CONTENT_PATH } from "@/constants";
import { load } from "@/lib/load-data";
import { publicProcedure, router } from "@/lib/trpc-server";
import type { DocumentMetaData } from "@/types";
import { TRPCClientError } from "@trpc/client";
import { snakeCase } from "change-case";
import { mkdir, writeFile } from "fs/promises";
import matter from "gray-matter";
import z from "zod";

export const documentRoute = router({
	createDocument: publicProcedure
		.input(
			z.object({
				title: z.string(),
				key: z.string(),
			}),
		)
		.mutation(async (ctx) => {
			const { title, key } = ctx.input;

			const documentMetaData = {
				key: snakeCase(key),
				title,
				created_at: new Date().toISOString(),
			} satisfies DocumentMetaData;

			const contentPath = path.join(process.cwd(), CONTENT_PATH);

			if (!existsSync(contentPath)) {
				await mkdir(contentPath, { recursive: true });
			}

			const content = matter.stringify(BASIC_HTML, documentMetaData);

			const filePath = path.join(contentPath, `${documentMetaData.key}.html`);

			await writeFile(filePath, content);

			return documentMetaData;
		}),
	loadDocuments: publicProcedure
		.input(
			z.object({
				currentPage: z.number().default(0),
				size: z.number().default(25),
			}),
		)
		.query(async ({ input }) => {
			const { getMetaData, pagenation } = await load(input);
			const data = await getMetaData(pagenation.data.map((c) => c.path));
			const { currentPage, size, total } = pagenation;
			return {
				items: data,
				meta: {
					size,
					currentPage,
					total,
				},
			};
		}),
	getDocument: publicProcedure
		.input(z.object({ key: z.string() }))
		.query(async ({ input }) => {
			const { find } = await load();
			const document = await find(input.key);
			if (!document) {
				throw new TRPCClientError("Document not found");
			}
			return document;
		}),
});
