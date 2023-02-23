import type { SavedArticle } from './models/SavedArticle';

interface SavedArticlesProps {
	savedArticles: SavedArticle[];
}

export const SavedArticlesDisplay = ({ savedArticles }: SavedArticlesProps) => {
	return (
		<>
			{savedArticles.map((article) => {
				return <li key={article.id}>{article.id}</li>;
			})}
		</>
	);
};
