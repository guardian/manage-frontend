import { SoftOptInIDs } from './softOptInIDs';

export interface AppSubscription {
	subscriptionId: string;
	cancellationTimestamp?: string;
	valid: boolean;
}

export interface MPAPIResponse {
	subscriptions: AppSubscription[];
}

export function isValidAppSubscription(subscription: AppSubscription) {
	return subscription.valid;
}

export const AppSubscriptionSoftOptInIds: string[] = [
	SoftOptInIDs.SupportOnboarding,
	SoftOptInIDs.SimilarProducts,
	SoftOptInIDs.SupporterNewsletter,
];
