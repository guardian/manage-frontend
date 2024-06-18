import type { ProductTypeKeys } from '@/shared/productTypes';

/* Product Switch Benefits */

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

const adFree = {
	name: 'Ad-free reading.',
	description: 'Avoid ads on all your devices',
};

const guardianWeekly = {
	name: 'Guardian Weekly',
	description: 'Print magazine delivered to your door every week',
};

export interface ProductBenefit {
	name?: string;
	description?: string;
	isUnavailable?: boolean;
}

export const supporterPlusSwitchBenefits = [newsApp, adFree];

export const benefitsConfiguration: {
	[productType in ProductTypeKeys]: ProductBenefit[];
} = {
	contributions: [
		supporterNewsletter,
		uninterruptedReading,
		{
			...newsApp,
			isUnavailable: true,
		},
	],
	supporterplus: [supporterNewsletter, uninterruptedReading, newsApp, adFree],
	tierthree: [
		guardianWeekly,
		supporterNewsletter,
		uninterruptedReading,
		newsApp,
		adFree,
	],
	membership: [newsApp, uninterruptedReading, supporterNewsletter],
	digipack: [],
	digitalvoucher: [],
	newspaper: [],
	homedelivery: [],
	nationaldelivery: [],
	voucher: [],
	guardianweekly: [],
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
