import type { CountryCode } from '@guardian/libs';
import { useEffect } from 'react';
import { getGeoLocation } from '../geolocation';

export const useConsent = () => {
	useEffect(() => {
		import('@guardian/libs').then(({ cmp }) => {
			cmp.init({
				// Default to GB so it works when no geolocation
				// cookie is present (eg. local development)
				country: (getGeoLocation() ?? 'GB') as CountryCode,
				useNonAdvertisedList: true,
			});
		});
	}, []);
};
