// import jsonContent from "@/lib/json-content";
import { createRoute, z } from "@hono/zod-openapi";
import HttpStatusCodes from "http-status-codes";
const tags = ["Content"];

export const generate = createRoute({
	path: "/content/generate/:key",
	method: "post",
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.record(z.string(), z.any()),
				},
			},
			description: "Send rendering data",
		},
		params: z.object({
			key: z.string().toUpperCase(),
		}),
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: {
			description: "Generate PDF Document",
		},
	},
});

export type GenerateRoute = typeof generate;
