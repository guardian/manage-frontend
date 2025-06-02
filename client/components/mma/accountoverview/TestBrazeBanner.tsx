import {
	getBanner,
	insertBanner,
	subscribeToBannersUpdates,
} from '@braze/web-sdk';
import braze from '@braze/web-sdk';
import { useEffect, useRef } from 'react';

export const TestBrazeBanner = () => {
	const brazeContainerElement = useRef(null);

	useEffect(() => {
		const sdfbdsgf = 'braze-banner-ref';

		//subscribeToBannersUpdates((banners) => {
			const mmaBanner = getBanner(sdfbdsgf);
			if (brazeContainerElement.current) {
				console.log('check 3');
				insertBanner(mmaBanner, brazeContainerElement.current);
			}
		//});
	}, []);

	return (
		<>
			<div ref={brazeContainerElement}></div>
		</>
	);
};
