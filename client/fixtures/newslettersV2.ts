/*
 * Available newsletter subscriptions from /idapi/newsletters (proxied from Identity /newsletters-v2)
 */

export const newslettersV2 = [
	{
		id: 'morning-briefing-uk',
		name: 'Morning Briefing',
		status: 'live',
		brazeNewsletterName: 'Editorial_MorningBriefing',
		brazeSubscribeAttributeName: 'morning_briefing_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'morning_briefing',
		theme: 'news',
		group: 'News',
		frequency: 'Every weekday',
		exactTargetListId: 4151,
		listId: 4151,
		exampleUrl:
			'https://www.theguardian.com/world/series/guardian-morning-briefing/latest/email',
		signupPage:
			'https://www.theguardian.com/global/2022/sep/20/sign-up-for-the-morning-briefing',
		restricted: false,
		signUpEmbedDescription:
			'Start your day with the top stories from the Guardian.',
		signUpDescription:
			'Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning.',
		mailSuccessDescription: "We'll send you Morning Briefing every weekday",
		regionFocus: 'UK',
		illustrationCircle: 'https://media.guim.co.uk/abc123/circle.png',
		seriesTag: 'world/series/guardian-morning-briefing',
		category: 'article-based',
		emailConfirmation: false,
	},
	{
		id: 'first-edition-uk',
		name: 'First Edition',
		status: 'live',
		brazeNewsletterName: 'Editorial_FirstEdition',
		brazeSubscribeAttributeName: 'first_edition_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'first_edition',
		theme: 'news',
		group: 'News',
		frequency: 'Every weekday',
		exactTargetListId: 4156,
		listId: 4156,
		exampleUrl:
			'https://www.theguardian.com/world/series/first-edition/latest/email',
		signupPage:
			'https://www.theguardian.com/global/2022/sep/20/sign-up-for-first-edition',
		restricted: false,
		signUpEmbedDescription:
			'Our morning email breaking down the key stories of the day.',
		signUpDescription:
			"Receive an overview of the top stories we'll be covering that day, and get our most-read stories from the last 24 hours.",
		mailSuccessDescription: "We'll send you First Edition every weekday",
		regionFocus: null,
		illustrationCircle: null,
		seriesTag: 'world/series/first-edition',
		category: 'article-based',
		emailConfirmation: false,
	},
	{
		id: 'moving-the-goalposts',
		name: 'Moving the Goalposts',
		status: 'paused',
		brazeNewsletterName: 'Editorial_MovingTheGoalposts',
		brazeSubscribeAttributeName: 'moving_the_goalposts_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'moving_the_goalposts',
		theme: 'sport',
		group: 'Sport',
		frequency: 'Twice a week',
		exactTargetListId: 4120,
		listId: 4120,
		exampleUrl: null,
		signupPage:
			'https://www.theguardian.com/football/2016/aug/18/sign-up-moving-the-goalposts',
		restricted: false,
		signUpEmbedDescription: "Covering women's football across the world.",
		signUpDescription:
			"The twice-weekly Guardian newsletter dedicated to the growing world of women's football.",
		mailSuccessDescription: null,
		regionFocus: null,
		illustrationCircle: null,
		seriesTag: null,
		category: 'manual-send',
		emailConfirmation: false,
	},
];
