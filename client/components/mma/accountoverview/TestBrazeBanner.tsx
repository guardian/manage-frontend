import {
	getBanner,
	insertBanner,
	requestBannersRefresh,
	//subscribeToBannersUpdates,
} from '@braze/web-sdk';
//import braze from '@braze/web-sdk';
import { useEffect, useRef } from 'react';

export const TestBrazeBanner = () => {
	const brazeContainerElement = useRef(null);

	useEffect(() => {
		const sdfbdsgf = 'braze-banner-ref';
		requestBannersRefresh(
			[sdfbdsgf],
			() => {
				console.log('request banner refresh sucess handler called');
			},
			() => {
				console.log('request banner refresh error handler called');
			},
		);
		//subscribeToBannersUpdates((banners) => {
		const mmaBanner = getBanner(sdfbdsgf);
		if (brazeContainerElement.current) {
			console.log('mmaBanner = ', mmaBanner);
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
