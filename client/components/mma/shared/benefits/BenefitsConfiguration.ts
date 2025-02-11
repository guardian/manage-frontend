import {
	type CurrencyIso,
	isCurrencyIso,
} from '@/client/utilities/currencyIso';
import type { ProductTypeKeys } from '@/shared/productTypes';

/* Product Switch Benefits, these are also shown on product cards */

const supporterNewsletter = {
	name: 'A regular supporter newsletter.',
	description: 'Get exclusive insight from our newsroom',
};

const uninterruptedReading = {
	name: 'Uninterrupted reading.',
	description: 'See far fewer asks for support',
};

const newsApp = {
	name: 'Full access to our news app.',
	description: 'Read our reporting on the go',
};

const feastApp = {
	name: 'Unlimited access to the Guardian Feast App',
	description: 'Make a feast out of anything with the Guardian’s recipe app',
};

const adFree = {
	name: 'Ad-free reading.',
	description: 'Avoid ads on all your devices',
};

const guardianWeekly = {
	name: 'Guardian Weekly.',
	description: 'Print magazine delivered to your door every week',
};

const partnerOffers: ProductBenefit = {
	name: 'Exclusive partner offers.',
	description: 'Opportunities to access to discounts and tickets',
	specificToRegions: ['AUD'],
};

export interface ProductBenefit {
	name?: string;
	description?: string;
	isUnavailable?: boolean;
	specificToRegions?: CurrencyIso[];
}

export function filterBenefitByRegion(
	benefit: {
		specificToRegions?: CurrencyIso[];
	},
	currencyIso: string,
) {
	if (isCurrencyIso(currencyIso)) {
		if (benefit.specificToRegions !== undefined) {
			return benefit.specificToRegions.includes(currencyIso);
		}

		return true;
	}

	/*	If we don't have a valid currency
	 	only show a benefit which is not region specific
	*/
	return benefit.specificToRegions === undefined;
}

export const supporterPlusSwitchBenefits = [newsApp, feastApp, adFree];

export const benefitsConfiguration: Record<ProductTypeKeys, ProductBenefit[]> =
	{
		contributions: [
			supporterNewsletter,
			uninterruptedReading,
			{
				...newsApp,
				isUnavailable: true,
			},
		],
		supporterplus: [
			supporterNewsletter,
			uninterruptedReading,
			newsApp,
			feastApp,
			adFree,
			partnerOffers,
		],
		tierthree: [
			guardianWeekly,
			supporterNewsletter,
			uninterruptedReading,
			newsApp,
			feastApp,
			adFree,
			partnerOffers,
		],
		membership: [newsApp, uninterruptedReading, supporterNewsletter],
		digipack: [],
		digitalvoucher: [],
		newspaper: [],
		homedelivery: [],
		nationaldelivery: [],
		voucher: [],
		guardianweekly: [],
		guardianadlite: [],
		guardianpatron: [],
	};

export function getUpgradeBenefits(
	supportProduct: 'contributions' | 'supporterplus',
): ProductBenefit[] {
	const isUnavailable = supportProduct === 'contributions';
	return [
		{
			name: 'More impactful funding of journalism',
		},
		{
			name: 'A regular supporter newsletter',
		},
		{
			name: 'Unlimited access in our app ',
			isUnavailable,
		},
		{
			name: 'Ad-free reading',
			isUnavailable,
		},
		{
			name: 'Offline reading',
			isUnavailable,
		},
	];
}
