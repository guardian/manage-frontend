import type { AppSubscription } from '../../shared/mpapiResponse';

export const InAppPurchase: AppSubscription = {
	subscriptionId: '1',
	valid: true,
};

export const CancelledInAppPurchase: AppSubscription = {
	cancellationTimestamp: 'date',
	subscriptionId: '2',
	valid: true,
};
