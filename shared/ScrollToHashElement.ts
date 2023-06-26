import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToHashElement = () => {
	const location = useLocation();

	const hashElement = useMemo(() => {
		const hash = location.hash;
		const removeHashCharacter = (str: string | any[]) => {
			return str.slice(1);
		};

		if (hash) {
			return document.getElementById(<string>removeHashCharacter(hash));
		} else {
			return null;
		}
	}, [location]);

	useEffect(() => {
		if (hashElement) {
			hashElement.scrollIntoView({
				behavior: 'smooth',
				// block: "end",
				inline: 'nearest',
			});
		}
	}, [hashElement]);

	return null;
};
