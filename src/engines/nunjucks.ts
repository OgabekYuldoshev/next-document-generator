import type { BaseEngine } from "./types";

export class NunjucksEngine implements BaseEngine {
    render(): void {
        console.log("method render() called for NunjucksEngine");
    }
}
