import { APIUseCredentials, identityFetch } from './fetch';

interface Subscription {
	listId: number;
}

export interface NewsletterSubscriptions {
	result: {
		htmlPreference: string;
		subscriptions: [Subscription];
		globalSubscriptionStatus: string;
	};
	status: string;
}

export const read = async (): Promise<string[]> => {
	const url = '/users/me/newsletters';
	const data = await identityFetch<NewsletterSubscriptions>(
		url,
		APIUseCredentials({}),
	);
	return data.result.subscriptions.map((s: Subscription) =>
		s.listId.toString(),
	);
};
