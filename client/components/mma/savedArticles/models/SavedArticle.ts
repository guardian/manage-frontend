export interface SavedArticle {
	id: string;
	shortUrl: string;
	date: Date;
	read: boolean;
}

// TODO - more extensible way of type guarding
export function isSavedArticle(data: unknown): data is SavedArticle {
	const castObj = data as SavedArticle;
	return (
		castObj !== null &&
		castObj !== undefined &&
		'id' in castObj &&
		'shortUrl' in castObj &&
		'date' in castObj &&
		'read' in castObj
	);
}
export interface SavedArticlesResponse {
	version: number;
	articles: SavedArticle[];
}
export function isSavedArticlesResponse(
	data: unknown,
): data is SavedArticlesResponse {
	const castObj = data as SavedArticlesResponse;
	return (
		castObj !== null &&
		castObj !== undefined &&
		'version' in castObj &&
		'articles' in castObj &&
		castObj.articles.reduce<boolean>((b, sv) => {
			return isSavedArticle(sv) && b;
		}, true)
	);
}
