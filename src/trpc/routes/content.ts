import metadata from "@/lib/metadata";
import { TRPCClientError } from "@trpc/client";
import z from "zod";
import { publicProcedure, router } from "../server";

export const contentRoute = router({
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
	update: publicProcedure
		.input(
			z.object({ uuid: z.string(), content: z.string(), title: z.string() }),
		)
		.mutation(async (ctx) => {
			const { uuid, ...values } = ctx.input;
			return metadata.update(uuid, values);
		}),
	delete: publicProcedure
		.input(
			z.object({ uuid: z.string() }),
		)
		.mutation(async (ctx) => {
			const { uuid } = ctx.input;
			return metadata.delete(uuid);
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
		.input(z.object({ uuid: z.string() }))
		.query(async (ctx) => {
			const c = await metadata.find({
				$where: function () {
					return this.uuid === ctx.input.uuid;
				},
			});

			const item = c[0];

			if (!item) {
				throw new TRPCClientError("Content not found!");
			}

			const content = await metadata.readContentFile(item.uuid);

			return { ...item, content };
		}),
});
