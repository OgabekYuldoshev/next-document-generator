// import jsonContent from "@/lib/json-content";
import { createRoute, z } from "@hono/zod-openapi";
import HttpStatusCodes from "http-status-codes";
const tags = ["Content"];

export const generate = createRoute({
	path: "/content/generate",
	method: "get",
	tags,
	responses: {
		[HttpStatusCodes.OK]: {
			description: "Generate PDF Document",
		},
	},
});

export type GenerateRoute = typeof generate;
