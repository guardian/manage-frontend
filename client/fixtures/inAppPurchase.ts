import type { AppSubscription } from '../../shared/mpapiResponse';

export const InAppPurchase: AppSubscription = {
	subscriptionId: '1',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
};

export const CancelledInAppPurchase: AppSubscription = {
	cancellationTimestamp: '2023-01-11T11:05:20.000Z',
	subscriptionId: '2',
	valid: true,
	from: '2023-01-11T11:05:20.000Z',
};
