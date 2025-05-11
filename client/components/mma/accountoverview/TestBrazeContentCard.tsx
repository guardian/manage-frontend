import { showContentCards } from '@braze/web-sdk';
import { useEffect, useRef } from 'react';

export const TestBrazeContentCard = () => {
	const brazeContainerElement = useRef(null);

	useEffect(() => {
		// get the html element for the braze contetn card feed
		showContentCards(brazeContainerElement.current);
	}, []);
	return <div ref={brazeContainerElement}></div>;
};
