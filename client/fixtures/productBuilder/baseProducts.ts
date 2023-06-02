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
			start: '2021-12-10',
			end: '2022-11-29',
			nextPaymentPrice: 13500,
			nextPaymentDate: '2021-12-10',
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-29',
			anniversaryDate: '2022-12-10',
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
