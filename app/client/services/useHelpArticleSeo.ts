import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Article } from '../components/helpCentre/HelpCentreTypes';

const ELEMENT_ID = 'seodata';

const useHelpArticleSeo = (article?: Article) => {
	const location = useLocation();

	useEffect(() => {
		if (document) {
			const scriptElt = document.getElementById(ELEMENT_ID);
			if (scriptElt) {
				scriptElt.remove();
			}
			article && addStructuredData(article);
		}
	}, [location]);
};

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

export default useHelpArticleSeo;
