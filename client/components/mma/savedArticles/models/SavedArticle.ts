import { isObject } from '@guardian/libs';

export interface SavedArticle {
	id: string;
	shortUrl: string;
	date: Date;
	read: boolean;
}
export interface SavedArticlesResponse {
	version: number;
	articles: SavedArticle[];
}
export function isSavedArticlesResponse(
	data: unknown,
): data is SavedArticlesResponse {
	// TODO - validate this properly when we have the schema
	return isObject(data);
}
