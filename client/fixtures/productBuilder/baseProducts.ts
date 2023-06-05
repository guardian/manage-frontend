import type { ProductDetail } from '../../../shared/productResponse';

// export type ProductTypeKeys =
// 	| 'membership'
// 	| 'contributions'
// 	| 'newspaper'
// 	| 'homedelivery'
// 	| 'voucher'
// 	| 'digitalvoucher'
// 	| 'guardianweekly'
// 	| 'digipack'
// 	| 'supporterplus'
// 	| 'guardianpatron';

export function baseMembership(): ProductDetail {
	return {
		mmaCategory: 'membership',
		tier: 'Staff Membership',
		isTestUser: true,
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		joinDate: '2014-12-16',
		subscription: {
			safeToUpdatePaymentMethod: true,
			end: '2022-12-16',
			nextPaymentPrice: null,
			nextPaymentDate: null,
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-16',
			anniversaryDate: '2022-12-16',
			cancelledAt: false,
			subscriptionId: 'A-S00393340',
			trialLength: 0,
			autoRenew: true,
			currentPlans: [],
			futurePlans: [],
			readerType: 'Direct',
		},
	};
}

export function baseGuardianWeekly(): ProductDetail {
	return {
		mmaCategory: 'subscriptions',
		tier: 'Guardian Weekly - Domestic',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2021-11-29',
		optIn: true,
		subscription: {
			contactId: '0039E00001KA26BQAT',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Way',
				town: 'London',
				postcode: 'N1 9GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-12-24',
			end: '2022-12-15',
			nextPaymentPrice: 13500,
			nextPaymentDate: '2021-12-10',
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriberId: 'A-S00286635',
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
		},
		isTestUser: false,
		key: '1638374153759',
	};
}

export function baseDigitalPack(): ProductDetail {
	return {
		mmaCategory: 'subscriptions',
		tier: 'Digital Pack',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2021-11-11',
		subscription: {
			contactId: '0039E00001KA26BQAT',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Way',
				town: 'London',
				postcode: 'N1 9GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-11-27',
			end: '2022-11-11',
			nextPaymentPrice: 599,
			nextPaymentDate: '2021-11-27',
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-11',
			anniversaryDate: '2022-11-27',
			cancelledAt: false,
			subscriptionId: 'A-S00278175',
			trialLength: 12,
			autoRenew: true,
			currentPlans: [],
			futurePlans: [
				{
					name: null,
					start: '2021-11-27',
					shouldBeVisible: true,
				},
			],
			readerType: 'Direct',
		},
		isTestUser: false,
	};
}

export function baseContribution(): ProductDetail {
	return {
		mmaCategory: 'recurringSupport',
		tier: 'Contributor',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		joinDate: '2022-01-05',
		optIn: true,
		subscription: {
			contactId: '0039E00001KA26BQAT',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Place',
				town: 'Canberra',
				region: 'ACT',
				postcode: '2601',
				country: 'Australia',
			},
			safeToUpdatePaymentMethod: true,
			start: '2022-01-05',
			end: '2022-02-05',
			nextPaymentPrice: 10000,
			nextPaymentDate: '2022-02-05',
			lastPaymentDate: '2022-01-05',
			chargedThroughDate: '2022-02-05',
			renewalDate: '2023-01-05',
			anniversaryDate: '2023-01-05',
			cancelledAt: false,
			subscriberId: 'A-S00303370',
			subscriptionId: 'A-S00303370',
			trialLength: -24,
			autoRenew: true,
			currentPlans: [
				{
					name: null,
					start: '2022-01-05',
					end: '2023-01-05',
					shouldBeVisible: true,
					chargedThrough: '2022-02-05',
					price: 10000,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad09f8a7e25bda3017e296317464818',
		},
		isTestUser: false,
	};
}

export function baseDigitalVoucher(): ProductDetail {
	return {
		mmaCategory: 'subscriptions',
		tier: 'Newspaper Digital Voucher',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2021-11-26',
		optIn: true,
		subscription: {
			contactId: '0039E00001KA26BQAT',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Way',
				town: 'London',
				postcode: 'N1 9GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-12-06',
			end: '2022-11-26',
			nextPaymentPrice: 5299,
			nextPaymentDate: '2021-12-06',
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			anniversaryDate: '2022-12-06',
			cancelledAt: false,
			subscriberId: 'A-S00285104',
			subscriptionId: 'A-S00285104',
			trialLength: -7,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Everyday',
					start: '2021-12-06',
					end: '2022-11-26',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 5299,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					daysOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
						'Sunday',
					],
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad0824e7d584341017d5bc38c0d52dc',
		},
		isTestUser: false,
		key: '1639394814906',
	};
}

export function baseHomeDelivery(): ProductDetail {
	return {
		mmaCategory: 'subscriptions',
		tier: 'Newspaper Delivery',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2021-12-15',
		optIn: true,
		subscription: {
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
			subscriberId: 'A-S00293857',
			subscriptionId: 'A-S00293857',
			trialLength: -37,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Everyday',
					start: '2021-12-24',
					end: '2022-12-15',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 3250,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					daysOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
						'Sunday',
					],
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad0965d7dbcc507017dbe20afd33ac4',
			deliveryAddressChangeEffectiveDate: '2022-02-11',
		},
		isTestUser: false,
	};
}
