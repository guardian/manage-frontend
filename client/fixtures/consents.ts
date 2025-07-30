/*
 * List of consents available to a user (does not require authentication)
 * /idapi/consents (proxied to IDAPI /consents?filter=all)
 */

export const consents = [
	{
		id: 'your_support_onboarding',
		isOptOut: false,
		isChannel: false,
		isProduct: true,
		name: 'Your subscription/support',
		description:
			'Helpful information on how to access and make the most of your subscription.',
	},
	{
		id: 'sms',
		isOptOut: false,
		isChannel: true,
		isProduct: false,
		name: 'SMS',
		description:
			"I would like to receive updates about the Guardian products and services I've selected above by SMS (text messages).",
	},
	{
		id: 'digital_subscriber_preview',
		isOptOut: false,
		isChannel: false,
		isProduct: true,
		name: 'Digital subscriber preview',
		description:
			'Our highlights from this coming weekend to enjoy digitally across our apps and website, exclusively for subscribers.',
	},
	{
		id: 'offers',
		isOptOut: false,
		isChannel: false,
		isProduct: false,
		name: 'Trusted Partners',
		description:
			"Offers and competitions from the Guardian's carefully selected and trusted partners that we think you might like, such as Glastonbury competitions and charity appeals.",
	},
	{
		id: 'supporter_newsletter',
		isOptOut: false,
		isChannel: false,
		isProduct: true,
		name: 'Supporter newsletter',
		description:
			'Our regular newsletter written by the membership editor, exclusively for subscribers and supporters.',
	},
	{
		id: 'events',
		isOptOut: false,
		isChannel: false,
		isProduct: false,
		name: 'Events & Masterclasses',
		description:
			'Receive weekly newsletters about our upcoming Live events and Masterclasses. Interact with leading minds and nourish your curiosity in our immersive online events, available worldwide.',
	},
	{
		id: 'similar_guardian_products',
		isOptOut: false,
		isChannel: false,
		isProduct: false,
		name: 'Similar Guardian products',
		description:
			'Information on our products and ways to support and enjoy our independent journalism.',
	},
	{
		id: 'market_research_optout',
		isOptOut: true,
		isChannel: false,
		isProduct: false,
		name: 'Allow the Guardian to contact me for market research purposes',
		description:
			'From time to time we may contact you for market research purposes inviting you to complete a survey, or take part in a group discussion. Normally, this invitation would be sent via email, but we may also contact you by phone.',
	},
	{
		id: 'post_optout',
		isOptOut: true,
		isChannel: false,
		isProduct: false,
		name: 'Allow the Guardian to send communications by post',
	},
	{
		id: 'profiling_optout',
		isOptOut: true,
		isChannel: false,
		isProduct: false,
		name: 'Allow the Guardian to analyse this data to improve marketing content',
	},
	{
		id: 'phone_optout',
		isOptOut: true,
		isChannel: true,
		isProduct: false,
		name: 'Allow the Guardian to send communications by telephone',
	},
	{
		id: 'personalised_advertising',
		isOptOut: false,
		isChannel: false,
		isProduct: false,
		name: 'Allow personalised advertising using this data',
	},
	{
		id: 'jobs',
		isOptOut: false,
		isChannel: false,
		isProduct: false,
		name: 'Jobs',
		description:
			'Receive weekly newsletters with our latest jobs listings, as well as tips and advice from Guardian Jobs on taking your next career step.',
	},
	{
		id: 'guardian_weekly_newsletter',
		isOptOut: false,
		isChannel: false,
		isProduct: true,
		name: 'Guardian Weekly newsletter',
		description:
			"Our weekly newsletter written by the editor including what's coming up in this week's Guardian Weekly, exclusively for subscribers.",
	},
	{
		id: 'subscriber_preview',
		isOptOut: false,
		isChannel: false,
		isProduct: true,
		name: 'Subscriber preview',
		description:
			'Our highlights from this coming weekend to enjoy in your newspaper, exclusively for subscribers.',
	},
];
