import { TEST } from "@/constants";
import { NunjucksEngine } from "@/engines/nunjucks";
import { configureOpenApi } from "@/lib/configure-open-api";
import generator from "@/lib/generator";
import { createApp } from "@/lib/open-api";
import { appRouter } from "@/trpc/_app";
import { trpcServer } from "@hono/trpc-server";
import { contentRoute } from "./routes/content/content.index";

const app = createApp();

configureOpenApi(app);

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		endpoint: "/api/trpc",
	}),
);

const routes = [contentRoute] as const;

for (const route of routes) {
	app.route("/", route);
}

export default app;
