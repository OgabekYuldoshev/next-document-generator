import type { AppOpenApi } from "@/types";
import { apiReference } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json" with { type: "json" };

export function configureOpenApi(app: AppOpenApi) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "Document Generator API",
		},
	});

	app.get(
		"/reference",
		apiReference({
			theme: "kepler",
			layout: "classic",
			defaultHttpClient: {
				targetKey: "javascript",
				clientKey: "fetch",
			},
			spec: {
				url: "/api/doc",
			},
		}),
	);
}
