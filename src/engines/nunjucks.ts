import n from "nunjucks";
import type { BaseEngine } from "./types";

export class NunjucksEngine implements BaseEngine {
	render(template: string, contex: object) {
		return n.renderString(template, contex);
	}
}
