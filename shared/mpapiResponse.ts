export interface AppSubscription {
	subscriptionId: string;
	cancellationTimestamp?: string;
}

export interface MPAPIResponse {
	subscriptions: AppSubscription[];
}

export function getFirstActiveAppSubscription(
	subscriptions: AppSubscription[],
) {
	if (subscriptions.length === 0) {
		return null;
	}

	return (
		subscriptions.filter((iap) => !iap.cancellationTimestamp)[0] ??
		subscriptions[0]
	);
}
