/*
 * Product subscription details for signed in user
 * /api/me/mma?productType=ContentSubscription
 *
 * Subscriptions are split out here, but will be returned as an array from the API.
 * eg. `[guardianWeeklySubscriptionCard, digitalSubscriptionDD]`
 */

import type { Subscription } from '../../shared/productResponse';

export const guardianWeeklySubscriptionCard: Subscription = {
	paymentMethod: 'Card',
	card: {
		last4: '4242',
		expiry: {
			month: 4,
			year: 2024,
		},
		type: 'Visa',
		stripePublicKeyForUpdate: 'pk_test_123',
		email: 'test.user@example.com',
	},
	contactId: '0039E00001KA26BQAT',
	deliveryAddress: {
		addressLine1: 'Kings Place',
		addressLine2: '90 York Way',
		town: 'London',
		postcode: 'N1 9GU',
		country: 'United Kingdom',
	},
	safeToUpdatePaymentMethod: true,
	start: '2021-12-10',
	end: '2022-11-29',
	nextPaymentPrice: 13500,
	nextPaymentDate: '2021-12-10',
	lastPaymentDate: null,
	chargedThroughDate: null,
	renewalDate: '2022-11-29',
	anniversaryDate: '2022-12-10',
	cancelledAt: false,
	subscriptionId: 'A-S00286635',
	trialLength: 9,
	autoRenew: true,
	currentPlans: [],
	futurePlans: [
		{
			name: null,
			start: '2021-12-10',
			end: '2022-11-29',
			shouldBeVisible: true,
			chargedThrough: null,
			price: 15000,
			currency: '£',
			currencyISO: 'GBP',
			billingPeriod: 'year',
		},
	],
	readerType: 'Direct',
	accountId: '8ad0965d7d585497017d6ce786026089',
	deliveryAddressChangeEffectiveDate: '2021-12-10',
};

export const guardianWeeklySubscriptionAustralia: Subscription = {
	paymentMethod: 'Card',
	card: {
		last4: '4242',
		expiry: {
			month: 3,
			year: 2033,
		},
		type: 'Visa',
		stripePublicKeyForUpdate: 'pk_test_123',
		email: 'test.user@example.com',
	},
	contactId: '0039E00001KA26BQAT',
	deliveryAddress: {
		addressLine1: 'Kings Place',
		addressLine2: '90 York Way',
		town: 'Canberra',
		region: 'ACT',
		postcode: '2601',
		country: 'Australia',
	},
	safeToUpdatePaymentMethod: true,
	start: '2021-12-24',
	end: '2022-12-15',
	nextPaymentPrice: 3250,
	nextPaymentDate: '2021-12-24',
	lastPaymentDate: null,
	chargedThroughDate: null,
	renewalDate: '2022-12-15',
	anniversaryDate: '2022-12-24',
	cancelledAt: false,
	subscriptionId: 'A-S00293857',
	trialLength: 9,
	autoRenew: true,
	currentPlans: [],
	futurePlans: [
		{
			name: null,
			start: '2021-12-24',
			end: '2022-12-15',
			shouldBeVisible: true,
			chargedThrough: null,
			price: 3250,
			currency: '$',
			currencyISO: 'AUD',
			billingPeriod: 'month',
		},
	],
	readerType: 'Direct',
	accountId: '8ad0965d7dbcc507017dbe20afd33ac4',
	deliveryAddressChangeEffectiveDate: '2021-12-24',
};

export const digitalSubscriptionDD: Subscription = {
	paymentMethod: 'DirectDebit',
	account: {
		accountName: 'asfd',
	},
	mandate: {
		accountName: 'asfd',
		accountNumber: '****9911',
		sortCode: '200000',
	},
	contactId: '0039E00001KA26BQAT',
	deliveryAddress: {
		addressLine1: 'Kings Place',
		addressLine2: '90 York Way',
		town: 'London',
		postcode: 'N1 9GU',
		country: 'United Kingdom',
	},
	safeToUpdatePaymentMethod: true,
	start: '2021-12-18',
	end: '2022-12-02',
	nextPaymentPrice: 9900,
	nextPaymentDate: '2021-12-18',
	lastPaymentDate: null,
	chargedThroughDate: null,
	renewalDate: '2022-12-02',
	anniversaryDate: '2022-12-18',
	cancelledAt: false,
	subscriptionId: 'A-S00287957',
	trialLength: 16,
	autoRenew: true,
	currentPlans: [],
	futurePlans: [
		{
			name: null,
			start: '2021-12-18',
			end: '2022-12-02',
			shouldBeVisible: true,
			chargedThrough: null,
			price: 11900,
			currency: '£',
			currencyISO: 'GBP',
			billingPeriod: 'year',
		},
	],
	readerType: 'Direct',
	accountId: '8ad08c0f7d768472017d7bc3e5960b20',
};
