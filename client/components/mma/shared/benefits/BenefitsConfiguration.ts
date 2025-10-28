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
	name: 'Unlimited access to the Guardian Feast app',
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

const productPlusdigitalBenefits = [
	{
		description:
			'Unlimited access to the refreshed Guardian app and Guardian Feast app',
	},
	{
		description:
			'Unlimited access to the Guardian Editions app so you can enjoy newspapers on your mobile and tablet',
	},
	{ description: 'Ad-free reading on all your devices' },
	{
		description:
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
	},
	{ description: 'Far fewer asks for support' },
];

const digitalPlusBenefits = [
	{ description: 'Guardian Weekly e-magazine' },
	{ description: 'The Long Read e-magazine' },
	{
		description:
			"Digital access to the Guardian's 200 year newspaper archive",
	},
	{ description: 'Far fewer asks for support' },
	{ description: 'Ad-free reading on all your devices' },
	{ description: 'Unlimited access to the premium Guardian app' },
	{
		description:
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
	},
	{ description: 'Unlimited access to the Guardian Feast app' },
];

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
		digipack: digitalPlusBenefits,
		digitalvoucher: [],
		newspaper: [],
		homedelivery: [],
		homedeliveryplusdigital: [...productPlusdigitalBenefits],
		nationaldelivery: [],
		nationaldeliveryplusdigital: [...productPlusdigitalBenefits],
		voucher: [],
		voucherplusdigital: [...productPlusdigitalBenefits],
		guardianweekly: [],
		guardianadlite: [],
		guardianpatron: [],
		observer: [],
		digitalvoucherobserver: [],
		digitalvoucherplusdigital: [...productPlusdigitalBenefits],
		voucherobserver: [],
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
