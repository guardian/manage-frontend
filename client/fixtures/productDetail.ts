/*
 * Product details for signed in user
 * /api/me/mma
 *
 * Products are split out here, but will be returned as an array from the API.
 * eg. `[guardianWeeklyCard, digitalDD, newspaperVoucherPaypal]`
 *
 * DEPRECATED IN FAVOUR OF `productBuilder.ts`
 */

import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../shared/productResponse';

export const patronDigitalSub: ProductDetail = {
	mmaCategory: 'subscriptions',
	tier: 'Digital Pack',
	isPaidTier: true,
	isTestUser: true,
	selfServiceCancellation: {
		isAllowed: false,
		shouldDisplayEmail: false,
		phoneRegionsToDisplay: ['UK & ROW'],
	},
	joinDate: '2022-05-20',
	optIn: true,
	subscription: {
		paymentMethod: 'Card',
		card: {
			last4: '4242',
			expiry: { month: 2, year: 2024 },
			type: 'Visa',
			stripePublicKeyForUpdate: 'pk_test_123',
			email: 'test@user.co.uk',
		},
		contactId: '0039E00001SlOFuQAN',
		deliveryAddress: {
			addressLine1: 'Kings Place',
			addressLine2: '',
			town: 'London',
			postcode: 'N1 9GU',
			country: 'United Kingdom',
		},
		safeToUpdatePaymentMethod: true,
		start: '2022-06-05',
		end: '2023-05-20',
		nextPaymentPrice: 0,
		nextPaymentDate: '2022-06-05',
		lastPaymentDate: null,
		chargedThroughDate: null,
		renewalDate: '2023-05-20',
		anniversaryDate: '2023-06-05',
		cancelledAt: false,
		subscriberId: 'A-S00365607',
		subscriptionId: 'A-S00365607',
		trialLength: 13,
		autoRenew: true,
		plan: {
			name: 'Digital Pack',
			price: 11900,
			currency: '£',
			currencyISO: 'GBP',
			billingPeriod: 'year',
			start: '2022-12-23',
			end: '2024-12-11',
			shouldBeVisible: true,
		},
		currentPlans: [],
		futurePlans: [
			{
				name: null,
				start: '2022-06-05',
				end: '2023-05-20',
				shouldBeVisible: true,
				chargedThrough: null,
				price: 11900,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'year',
			},
		],
		readerType: 'Patron',
		cancellationEffectiveDate: '2023-05-20',
	},
};

export const toMembersDataApiResponse = (
	...productDetails: ProductDetail[]
): MembersDataApiResponse => {
	return {
		user: {
			firstName: 'test',
			lastName: 'name',
			email: 'test@test.com',
		},
		products: productDetails,
	};
};
