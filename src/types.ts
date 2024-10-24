

export type MetadataSchema<
	TSchema extends { [key: string]: unknown } = { [key: string]: unknown }
> = TSchema &
	Content


export interface Metadata {
	contents: Content[];
}

export interface Content {
	uuid: string;
	key: string;
	title: string;
	contentPath: string;
	createdAt: string;
}
