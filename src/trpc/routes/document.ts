import metadata from "@/lib/metadata";
import z from "zod";
import { publicProcedure, router } from "../server";

export const documentRoute = router({
	create: publicProcedure
		.input(
			z.object({
				key: z.string(),
				title: z.string(),
			}),
		)
		.mutation(async (ctx) => {
			return metadata.create(ctx.input);
		}),
	list: publicProcedure
		.input(
			z.object({
				currentPage: z.number().default(0),
				pageSize: z.number().default(10),
			}),
		)
		.query(async (ctx) => {
			return metadata.getList(ctx.input);
		}),
	single: publicProcedure
		.input(z.object({ key: z.string() }))
		.query(async (ctx) => {
			return {};
		}),
});
