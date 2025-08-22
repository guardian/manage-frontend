import type { CancelledProductDetail } from '../../shared/productResponse';

export const cancelledContribution: CancelledProductDetail = {
	mmaProductKey: 'Contributor',
	joinDate: '2022-01-05',
	subscription: {
		subscriptionId: 'A-S00000000',
		cancellationEffectiveDate: '2023-03-20',
		start: '2021-12-10',
		end: '2022-11-29',
		readerType: 'Direct',
		accountId: '00000000',
	},
};

export const cancelledGuardianWeekly: CancelledProductDetail = {
	mmaProductKey: 'Guardian Weekly - Domestic',
	joinDate: '2022-01-05',
	subscription: {
		subscriptionId: 'A-S00000000',
		cancellationEffectiveDate: '2023-02-28',
		start: '2023-03-10',
		end: '2023-03-10',
		readerType: 'Direct',
		accountId: '00000000',
	},
};

export const cancelledGuardianAdLite: CancelledProductDetail = {
	mmaProductKey: 'Guardian Ad-Lite',
	joinDate: '2022-01-05',
	subscription: {
		subscriptionId: 'A-S00000000',
		cancellationEffectiveDate: '2023-02-28',
		start: '2023-03-10',
		end: '2023-03-10',
		readerType: 'Direct',
		accountId: '00000000',
	},
};
