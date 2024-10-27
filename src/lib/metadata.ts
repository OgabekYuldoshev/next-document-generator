import { randomUUID } from "crypto";
import { existsSync } from "fs";
import path from "path";
import {
	DEFAULT_CONTENT,
	DEFAULT_METADATA,
	METADATA_DIR,
	METADATA_FILENAME,
} from "@/constants";
import type { Content, Metadata, MetadataSchema } from "@/types";
import { constantCase } from "change-case";
import { mkdir, readFile, writeFile } from "fs/promises";
import sift, { type Query } from "sift";
import z from "zod";
import { paginate } from "./paginate";

const schemas = {
	create: z.object({
		key: z.string(),
		title: z.string(),
	}),
	update: z.object({
		content: z.string(),
		title: z.string(),
	}),
};

class MetaData {
	rootPath: string = "";

	constructor() {
		this.run();
	}

	private async run() {
		const rootPath = path.join(process.cwd(), METADATA_DIR);
		if (!existsSync(rootPath)) {
			await mkdir(rootPath, { recursive: true });
		}
		this.rootPath = rootPath;
	}

	private async createContentFile({
		uuid,
		content,
	}: {
		uuid: string;
		content: string;
	}) {
		const contentDir = path.join(this.rootPath, "contents");

		content = content.replace("{{key}}", uuid);

		if (!existsSync(contentDir)) {
			await mkdir(contentDir, { recursive: true });
		}

		const contentFile = path.join(contentDir, `${uuid}.html`);

		await writeFile(contentFile, content);

		return contentFile.split(METADATA_DIR)[1];
	}

	public async readContentFile(uuid: string) {
		const constentPath = path.resolve(
			process.cwd(),
			METADATA_DIR,
			"contents",
			`${uuid}.html`,
		);
		return readFile(constentPath, "utf8");
	}

	private async updateContentFile(uuid: string, content: string) {
		const constentPath = path.resolve(
			process.cwd(),
			METADATA_DIR,
			"contents",
			`${uuid}.html`,
		);
		await writeFile(constentPath, content);

		return readFile(constentPath, "utf8");
	}

	private async updateMetaFile(meta: Metadata) {
		const metaFilePath = path.resolve(
			process.cwd(),
			METADATA_DIR,
			METADATA_FILENAME,
		);
		await writeFile(metaFilePath, JSON.stringify(meta, null, 2));
	}

	public async getMetaFile(): Promise<Metadata> {
		const metaFilePath = path.resolve(
			process.cwd(),
			METADATA_DIR,
			METADATA_FILENAME,
		);

		if (!existsSync(metaFilePath)) {
			await writeFile(metaFilePath, JSON.stringify(DEFAULT_METADATA, null, 2));
		}

		const file = await readFile(metaFilePath, "utf8");

		return JSON.parse(file);
	}

	public async create({ title, key }: z.infer<typeof schemas.create>) {
		const meta = await this.getMetaFile();
		const uuid = randomUUID();

		const contentPath = await this.createContentFile({
			uuid,
			content: DEFAULT_CONTENT,
		});

		const newContent: Content = {
			uuid,
			key: constantCase(key),
			title,
			contentPath,
			status: "published",
			createdAt: new Date().toISOString(),
		};

		meta.contents.push(newContent);

		await this.updateMetaFile(meta);

		return newContent;
	}

	public async update(uuid: string, values: z.infer<typeof schemas.update>) {
		const meta = await this.getMetaFile();
		const item = meta.contents.find((c) => c.uuid === uuid);

		if (!item) {
			return null;
		}

		item.title = values.title;

		await this.updateMetaFile(meta);
		const content = await this.updateContentFile(item.uuid, values.content);

		return {
			...item,
			content,
		};
	}

	public async delete(uuid: string) {
		const meta = await this.getMetaFile();
		const item = meta.contents.find((c) => c.uuid === uuid);
		if (!item) {
			return null;
		}
		item.status = "deleted";
		await this.updateMetaFile(meta);
	}

	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	public async find<TSchema extends {} = {}>(
		query: Query<MetadataSchema<TSchema>>,
	) {
		const meta = await this.getMetaFile();
		return await meta.contents.filter(sift<MetadataSchema<TSchema>>(query));
	}

	public async getList({
		currentPage,
		pageSize = 10,
	}: { pageSize: number; currentPage: number }) {
		const meta = await this.getMetaFile();
		return paginate(
			meta.contents.filter(
				sift({
					status: {
						$eq: "published",
					},
				}),
			),
			currentPage,
			pageSize,
		);
	}
}

export default new MetaData();
