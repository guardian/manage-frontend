import type { AppSubscription } from '../../shared/mpapiResponse';

export const InAppPurchase: AppSubscription = {
	subscriptionId: '1',
};

export const CancelledInAppPurchase: AppSubscription = {
	cancellationTimestamp: 'date',
	subscriptionId: '1',
};
