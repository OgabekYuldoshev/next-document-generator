export type DocumentMetaData = {
	key: string;
	title: string;
	created_at: string;
};

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
