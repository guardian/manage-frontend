import { Location } from '@reach/router';
import { Article } from './HelpCentreTypes';

interface SeoDataProps {
	article?: Article;
}

const ELEMENT_ID = 'seodata';

const addStructuredData = (article: Article) => {
	const data = {
		'@context': 'https://schema.org/',
		'@type': 'Article',
		headline: article.title,
	};
	const scriptElt = document.createElement('script');
	// tslint:disable-next-line:no-object-mutation
	scriptElt.id = ELEMENT_ID;
	// tslint:disable-next-line:no-object-mutation
	scriptElt.type = 'application/ld+json';
	// tslint:disable-next-line:no-object-mutation
	scriptElt.innerHTML = JSON.stringify(data);
	document.head.appendChild(scriptElt);
};

export const SeoData = (props: SeoDataProps) => (
	<Location>
		{() => {
			if (document) {
				const scriptElt = document.getElementById(ELEMENT_ID);
				if (scriptElt) {
					scriptElt.remove();
				}
				if (props.article) {
					addStructuredData(props.article);
				}
			}
			return null;
		}}
	</Location>
);
