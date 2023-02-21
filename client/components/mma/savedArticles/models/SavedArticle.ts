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
