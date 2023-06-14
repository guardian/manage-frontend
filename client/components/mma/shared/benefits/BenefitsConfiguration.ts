import type { ProductTypeKeys } from '../../../../../shared/productTypes';

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

export interface ProductBenefit {
	name: string;
	description: string;
	isUnavailable?: boolean;
}

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
	supporterplus: [newsApp, adFree],
	membership: [newsApp, uninterruptedReading, supporterNewsletter],
	digipack: [],
	digitalvoucher: [],
	newspaper: [],
	homedelivery: [],
	voucher: [],
	guardianweekly: [],
	guardianpatron: [],
};
