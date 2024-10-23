// biome-ignore lint/style/useImportType: <explanation>
import { Metadata } from "./types";

export const DEFAULT_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{key}}</title>
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
`;

export const METADATA_DIR = ".metacontent";
export const METADATA_FILENAME = "metadata.json";

export const DEFAULT_METADATA = {
	contents: [],
} as Metadata;
