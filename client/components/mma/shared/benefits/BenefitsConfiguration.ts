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
	name: 'The Guardian Weekly',
	description: 'magazine, delivered to your door every week',
};

const partnerOffers: ProductBenefit = {
	name: 'Exclusive partner offers.',
	description: 'Opportunities to access to discounts and tickets',
	specificToRegions: ['AUD'],
};

const newspaperArchiveBenefit = {
	description: "Digital access to the Guardian's 200-year newspaper archive",
};

const productPlusdigitalBenefits = [
	{
		name: 'Ad-free reading',
		description:
			'and fewer asks of support on the Guardian app and website',
	},
	{
		description:
			'Unlimited access to the Guardian app and Guardian Feast app',
	},
	{
		description:
			'Exclusive supporter newsletters, and a weekly newsletter from The Guardian Weekly editor',
	},
	{
		description:
			'Access to the Guardian Editions app, where you can enjoy digital versions of our newspapers and magazines on your phone or tablet',
	},
];

const digitalPlusBenefits = [
	{ description: 'Guardian Weekly e-magazine' },
	{ description: 'The Long Read e-magazine' },
	newspaperArchiveBenefit,
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
		guardianweekly: [
			guardianWeekly,
			...productPlusdigitalBenefits,
			newspaperArchiveBenefit,
		],
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

export const getUpsellBenefits = (
	productType: ProductTypeKeys,
): ProductBenefit[] => {
	switch (productType) {
		case 'supporterplus':
		default:
			return [
				{
					description: 'Guardian Weekly e-magazine',
				},
				{
					description: 'The Long Read e-magazine',
				},
				newspaperArchiveBenefit,
				{
					description: 'Daily digital Guardian newspaper',
				},
			];
	}
};
