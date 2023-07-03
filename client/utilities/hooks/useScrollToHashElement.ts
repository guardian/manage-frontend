import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHashElement = () => {
	const location = useLocation();
	const hashElement = (function () {
		const hash = location.hash;
		const removeHashCharacter = (str: string | any[]) => {
			return str.slice(1);
		};
		if (hash) {
			return document.getElementById(<string>removeHashCharacter(hash));
		} else {
			return null;
		}
	})();

	useEffect(() => {
		if (hashElement) {
			hashElement.scrollIntoView();
		}
	});

	return null;
};
