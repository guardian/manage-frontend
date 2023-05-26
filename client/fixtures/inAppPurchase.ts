import type { AppSubscription } from '../../shared/mpapiResponse';

export const InAppPurchase: AppSubscription = {
	subscriptionId: '1',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: '',
};

export const CancelledInAppPurchase: AppSubscription = {
	cancellationTimestamp: '2023-01-11T11:05:20.000Z',
	subscriptionId: '2',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: '',
};

export const InAppPurchaseIos: AppSubscription = {
	subscriptionId: '3',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: 'uk.co.guardian.gia.1month',
};

export const InAppPurchaseAndroid: AppSubscription = {
	subscriptionId: '4',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: 'com.guardian.subscription.annual.metered',
};

export const PuzzleAppPurchaseAndroid: AppSubscription = {
	subscriptionId: '5',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: 'uk.co.guardian.puzzles.annual_sub',
};

export const PuzzleAppPurchaseIos: AppSubscription = {
	subscriptionId: '6',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
	productId: 'uk.co.guardian.puzzles.monthlySub',
};
