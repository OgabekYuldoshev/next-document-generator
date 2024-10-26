import { TEST } from "@/constants";
import { NunjucksEngine } from "@/engines/nunjucks";
import generator from "@/lib/generator";
import type { AppRouteHandler } from "@/types";
import type { GenerateRoute } from "./content.routes";

export const generate: AppRouteHandler<GenerateRoute> = async (c) => {
	const engine = new NunjucksEngine();
	const pdf = await generator.generate({
		content: engine.render(TEST, {
			name: "Why TypeScript is a Game-Changer for Web Development",
		}),
	});

	return c.body(pdf, 200, {
		"Content-Type": "application/pdf",
	});
};
