import { TEST } from "@/constants";
import generator from "@/lib/generator";
import { appRouter } from "@/trpc/_app";
import { trpcServer } from "@hono/trpc-server";
import { handle } from "hono/vercel";
import { createApp } from "@/lib/open-api";
import { configureOpenApi } from "@/lib/configure-open-api";

const app = createApp();

configureOpenApi(app);

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		endpoint: "/api/trpc",
	}),
);

app.get("/generate", async (c) => {
	const pdf = await generator.generate({ content: TEST });

	c.res.headers.set("Content-Type", "application/pdf");

	return c.body(pdf);
});

export const GET = handle(app);
export const POST = handle(app);
