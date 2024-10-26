import type { BaseEngine } from "./types";
import n from "nunjucks";

export class NunjucksEngine implements BaseEngine {
	render(template: string, contex: object) {
		return n.renderString(template, contex);
	}
}
