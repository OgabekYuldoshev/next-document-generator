import { HTTPException } from "hono/http-exception";
import { NunjucksEngine } from "@/engines/nunjucks";
import generator from "@/lib/generator";
import type { AppRouteHandler } from "@/types";
import type { GenerateRoute } from "./content.routes";
import metadata from "@/lib/metadata";

export const generate: AppRouteHandler<GenerateRoute> = async (c) => {
	const { key } = c.req.valid("param");
	const data = c.req.valid("json");

	const contents = await metadata.find({
		$where: (item) => item.key === key,
	});

	const content = contents[0];

	if (!content) {
		throw new HTTPException(404, { message: "Content not found" });
	}

	const contentRaw = await metadata.readContentFile(content.uuid);
	const engine = new NunjucksEngine();

	const pdf = await generator.generate({
		content: engine.render(contentRaw, data),
	});

	return c.body(pdf, 200, {
		"Content-Type": "application/pdf",
	});
};
