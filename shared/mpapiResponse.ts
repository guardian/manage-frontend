export interface AppSubscription {
	subscriptionId: string;
	cancellationTimestamp?: string;
	valid: boolean;
}

export interface MPAPIResponse {
	subscriptions: AppSubscription[];
}
