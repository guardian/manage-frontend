import { fetchWithDefaultParameters } from '@/client/utilities/fetch';

export interface Subscription {
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
	const url = '/idapi/user/newsletters';
	return await fetchWithDefaultParameters(url)
		.then((response) => response.json() as Promise<NewsletterSubscriptions>)
		.then((newsletters) =>
			newsletters.result.subscriptions.map((subscription: Subscription) =>
				subscription.listId.toString(),
			),
		);
};
