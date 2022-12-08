import { getCookie } from '../cookies';

let countryCode: string | null = null;

export const getGeoLocation = (): string | null => {
	if (countryCode === null) {
		countryCode = getCookie('GU_geo_country');
	}

	return countryCode;
};

export const isInUSA = (): boolean => getGeoLocation() === 'US';

export const _ = { resetModule: () => (countryCode = null) };
