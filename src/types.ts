import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type MetadataSchema<
	TSchema extends { [key: string]: unknown } = { [key: string]: unknown },
> = TSchema & Content;

export interface Metadata {
	contents: Content[];
}

export interface Content {
	uuid: string;
	key: string;
	title: string;
	status: "published" | "deleted";
	contentPath: string;
	createdAt: string;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type AppBindings = {};

export type AppOpenApi = OpenAPIHono;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;
