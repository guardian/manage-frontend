import type { ProductDetail } from '../../../shared/productResponse';

// Base ProductTypes to support
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
// 	| 'guardianadlite';

export function baseMembership(): ProductDetail {
	return {
		mmaProductKey: 'Supporter',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		billingCountry: 'United Kingdom',
		joinDate: '2023-04-26',
		optIn: true,
		subscription: {
			contactId: '2',
			safeToUpdatePaymentMethod: true,
			start: '2023-04-26',
			end: '2024-04-26',
			nextPaymentPrice: 700,
			nextPaymentDate: '2023-05-26',
			lastPaymentDate: '2023-04-26',
			potentialCancellationDate: null,
			chargedThroughDate: '2023-05-26',
			renewalDate: '2024-04-26',
			anniversaryDate: '2024-04-26',
			cancelledAt: false,
			subscriptionId: 'A-S00538748',
			trialLength: -1,
			autoRenew: true,
			plan: {
				name: 'Supporter',
				price: 700,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'month',
				start: '',
				end: '',
				shouldBeVisible: false,
				features: '',
			},
			currentPlans: [
				{
					name: null,
					start: '2023-04-26',
					end: '2024-04-26',
					shouldBeVisible: true,
					chargedThrough: '2023-05-26',
					price: 700,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '2',
		},
		isTestUser: false,
	};
}

export function basePatron(): ProductDetail {
	return {
		mmaProductKey: 'guardianpatron',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		joinDate: '2025-02-05',
		optIn: true,
		subscription: {
			contactId: "Guardian Patrons don't have a Salesforce contactId",
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Way',
				town: 'London',
				postcode: 'N1 9GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: false,
			start: '2025-02-05',
			end: '2026-02-05',
			nextPaymentPrice: 1000,
			nextPaymentDate: '2026-02-05',
			potentialCancellationDate: '2026-02-05',
			lastPaymentDate: '2025-02-05',
			chargedThroughDate: '2026-02-05',
			renewalDate: '2026-02-05',
			anniversaryDate: '2026-02-05',
			cancelledAt: false,
			subscriptionId: 'patronFromDynamoName',
			trialLength: 0,
			autoRenew: true,
			plan: {
				name: 'guardianpatron',
				price: 100000,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'year',
				start: '2022-12-23',
				end: '2024-12-11',
				shouldBeVisible: true,
				features: '',
			},
			currentPlans: [
				{
					name: null,
					start: '2025-02-05',
					end: '2026-02-05',
					shouldBeVisible: true,
					chargedThrough: '2026-02-05',
					price: 100000,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'year',
					features: '',
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: 'stripeCustomerId_12a6e2a6-0438-4255-95c2-52a10ab99aee',
			cancellationEffectiveDate: '2026-02-05',
		},
		isTestUser: false,
	};
}

export function baseGuardianWeekly(): ProductDetail {
	return {
		mmaProductKey: 'Guardian Weekly - Domestic',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
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
		},
		isTestUser: false,
	};
}

export function baseDigitalPack(): ProductDetail {
	return {
		mmaProductKey: 'Digital Pack',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
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
			nextPaymentPrice: 14900,
			nextPaymentDate: '2021-11-27',
			lastPaymentDate: null,
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-11',
			anniversaryDate: '2022-11-27',
			cancelledAt: false,
			subscriptionId: 'A-S00278175',
			trialLength: 12,
			autoRenew: true,
			plan: {
				name: 'Digital Pack',
				price: 14900,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'year',
				start: '2022-12-23',
				end: '2024-12-11',
				shouldBeVisible: true,
				features: '',
			},
			currentPlans: [],
			futurePlans: [
				{
					name: null,
					start: '2022-06-05',
					end: '2023-05-20',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 14900,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'year',
				},
			],
			readerType: 'Direct',
		},
		isTestUser: false,
	};
}

export function baseContribution(): ProductDetail {
	return {
		mmaProductKey: 'Contributor',
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
			nextPaymentPrice: 700,
			nextPaymentDate: '2022-02-05',
			lastPaymentDate: '2022-01-05',
			potentialCancellationDate: null,
			chargedThroughDate: '2022-02-05',
			renewalDate: '2023-01-05',
			anniversaryDate: '2023-01-05',
			cancelledAt: false,
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
					price: 700,
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

export function baseVoucher(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Voucher',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			phoneRegionsToDisplay: ['UK & ROW'],
			shouldDisplayEmail: false,
		},
		joinDate: '2021-11-26',
		optIn: true,
		billingCountry: 'United Kingdom',
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
			nextPaymentPrice: 5699,
			nextPaymentDate: '2024-10-29',
			lastPaymentDate: null,
			potentialCancellationDate: '2024-10-29',
			anniversaryDate: '2022-12-06',
			autoRenew: true,
			cancelledAt: false,
			subscriptionId: 'A-S00285104',
			trialLength: -2629,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			currentPlans: [
				{
					name: 'Sixday',
					start: '2021-12-06',
					end: '2022-11-26',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 5699,
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
					],
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad0824e7d584341017d5bc38c0d52dc',
		},
		isTestUser: false,
	};
}

export const baseVoucherPlus = (): ProductDetail => {
	return {
		mmaProductKey: 'Newspaper Voucher + Digital',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			phoneRegionsToDisplay: ['UK & ROW'],
			shouldDisplayEmail: false,
		},
		joinDate: '2021-11-26',
		optIn: true,
		billingCountry: 'United Kingdom',
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
			nextPaymentPrice: 5699,
			nextPaymentDate: '2024-10-29',
			lastPaymentDate: null,
			potentialCancellationDate: '2024-10-29',
			anniversaryDate: '2022-12-06',
			autoRenew: true,
			cancelledAt: false,
			subscriptionId: 'A-S00285104',
			trialLength: -2629,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			currentPlans: [
				{
					name: 'Sixday plus Digital Subscription',
					start: '2021-12-06',
					end: '2022-11-26',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 5699,
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
					],
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad0824e7d584341017d5bc38c0d52dc',
		},
		isTestUser: false,
	};
};

export function baseVoucherObserver(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Voucher - Observer',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2025-05-16',
		optIn: true,
		billingCountry: 'United Kingdom',
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
			start: '2025-06-15',
			end: '2026-05-16',
			nextPaymentPrice: 1599,
			nextPaymentDate: '2025-06-15',
			lastPaymentDate: null,
			potentialCancellationDate: '2025-06-15',
			anniversaryDate: '2026-06-15',
			autoRenew: true,
			cancelledAt: false,
			subscriptionId: 'A-S00285105',
			trialLength: 30,
			chargedThroughDate: null,
			renewalDate: '2026-05-16',
			currentPlans: [],
			futurePlans: [
				{
					mmaProductKey: 'Newspaper Voucher - Observer',
					name: 'Sunday',
					start: '2025-06-15',
					end: '2026-05-16',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 1599,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					features: '',
					daysOfWeek: ['Sunday'],
				},
			],
			readerType: 'Direct',
			accountId: '6ad08ec296d239070196d841dth3132d',
		},
		isTestUser: false,
	};
}

export function baseDigitalVoucherObserver(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Digital Voucher - Observer',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			anniversaryDate: '2022-12-06',
			cancelledAt: false,
			subscriptionId: 'A-S00285104',
			trialLength: -7,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Sunday',
					start: '2021-12-06',
					end: '2022-11-26',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 5299,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					daysOfWeek: ['Sunday'],
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad0824e7d584341017d5bc38c0d52dc',
		},
		isTestUser: false,
	};
}

export function baseDigitalVoucher(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Digital Voucher',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			anniversaryDate: '2022-12-06',
			cancelledAt: false,
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
	};
}

export const baseDigitalVoucherPlus = (): ProductDetail => {
	return {
		mmaProductKey: 'Newspaper Digital Voucher + Digital',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-11-26',
			anniversaryDate: '2022-12-06',
			cancelledAt: false,
			subscriptionId: 'A-S00285104',
			trialLength: -7,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Everyday plus Digital Subscription',
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
	};
};

export function baseObserverDelivery(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Delivery - Observer',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		billingCountry: 'United Kingdom',
		joinDate: '2025-02-11',
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
			start: '2025-02-11',
			end: '2026-02-11',
			nextPaymentPrice: 2099,
			nextPaymentDate: '2025-02-11',
			lastPaymentDate: null,
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2026-02-11',
			anniversaryDate: '2026-02-11',
			cancelledAt: false,
			subscriptionId: 'A-S00959486',
			trialLength: 0,
			autoRenew: true,
			plan: {
				name: 'Newspaper Delivery',
				price: 2099,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'month',
				start: '2022-12-23',
				end: '2024-12-11',
				shouldBeVisible: true,
				features: '',
			},
			currentPlans: [
				{
					name: 'Sunday',
					start: '2025-02-11',
					end: '2026-02-11',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 2099,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					features: '',
					daysOfWeek: ['Sunday'],
				},
			],
			futurePlans: [
				{
					name: null,
					start: '2025-02-26',
					end: '2025-02-26',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 500,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					features: '',
				},
			],
			readerType: 'Direct',
			accountId: '8ad0824e7d584341017d5bc38c0d52dc',
		},
		isTestUser: false,
	};
}

export function baseHomeDeliverySaturdayPlus(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Delivery + Digital',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriptionId: 'A-S00293857',
			trialLength: -37,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Saturday plus Digital Subscription',
					start: '2021-12-24',
					end: '2022-12-15',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 3250,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					daysOfWeek: ['Saturday'],
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

export function baseHomeDelivery(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper Delivery',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriptionId: 'A-S00293857',
			trialLength: -37,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Saturday',
					start: '2021-12-24',
					end: '2022-12-15',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 3250,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					daysOfWeek: ['Saturday'],
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

export const baseHomeDeliveryPlus = (): ProductDetail => {
	return {
		mmaProductKey: 'Newspaper Delivery + Digital',
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
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriptionId: 'A-S00293857',
			trialLength: -37,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Everyday plus Digital Subscription',
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
};

export function baseNationalDelivery(): ProductDetail {
	return {
		mmaProductKey: 'Newspaper - National Delivery',
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
				town: 'Derby',
				postcode: 'DE10FD',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-12-24',
			end: '2022-12-15',
			nextPaymentPrice: 3250,
			nextPaymentDate: '2021-12-24',
			lastPaymentDate: null,
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
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

export const baseNationalDeliveryPlus = (): ProductDetail => {
	return {
		mmaProductKey: 'Newspaper - National Delivery + Digital',
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
				town: 'Derby',
				postcode: 'DE10FD',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-12-24',
			end: '2022-12-15',
			nextPaymentPrice: 3250,
			nextPaymentDate: '2021-12-24',
			lastPaymentDate: null,
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriptionId: 'A-S00293857',
			trialLength: -37,
			autoRenew: true,
			currentPlans: [
				{
					name: 'Everyday plus Digital Subscription',
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
};

export function baseGuardianAdLite(): ProductDetail {
	return {
		mmaProductKey: 'Guardian Ad-Lite',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		joinDate: '2022-07-20',
		optIn: true,
		subscription: {
			contactId: '0039E00001KA26BQAT',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '90 York Place',
				town: 'London',
				postcode: 'N1 9GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2022-07-20',
			end: '2022-08-20',
			nextPaymentPrice: 700,
			nextPaymentDate: '2022-08-20',
			lastPaymentDate: '2022-07-20',
			potentialCancellationDate: null,
			chargedThroughDate: '2022-08-20',
			renewalDate: '2023-07-20',
			anniversaryDate: '2023-07-20',
			cancelledAt: false,
			subscriptionId: 'A-S00303371',
			trialLength: -2,
			autoRenew: true,
			currentPlans: [
				{
					name: null,
					start: '2022-07-20',
					end: '2023-07-20',
					shouldBeVisible: true,
					chargedThrough: '2022-08-20',
					price: 700,
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

export function baseSupporterPlus(): ProductDetail {
	return {
		mmaProductKey: 'Supporter Plus',
		isPaidTier: true,
		isTestUser: false,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: ['UK & ROW'],
		},
		joinDate: '2022-07-20',
		optIn: true,
		subscription: {
			contactId: '0039E00001VVNb5QAH',
			safeToUpdatePaymentMethod: true,
			start: '2022-07-20',
			end: '2022-08-20',
			nextPaymentPrice: 5000,
			nextPaymentDate: '2022-08-20',
			lastPaymentDate: '2022-07-20',
			potentialCancellationDate: null,
			chargedThroughDate: '2022-08-20',
			renewalDate: '2023-07-20',
			anniversaryDate: '2023-07-20',
			cancelledAt: false,
			subscriptionId: 'A-S00393340',
			trialLength: -2,
			autoRenew: true,
			currentPlans: [
				{
					name: null,
					start: '2022-07-20',
					end: '2023-07-20',
					shouldBeVisible: true,
					chargedThrough: '2022-08-20',
					price: 5000,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
				},
			],
			futurePlans: [],
			readerType: 'Direct',
			accountId: '8ad088718219a6b601821bbe9e6210f2',
		},
	};
}

export function baseTierThree(): ProductDetail {
	return {
		mmaProductKey: 'Tier Three',
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		billingCountry: 'United Kingdom',
		joinDate: '2021-11-29',
		optIn: true,
		subscription: {
			paymentMethod: 'Card',
			card: {
				last4: '4242',
				expiry: { month: 2, year: 2029 },
				type: 'Visa',
				stripePublicKeyForUpdate: 'pk_test_Qm3CGRdrV4WfGYCpm0sftR0f',
				email: 'rupert.bates+t3@observer.co.uk',
			},
			contactId: '003UD00000BDAMbYAP',
			deliveryAddress: {
				addressLine1: 'Kings Place',
				addressLine2: '',
				town: 'London',
				postcode: 'N19GU',
				country: 'United Kingdom',
			},
			safeToUpdatePaymentMethod: true,
			start: '2021-12-24',
			end: '2022-12-15',
			nextPaymentPrice: 2500,
			nextPaymentDate: '2024-06-28',
			lastPaymentDate: null,
			potentialCancellationDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-15',
			anniversaryDate: '2022-12-24',
			cancelledAt: false,
			subscriptionId: 'A-S00897035',
			trialLength: 4,
			autoRenew: true,
			plan: {
				name: 'Tier Three',
				price: 2500,
				currency: '£',
				currencyISO: 'GBP',
				billingPeriod: 'month',
				start: '',
				end: '',
				shouldBeVisible: false,
				features: '',
			},
			currentPlans: [],
			futurePlans: [
				{
					name: null,
					start: '2021-12-10',
					end: '2022-11-29',
					shouldBeVisible: true,
					chargedThrough: null,
					price: 2500,
					currency: '£',
					currencyISO: 'GBP',
					billingPeriod: 'month',
					features: '',
				},
			],
			readerType: 'Direct',
			accountId: '8ad08f069010dd31019011e437574822',
		},
		isTestUser: false,
	};
}
