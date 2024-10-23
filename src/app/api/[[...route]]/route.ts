import metadata from "@/lib/metadata";
import { appRouter } from "@/trpc/_app";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { handle } from "hono/vercel";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		endpoint: "/api/trpc",
	}),
);

export const GET = handle(app);
export const POST = handle(app);
