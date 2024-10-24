import { DEFAULT_CONTENT, TEST } from "@/constants";
import generator from "@/lib/generator";
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

app.get("/generate", async (c) => {
	const pdf = await generator.generate({ content: TEST })

	c.res.headers.set("Content-Type", "application/pdf");

	return c.body(pdf);
})

export const GET = handle(app);
export const POST = handle(app);
