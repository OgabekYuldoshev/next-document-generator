import { createRouter } from "@/lib/open-api";

import * as handlers from "./content.handlers";
import * as routes from "./content.routes";

export const contentRoute = createRouter().openapi(
	routes.generate,
	handlers.generate,
);
