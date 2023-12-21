import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function removeHashCharacter(str: string) {
	return str.slice(1);
}

export const useScrollToHashElement = () => {
	const location = useLocation();
	const hashElement = (function () {
		const hash = location.hash;

		if (hash) {
			return document.getElementById(removeHashCharacter(hash));
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
