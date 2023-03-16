import { SoftOptInIDs } from './softOptInIDs';

export interface AppSubscription {
	subscriptionId: string;
	cancellationTimestamp?: string;
	from: string;
	valid: boolean;
	productId: string;
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

export enum AppStore {
	IOS,
	ANDROID,
	UNKNOWN,
}

export function determineAppStore(subscription: AppSubscription) {
	if (subscription.productId.includes('guardian.subscription')) {
		return AppStore.ANDROID;
	}
	if (
		subscription.productId.includes('guardian.gia') ||
		subscription.productId.includes('guardian.gla')
	) {
		return AppStore.IOS;
	}
	return AppStore.UNKNOWN;
}
