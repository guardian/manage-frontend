import type { CancelledProductDetail } from '../../shared/productResponse';

export const cancelledContribution: CancelledProductDetail = {
	mmaCategory: 'recurringSupport',
	tier: 'Contributor',
	joinDate: '2022-01-05',
	subscription: {
		subscriptionId: 'A-S00303370',
		cancellationEffectiveDate: '2023-03-20',
		start: '2021-12-10',
		end: '2022-11-29',
		readerType: 'Direct',
		accountId: '8ad09f8a7e25bda3017e296317464818',
	},
};

export const cancelledGuardianWeekly: CancelledProductDetail = {
	mmaCategory: 'subscriptions',
	tier: 'Guardian Weekly - Domestic',
	joinDate: '2022-01-05',
	subscription: {
		subscriptionId: 'A-S00499483',
		cancellationEffectiveDate: '2023-02-28',
		start: '2023-03-10',
		end: '2023-03-10',
		readerType: 'Direct',
		accountId: '8ad09ea08683666d0186991883c55333',
	},
};
