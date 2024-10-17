import { publicProcedure, router } from "@/lib/trpc-server";
import type { DocumentMetaData } from "@/types";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";
import { BASIC_HTML, CONTENT_PATH } from "@/constants";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";

export const documentRoute = router({
	createDocument: publicProcedure
		.input(
			z.object({
				title: z.string(),
			}),
		)
		.mutation(async (ctx) => {
			const { title } = ctx.input;

			const documentMetaData = {
				uuid: uuidv4(),
				title,
				created_at: new Date().toISOString(),
			} satisfies DocumentMetaData;

			const contentPath = path.join(process.cwd(), CONTENT_PATH);

			if (!existsSync(contentPath)) {
				await mkdir(contentPath, { recursive: true });
			}

			const content = matter.stringify(BASIC_HTML, documentMetaData);

			const filePath = path.join(contentPath, `${documentMetaData.uuid}.html`);

			await writeFile(filePath, content);

			return documentMetaData;
		}),
});
