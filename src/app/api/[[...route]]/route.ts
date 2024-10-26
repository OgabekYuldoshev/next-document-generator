import { TEST } from "@/constants";
import { NunjucksEngine } from "@/engines/nunjucks";
import { configureOpenApi } from "@/lib/configure-open-api";
import generator from "@/lib/generator";
import { createApp } from "@/lib/open-api";
import { appRouter } from "@/trpc/_app";
import { trpcServer } from "@hono/trpc-server";
import { handle } from "hono/vercel";

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
	const engine = new NunjucksEngine();
	const pdf = await generator.generate({
		content: engine.render(TEST, {
			name: "Why TypeScript is a Game-Changer for Web Development",
		}),
	});

	c.res.headers.set("Content-Type", "application/pdf");

	return c.body(pdf);
});

export const GET = handle(app);
export const POST = handle(app);
