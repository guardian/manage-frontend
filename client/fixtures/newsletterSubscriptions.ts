/*
 * Newsletter subscriptions for signed in user
 * /idapi/user/newsletters (proxied to IDAPI /users/me/newsletters)
 */

export const newsletterSubscriptions = {
	result: {
		htmlPreference: 'HTML',
		subscriptions: [],
		globalSubscriptionStatus: 'subscribed',
	},
	status: 'ok',
};
