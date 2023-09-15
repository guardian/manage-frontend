/*
 * Available newsletter subscriptions
 * /idapi/newsletters
 */

export const newsletters = [
	{
		id: 'today-uk',
		name: 'The Guardian Today',
		brazeNewsletterName: 'Editorial_GuardianTodayUK',
		brazeSubscribeAttributeName: 'TodayUk_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'today_uk',
		theme: 'news',
		group: 'news in brief',
		description:
			"A digest of the morning's main headlines emailed direct to you every week day",
		frequency: 'Every day',
		exactTargetListId: 4151,
		listIdv1: 37,
		listId: 4151,
		signupPage: '/info/2015/dec/08/daily-email-uk',
		emailEmbed: {
			name: 'The Guardian Today',
			title: 'Sign up for The Guardian Today',
			description:
				'Get the day’s headlines and highlights emailed direct to you every morning',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Today every day",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'today-us',
		name: 'The Guardian Today: US edition',
		brazeNewsletterName: 'Editorial_GuardianTodayUS',
		brazeSubscribeAttributeName: 'TodayUs_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'today_us',
		theme: 'news',
		group: 'news in brief',
		description:
			'For US readers, we offer a regional edition of our daily email, delivering the most important headlines every morning',
		frequency: 'Every day',
		exactTargetListId: 4152,
		listIdv1: 1493,
		listId: 4152,
		signupPage: '/info/2015/dec/08/daily-email-us',
		emailEmbed: {
			name: 'The Guardian Today: US Edition',
			title: 'Sign up for The Guardian Today: US Edition',
			description:
				'Get the most important US headlines and highlights emailed direct to you every morning',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Today US edition every day",
			hexCode: '#DCDCDC',
			imageUrl:
				'https://media.guim.co.uk/ed396def30d2e10fa0fd07f9ddf9e68d03c035f5/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/ed396def30d2e10fa0fd07f9ddf9e68d03c035f5/0_0_202_202/202.png',
		},
	},
	{
		id: 'today-au',
		name: 'The Guardian Today: Australia edition',
		brazeNewsletterName: 'Editorial_GuardianTodayAUS',
		brazeSubscribeAttributeName: 'TodayAus_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'today_aus',
		theme: 'news',
		description:
			'For our Australian readers, we offer a regional edition of our daily email, delivering the most important headlines every morning',
		frequency: 'Every day',
		exactTargetListId: 4150,
		listIdv1: 1506,
		listId: 4150,
		signupPage: '/info/2015/dec/08/daily-email-au',
		emailEmbed: {
			name: 'The Guardian Today: Australia Edition',
			title: 'Sign up for The Guardian Today: Australia Edition',
			description:
				"Get Australia's biggest headlines and highlights emailed direct to you every morning",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Today Australia edition every day",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'morning-briefing',
		name: 'Guardian Morning Briefing',
		brazeNewsletterName: 'Editorial_MorningBriefingUK',
		brazeSubscribeAttributeName: 'MorningBriefingUk_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'morning_briefing_uk',
		theme: 'news',
		group: 'news in brief',
		description:
			'Start the day one step ahead. Our email breaks down the key stories of the day and why they matter',
		frequency: 'Every weekday',
		exactTargetListId: 4156,
		listIdv1: 3640,
		listId: 4156,
		exampleUrl: '/world/series/guardian-morning-briefing/latest/email',
		signupPage:
			'/info/2016/mar/01/the-morning-briefing-start-the-day-one-step-ahead',
		emailEmbed: {
			name: 'Guardian Morning Briefing',
			title: 'Sign up for Guardian Morning Briefing',
			description:
				'Our morning email breaks down the key stories of the day, telling you what’s happening and why it matters',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Morning Briefing every weekday",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'us-morning-newsletter',
		name: 'First Thing',
		brazeNewsletterName: 'Editorial_USMorningBriefing',
		brazeSubscribeAttributeName: 'MorningBriefingUs_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'morning_briefing_us',
		theme: 'news',
		group: 'news in brief',
		description:
			'Start the day with the top stories from the US, plus the day’s must-reads from across the Guardian',
		frequency: 'Every weekday',
		exactTargetListId: 4300,
		listIdv1: -1,
		listId: 4300,
		exampleUrl: '/us-news/series/guardian-us-briefing/latest/email',
		signupPage:
			'/info/2018/sep/17/guardian-us-morning-briefing-sign-up-to-stay-informed',
		emailEmbed: {
			name: 'First Thing',
			title: 'Sign up for First Thing',
			description:
				'Our US morning briefing breaks down the key stories of the day, telling you what’s happening and why it matters',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you First Thing every weekday",
			hexCode: '#DCDCDC',
			imageUrl:
				'https://media.guim.co.uk/c1ba2b4e07f8c982de60dba4b8d93dc77965c198/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/c1ba2b4e07f8c982de60dba4b8d93dc77965c198/0_0_202_202/202.png',
		},
	},
	{
		id: 'morning-mail',
		name: "Guardian Australia's Morning Mail",
		brazeNewsletterName: 'Editorial_MorningMailAUS',
		brazeSubscribeAttributeName: 'MorningMailAus_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'morning_mail_aus',
		theme: 'news',
		group: 'news in brief',
		description:
			'Our Australian morning briefing email breaks down the key national and international stories of the day and why they matter',
		frequency: 'Every weekday',
		exactTargetListId: 4148,
		listIdv1: 2636,
		listId: 4148,
		exampleUrl:
			'/australia-news/series/guardian-australia-s-morning-mail/latest/email',
		signupPage:
			'/world/guardian-australia-morning-mail/2014/jun/24/-sp-guardian-australias-morning-mail-subscribe-by-email',
		emailEmbed: {
			name: "Guardian Australia's Morning Mail",
			title: "Sign up for Guardian Australia's Morning Mail",
			description:
				'Our Australian morning briefing breaks down the key stories of the day, telling you what’s happening and why it matters',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Australia's Morning Mail every weekday",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'tech-scape',
		name: 'TechScape',
		brazeNewsletterName: 'Editorial_TechScape',
		brazeSubscribeAttributeName: 'TechScape_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'tech_scape',
		theme: 'news',
		group: 'news in depth',
		description:
			"Alex Hern's weekly dive in to how technology is shaping our lives",
		frequency: 'Weekly',
		exactTargetListId: 6013,
		listIdv1: -1,
		listId: 6013,
		emailEmbed: {
			name: 'TechScape',
			title: 'Sign up for TechScape',
			description:
				"Alex Hern's weekly dive in to how technology is shaping our lives",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you TechScape every week",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'global-dispatch',
		name: 'Global Dispatch',
		brazeNewsletterName: 'Editorial_GlobalDispatch',
		brazeSubscribeAttributeName: 'GlobalDispatch_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'global_dispatch',
		theme: 'news',
		group: 'news in brief',
		description:
			'Get a different world view with a roundup of the best news, features and pictures, curated by our global development team',
		frequency: 'Every fortnight',
		exactTargetListId: 4146,
		listIdv1: 113,
		listId: 4146,
		signupPage:
			'/info/2017/jun/08/global-dispatch-sign-up-for-a-different-world-view',
		emailEmbed: {
			name: 'Global Dispatch',
			title: 'Sign up for Global Dispatch',
			description:
				'Get a different world view with a roundup of the best news, features and pictures, curated by our global development team',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Global Dispatch every fortnight",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'business-today',
		name: 'Business Today',
		brazeNewsletterName: 'Editorial_BusinessToday',
		brazeSubscribeAttributeName: 'BusinessToday_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'business_today',
		theme: 'news',
		group: 'news in brief',
		description:
			"Get set for the working day – we'll point you to the all the business news and analysis you need every morning",
		frequency: 'Every weekday',
		exactTargetListId: 4139,
		listIdv1: 3887,
		listId: 4139,
		signupPage:
			'/info/2017/may/16/guardian-business-today-sign-up-financial-news-email',
		emailEmbed: {
			name: 'Business Today',
			title: 'Sign up for Business Today',
			description:
				"Get set for the working day – we'll point you to the all the business news and analysis you need every morning",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Business Today every weekday",
			hexCode: '#DCDCDC',
			imageUrl:
				'https://media.guim.co.uk/fa8afd628730a41f8af37f847b27a1d56162aecb/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/fa8afd628730a41f8af37f847b27a1d56162aecb/0_0_202_202/202.png',
		},
	},
	{
		id: 'green-light',
		name: 'Down to Earth',
		brazeNewsletterName: 'Editorial_GreenLight',
		brazeSubscribeAttributeName: 'GreenLight_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'green_light',
		theme: 'news',
		group: 'news in depth',
		description:
			"The planet's most important stories. Get all the week's environment news - the good, the bad and the essential",
		frequency: 'Weekly',
		exactTargetListId: 4147,
		listIdv1: 38,
		listId: 4147,
		signupPage: '/environment/2015/oct/19/sign-up-to-the-green-light-email',
		emailEmbed: {
			name: 'Down to Earth',
			title: 'Sign up for Down to Earth',
			description:
				"The planet's most important stories. Get all the week's environment news - the good, the bad and the essential",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Down to Earth every week.",
			hexCode: '#96BE1B',
			imageUrl:
				'https://media.guim.co.uk/087d15e6cc1b9e7ead4573b177661b8df4be1680/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/087d15e6cc1b9e7ead4573b177661b8df4be1680/0_0_202_202/202.png',
		},
	},
	{
		id: 'minute-us',
		name: 'Fight to Vote',
		brazeNewsletterName: 'Editorial_TheUSPoliticsMinute',
		brazeSubscribeAttributeName: 'TheUsPoliticsMinute_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_us_politics_minute',
		theme: 'news',
		group: 'news in brief',
		description:
			'Keeping you up to date on the systemic ways voting rights are denied to so many Americans',
		frequency: 'Weekly during election season',
		exactTargetListId: 4166,
		listIdv1: 3599,
		listId: 4166,
		exampleUrl: '/us-news/series/the-campaign-minute-2016/latest/email',
		signupPage:
			'/us-news/2017/feb/22/us-politics-minute-sign-up-email-newsletter-app-notification',
		emailEmbed: {
			name: 'Fight to Vote',
			title: 'Sign up for Fight to Vote',
			description:
				'Our newsletter brings you up to speed on the most important stories every week during the 2020 election season',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Fight to Vote every week",
			hexCode: '#DCDCDC',
			imageUrl:
				'https://media.guim.co.uk/ecfbfcc1229c3c5cf2c7b328a76ffb0f0edd3199/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/ecfbfcc1229c3c5cf2c7b328a76ffb0f0edd3199/0_0_202_202/202.png',
		},
	},
	{
		id: 'australian-politics',
		name: 'Australian Politics',
		brazeNewsletterName: 'Editorial_AustralianPolitics',
		brazeSubscribeAttributeName: 'AustralianPolitics_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'australian_politics',
		theme: 'news',
		group: 'news in brief',
		description:
			'From the big, breaking news to quiet, thoughtful analysis, all you need to keep up with Australian political manoeuvres',
		frequency: 'Every weekday',
		exactTargetListId: 4135,
		listIdv1: 1866,
		listId: 4135,
		signupPage:
			'/australia-news/2014/dec/10/australian-politics-subscribe-by-email',
		emailEmbed: {
			name: 'Australian Politics',
			title: 'Sign up for Australian Politics',
			description:
				'From the big, breaking news to quiet, thoughtful analysis, all you need to keep up with Australian political manoeuvres',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Australia Politic every weekday",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'the-rural-network',
		name: 'The Rural Network',
		brazeNewsletterName: 'Editorial_TheRuralNetwork',
		brazeSubscribeAttributeName: 'TheRuralNetwork_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_rural_network',
		theme: 'news',
		group: 'news in depth',
		description:
			'Subscribe to Gabrielle Chan’s fortnightly update on Australian rural and regional affairs',
		frequency: 'Every fortnight',
		exactTargetListId: 6015,
		listIdv1: -1,
		listId: 6015,
		emailEmbed: {
			name: 'The Rural Network',
			title: 'Sign up for The Rural Network',
			description:
				'Subscribe to Gabrielle Chan’s fortnightly update on Australian rural and regional affairs',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Rural Network every fortnight",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'documentaries',
		name: 'Guardian Documentaries',
		brazeNewsletterName: 'Editorial_GuardianDocumentaries',
		brazeSubscribeAttributeName: 'GuardianDocumentaries_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'guardian_documentaries',
		theme: 'features',
		group: 'features',
		description:
			'Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world',
		frequency: 'Whenever a new film is available',
		exactTargetListId: 4149,
		listIdv1: 3745,
		listId: 4149,
		exampleUrl: '/news/series/guardian-documentaries-update/latest/email',
		signupPage:
			'/info/2016/sep/02/sign-up-for-the-guardian-documentaries-update',
		emailEmbed: {
			name: 'Guardian Documentaries',
			title: 'Sign up for Guardian Documentaries',
			description:
				'Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Documentaries whenever a new film is available",
			hexCode: '#EACCA0',
		},
	},
	{
		id: 'the-long-read',
		name: 'The Long Read',
		brazeNewsletterName: 'Editorial_TheLongRead',
		brazeSubscribeAttributeName: 'TheLongRead_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_long_read',
		theme: 'features',
		group: 'features',
		description:
			'Lose yourself in a great story: from politics to psychology, food to technology, culture to crime',
		frequency: 'Weekly',
		exactTargetListId: 4165,
		listIdv1: 3322,
		listId: 4165,
		signupPage: '/news/2015/jul/20/sign-up-to-the-long-read-email',
		emailEmbed: {
			name: 'The Long Read',
			title: 'Sign up for The Long Read',
			description:
				'Lose yourself in a great story: from politics to psychology, food to technology, culture to crime',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Long Read every week",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'animals-farmed',
		name: 'Animals farmed',
		brazeNewsletterName: 'Editorial_AnimalsFarmed',
		brazeSubscribeAttributeName: 'AnimalsFarmed_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'animals_farmed',
		theme: 'features',
		group: 'features',
		description:
			'Get a round-up of the best farming and food stories across the world and keep up with our investigation as we track the impact intensive practices and meet those offering sustainable solutions to feed us all.',
		frequency: 'Monthly',
		exactTargetListId: 4222,
		listIdv1: -1,
		listId: 4222,
		exampleUrl: '/animals-farmed/series/animals-farmed-update/latest/email',
		signupPage:
			'/animals-farmed/2018/feb/21/animals-farmed-join-us-for-monthly-updates-newsletter-updates',
		emailEmbed: {
			name: 'Animals farmed',
			title: 'Sign up for Animals farmed',
			description:
				'Keep up with our investigations on the impact of intensive farming and sustainable solutions to feed us all',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Animals Farmed every week",
			hexCode: '#58D08B',
		},
	},
	{
		id: 'her-stage',
		name: 'Her Stage',
		brazeNewsletterName: 'Editorial_HerStage',
		brazeSubscribeAttributeName: 'HerStage_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'her_stage',
		theme: 'features',
		group: 'features',
		description:
			' Hear directly from incredible women from around the world on the issues that matter most to them – from the climate crisis to the arts to sport',
		frequency: 'Monthly',
		exactTargetListId: 6018,
		listIdv1: -1,
		listId: 6018,
		emailEmbed: {
			name: 'Her Stage',
			title: 'Sign up for Her Stage',
			description:
				' Hear directly from incredible women from around the world on the issues that matter most to them – from the climate crisis to the arts to sport',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription: 'Thanks for subscribing!',
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'tokyo-2020-daily-briefing',
		name: 'Winter Olympics 2022 Daily Briefing',
		brazeNewsletterName: 'Editorial_Tokyo2020DailyBriefing',
		brazeSubscribeAttributeName: 'Tokyo2020DailyBriefing_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'tokyo_2020_daily_briefing',
		theme: 'sport',
		group: 'sport',
		description:
			'Our daily email briefing will help you keep up with all the goings on at the Olympics',
		frequency: 'Daily',
		exactTargetListId: 6014,
		listIdv1: -1,
		listId: 6014,
		emailEmbed: {
			name: 'Winter Olympics 2022 Daily Briefing',
			title: 'Sign up for Winter Olympics 2022 Daily Briefing',
			description:
				'Our daily email briefing will help you keep up with all the goings on at the Olympics',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Winter Olympics 2022 Daily Briefing every day",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'the-recap',
		name: 'The Recap',
		brazeNewsletterName: 'Editorial_TheRecap',
		brazeSubscribeAttributeName: 'TheRecap_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_recap',
		theme: 'sport',
		group: 'sport',
		description:
			'The best of our sports journalism from the past seven days and a heads-up on the weekend’s action',
		frequency: 'Weekly',
		exactTargetListId: 4167,
		listIdv1: 3888,
		listId: 4167,
		signupPage:
			'/sport/2017/may/15/the-recap-sign-up-for-the-best-of-the-guardians-sport-coverage',
		emailEmbed: {
			name: 'The Recap',
			title: 'Sign up for The Recap',
			description:
				'The best of our sports journalism from the past seven days and a heads-up on the weekend’s action',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Recap every week",
			hexCode: '#90DCFF',
			imageUrl:
				'https://media.guim.co.uk/48b50d8312fbd1bad7250e3c82e0acacc012ce8e/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/48b50d8312fbd1bad7250e3c82e0acacc012ce8e/0_0_202_202/202.png',
		},
	},
	{
		id: 'the-fiver',
		name: 'The Fiver',
		brazeNewsletterName: 'Editorial_TheFiver',
		brazeSubscribeAttributeName: 'TheFiver_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_fiver',
		theme: 'sport',
		group: 'sport',
		description:
			"Kick off your evenings with the Guardian's take on the world of football",
		frequency: 'Every weekday',
		exactTargetListId: 4163,
		listIdv1: 218,
		listId: 4163,
		exampleUrl: '/football/series/thefiver/latest/email',
		signupPage: '/info/2016/jan/05/the-fiver-email-sign-up',
		emailEmbed: {
			name: 'The Fiver',
			title: 'Sign up for The Fiver',
			description:
				"Kick off your evenings with the Guardian's take on the world of football",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Fiver every weekday",
			hexCode: '#90DCFF',
			imageUrl:
				'https://media.guim.co.uk/706bb2d5b02bb7e7a9f90739240448d6afbcb4cb/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/706bb2d5b02bb7e7a9f90739240448d6afbcb4cb/0_0_202_202/202.png',
		},
	},
	{
		id: 'the-breakdown',
		name: 'The Breakdown',
		brazeNewsletterName: 'Editorial_TheBreakdown',
		brazeSubscribeAttributeName: 'TheBreakdown_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_breakdown',
		theme: 'sport',
		group: 'sport',
		description:
			"The latest rugby union news and analysis, plus all the week's action reviewed",
		frequency: 'Weekly',
		exactTargetListId: 4138,
		listIdv1: 219,
		listId: 4138,
		exampleUrl: '/sport/series/breakdown/latest/email',
		signupPage: '/sport/2016/aug/18/sign-up-to-the-breakdown',
		emailEmbed: {
			name: 'The Breakdown',
			title: 'Sign up for The Breakdown',
			description:
				"The latest rugby union news and analysis, plus all the week's action reviewed",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Breakdown every week",
			hexCode: '#90DCFF',
			imageUrl:
				'https://media.guim.co.uk/376f0deed4356a8e581f591220eb09525ef82ca1/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/376f0deed4356a8e581f591220eb09525ef82ca1/0_0_202_202/202.png',
		},
	},
	{
		id: 'the-spin',
		name: 'The Spin',
		brazeNewsletterName: 'Editorial_TheSpin',
		brazeSubscribeAttributeName: 'TheSpin_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_spin',
		theme: 'sport',
		group: 'sport',
		description:
			"Subscribe to our cricket newsletter for our writers' thoughts on the biggest stories and a review of the week’s action",
		frequency: 'Weekly',
		exactTargetListId: 4169,
		listIdv1: 220,
		listId: 4169,
		exampleUrl: '/sport/series/thespin/latest/email',
		signupPage: '/sport/2016/aug/18/sign-up-to-the-spin',
		emailEmbed: {
			name: 'The Spin',
			title: 'Sign up for The Spin',
			description:
				"Subscribe to our cricket newsletter for our writers' thoughts on the biggest stories and a review of the week’s action",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Spin every week",
			hexCode: '#90DCFF',
			imageUrl:
				'https://media.guim.co.uk/07895f840b353e61b7659656a4c822242397528a/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/07895f840b353e61b7659656a4c822242397528a/0_0_202_202/202.png',
		},
	},
	{
		id: 'sports-au',
		name: 'Guardian Australia Sport',
		brazeNewsletterName: 'Editorial_GuardianAustraliaSports',
		brazeSubscribeAttributeName: 'GuardianAustraliaSports_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'guardian_australia_sports',
		theme: 'sport',
		group: 'sport',
		description:
			'Get a daily roundup of the latest sports news, features and comment from our Australian sports desk',
		frequency: 'Every day',
		exactTargetListId: 4136,
		listIdv1: 3766,
		listId: 4136,
		signupPage:
			'/info/2015/jun/05/guardian-australia-sport-newsletter-subscribe-by-email',
		emailEmbed: {
			name: 'Guardian Australia Sport',
			title: 'Sign up for Guardian Australia Sport',
			description:
				'Get a daily roundup of the latest sports news, features and comment from our Australian sports desk',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Guardian Australia Sport every day",
			hexCode: '#90DCFF',
			imageUrl:
				'https://media.guim.co.uk/5d0f455e8ad79615f55ca4b2e04843e730ef0330/0_0_202_202/202.png',
		},
		illustration: {
			circle: 'https://media.guim.co.uk/5d0f455e8ad79615f55ca4b2e04843e730ef0330/0_0_202_202/202.png',
		},
	},
	{
		id: 'sleeve-notes',
		name: 'Sleeve Notes',
		brazeNewsletterName: 'Editorial_SleeveNotes',
		brazeSubscribeAttributeName: 'SleeveNotes_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'sleeve_notes',
		theme: 'culture',
		group: 'culture',
		description:
			'Get music news, bold reviews and unexpected extras. Every genre, every era, every week',
		frequency: 'Weekly',
		exactTargetListId: 4159,
		listIdv1: 39,
		listId: 4159,
		signupPage:
			'/info/ng-interactive/2017/mar/06/sign-up-for-the-sleeve-notes-email',
		emailEmbed: {
			name: 'Sleeve Notes',
			title: 'Sign up for Sleeve Notes',
			description:
				'Get music news, bold reviews and unexpected extras. Every genre, every era, every week',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Sleeve Notes every week",
			hexCode: '#90DCFF',
		},
	},
	{
		id: 'film-today',
		name: 'Film Weekly',
		brazeNewsletterName: 'Editorial_FilmToday',
		brazeSubscribeAttributeName: 'FilmToday_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'film_today',
		theme: 'culture',
		group: 'culture',
		description:
			'Take a front seat at the cinema with our weekly email filled with all the latest news and all the movie action that matters',
		frequency: 'Every week',
		exactTargetListId: 4144,
		listIdv1: 1950,
		listId: 4144,
		signupPage: '/info/2016/feb/12/film-today-email-sign-up',
		emailEmbed: {
			name: 'Film Weekly',
			title: 'Sign up for Film Weekly',
			description:
				'Take a front seat at the cinema with our weekly email filled with all the latest news and all the movie action that matters',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Film Weekly every Friday",
			hexCode: '#EACCA0',
		},
	},
	{
		id: 'bookmarks',
		name: 'Bookmarks',
		brazeNewsletterName: 'Editorial_Bookmarks',
		brazeSubscribeAttributeName: 'Bookmarks_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'bookmarks',
		theme: 'culture',
		group: 'culture',
		description:
			'Discover new books with our expert reviews, author interviews and top 10s. Literary delights delivered direct you',
		frequency: 'Weekly',
		exactTargetListId: 4137,
		listIdv1: 3039,
		listId: 4137,
		signupPage: '/books/2015/feb/03/sign-up-to-our-bookmarks-email',
		emailEmbed: {
			name: 'Bookmarks',
			title: 'Sign up for Bookmarks',
			description:
				'Discover new books with our expert reviews, author interviews and top 10s. Literary delights delivered direct you',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Bookmarks every week",
			hexCode: '#EACCA0',
		},
	},
	{
		id: 'art-weekly',
		name: 'Art Weekly',
		brazeNewsletterName: 'Editorial_ArtWeekly',
		brazeSubscribeAttributeName: 'ArtWeekly_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'art_weekly',
		theme: 'culture',
		group: 'culture',
		description:
			'Your weekly art world round-up, sketching out all the biggest stories, scandals and exhibitions',
		frequency: 'Weekly',
		exactTargetListId: 4134,
		listIdv1: 99,
		listId: 4134,
		exampleUrl: '/artanddesign/series/art-weekly/latest/email',
		signupPage: '/artanddesign/2015/oct/19/sign-up-to-the-art-weekly-email',
		emailEmbed: {
			name: 'Art Weekly',
			title: 'Sign up for Art Weekly',
			description:
				'Your weekly art world round-up, sketching out all the biggest stories, scandals and exhibitions',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Art Weekly every week",
			hexCode: '#EACCA0',
		},
	},
	{
		id: 'hear-here',
		name: 'Hear Here',
		brazeNewsletterName: 'Editorial_HearHere',
		brazeSubscribeAttributeName: 'HearHere_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'hear_here',
		theme: 'culture',
		group: 'culture',
		description:
			"Podcast recommendations for unexpected audio pleasures. Our reviewers and audio producers pick the week's top shows",
		frequency: 'Weekly',
		exactTargetListId: 4104,
		listIdv1: 3889,
		listId: 4104,
		exampleUrl: '/tv-and-radio/series/hear-here/latest/email',
		signupPage:
			'/info/2017/may/10/hear-here-podcast-recommendations-sign-up-for-unexpected-audio-pleasures',
		emailEmbed: {
			name: 'Hear Here',
			title: 'Sign up for Hear Here',
			description:
				"Podcast recommendations for unexpected audio pleasures. Our reviewers and audio producers pick the week's top shows",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Hear Here every week",
			hexCode: '#EACCA0',
		},
	},
	{
		id: 'pushing-buttons',
		name: 'Pushing Buttons',
		brazeNewsletterName: 'Editorial_PushingButtons',
		brazeSubscribeAttributeName: 'PushingButtons_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'pushing_buttons',
		theme: 'culture',
		group: 'culture',
		description: "Keza MacDonald's weekly look at the world of gaming",
		frequency: 'Weekly',
		exactTargetListId: 6017,
		listIdv1: -1,
		listId: 6017,
		emailEmbed: {
			name: 'Pushing Buttons',
			title: 'Sign up for Pushing Buttons',
			description: "Keza MacDonald's weekly look at the world of gaming",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription: 'Thanks for subscribing!',
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'design-review',
		name: 'Design Review',
		brazeNewsletterName: 'Editorial_DesignReview',
		brazeSubscribeAttributeName: 'DesignReview_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'design_review',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			'Get a dose of creative inspiration. Expect original, sustainable ideas and reflection from designers and crafters, along with clever, beautiful products for smarter living',
		frequency: 'Monthly',
		exactTargetListId: 6010,
		listIdv1: -1,
		listId: 6010,
		signupPage:
			'/lifeandstyle/2020/sep/09/design-review-get-the-newsletter-for-the-way-we-live-now',
		emailEmbed: {
			name: 'Design Review',
			title: 'Sign up for Design Review',
			description:
				'Original, sustainable ideas and reflection from designers and crafters, plus clever, beautiful products for smarter living',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Design Review every month",
			hexCode: '#FEC8D3',
		},
	},
	{
		id: 'fashion-statement',
		name: 'Fashion Statement',
		brazeNewsletterName: 'Editorial_FashionStatement',
		brazeSubscribeAttributeName: 'FashionStatement_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'fashion_statement',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			'Style with substance: smart fashion writing and inspiring shopping galleries - expect both expertise and irreverence',
		frequency: 'Weekly',
		exactTargetListId: 4143,
		listIdv1: 105,
		listId: 4143,
		signupPage:
			'/fashion/2016/aug/18/sign-up-for-the-guardians-fashion-email',
		emailEmbed: {
			name: 'Fashion Statement',
			title: 'Sign up for Fashion Statement',
			description:
				'Style with substance: smart fashion writing and inspiring shopping galleries - expect both expertise and irreverence',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Fashion Statement every week",
			hexCode: '#FEC8D3',
		},
	},
	{
		id: 'the-guide-staying-in',
		name: 'The Guide',
		brazeNewsletterName: 'Editorial_TheGuideStayingIn',
		brazeSubscribeAttributeName: 'TheGuideStayingIn_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_guide_staying_in',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			'Home entertainment tips delivered straight to your sofa. The best TV and box sets, games, podcasts, books and more',
		frequency: 'Weekly',
		exactTargetListId: 6006,
		listIdv1: -1,
		listId: 6006,
		signupPage:
			'/info/2020/mar/25/the-guide-staying-in-sign-up-for-our-home-entertainment-tips',
		emailEmbed: {
			name: 'The Guide',
			title: 'Sign up for The Guide',
			description:
				'Home entertainment tips delivered straight to your sofa. The best TV and box sets, games, podcasts, books and more',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Guide every week",
			hexCode: '#FEC8D3',
		},
	},
	{
		id: 'saved-for-later',
		name: 'Saved for Later',
		brazeNewsletterName: 'Editorial_SavedForLater',
		brazeSubscribeAttributeName: 'SavedForLater_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'saved_for_later',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			"Catch up on the fun stuff with Guardian Australia's culture and lifestyle rundown of pop culture, trends and tips",
		frequency: 'Weekly',
		exactTargetListId: 6003,
		listIdv1: -1,
		listId: 6003,
		signupPage:
			'/newsletters/2019/oct/18/saved-for-later-sign-up-for-guardian-australias-culture-and-lifestyle-email',
		emailEmbed: {
			name: 'Saved for Later',
			title: 'Sign up for Saved for Later',
			description:
				"Catch up on the fun stuff with Guardian Australia's culture and lifestyle rundown of pop culture, trends and tips",
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Saved for Later every week",
			hexCode: '#FEC8D3',
		},
	},
	{
		id: 'five-great-reads',
		name: 'Five Great Reads',
		brazeNewsletterName: 'Editorial_FiveGreatReads',
		brazeSubscribeAttributeName: 'FiveGreatReads_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'five_great_reads',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			'During the holiday season Lifestyle editor Alyx Gorman will do the heavy lifting for you and list five of the most interesting, entertaining, and thoughtful reads. Sign up and receive it in your inbox from Monday to Friday.',
		frequency: 'Monday to Friday',
		exactTargetListId: 6019,
		listIdv1: -1,
		listId: 6019,
		emailEmbed: {
			name: 'Five Great Reads',
			title: 'Sign up for Five Great Reads',
			description:
				'During the holiday season Lifestyle editor Alyx Gorman will do the heavy lifting for you and list five of the most interesting, entertaining, and thoughtful reads. Sign up and receive it in your inbox from Monday to Friday.',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription: 'Thanks for subscribing!',
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'word-of-mouth',
		name: 'Word of Mouth',
		brazeNewsletterName: 'Editorial_WordOfMouth',
		brazeSubscribeAttributeName: 'WordOfMouth_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'word_of_mouth',
		theme: 'lifestyle',
		group: 'lifestyle',
		description:
			'Recipes from all our star cooks, seasonal eating ideas and restaurant reviews. Get our best food writing every week',
		frequency: 'Weekly',
		exactTargetListId: 6002,
		listIdv1: -1,
		listId: 6002,
		signupPage:
			'/food/2019/jul/09/sign-up-for-word-of-mouth-the-best-of-guardian-food-every-week',
		emailEmbed: {
			name: 'Word of Mouth',
			title: 'Sign up for Word of Mouth',
			description:
				'Recipes from all our star cooks, seasonal eating ideas and restaurant reviews. Get our best food writing every week',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Word of Mouth every week",
			hexCode: '#FEC8D3',
		},
	},
	{
		id: 'best-of-opinion',
		name: 'The Best of Guardian Opinion',
		brazeNewsletterName: 'Editorial_BestOfGuardianOpinionUK',
		brazeSubscribeAttributeName: 'BestOfGuardianOpinionUK_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'best_of_guardian_opinion_uk',
		theme: 'comment',
		group: 'opinion',
		description:
			'Get out of your bubble. Sign up for our daily selection of opinion pieces and and see things from another point of view',
		frequency: 'Every weekday',
		exactTargetListId: 4161,
		listIdv1: 2313,
		listId: 4161,
		signupPage: '/commentisfree/2014/jan/29/comment-is-free-daily-roundup',
		emailEmbed: {
			name: 'Best of Guardian Opinion',
			title: 'Sign up for the best of Guardian Opinion',
			description:
				'See things from another point of view with our daily selection of opinion pieces. You might even change your mind',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you the best of Guardian Opinion every weekday",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'this-is-europe',
		name: 'This is Europe',
		brazeNewsletterName: 'Editorial_ThisIsEurope',
		brazeSubscribeAttributeName: 'ThisIsEurope_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'this_is_europe',
		theme: 'comment',
		group: 'opinion',
		description:
			'The most pivotal stories and debates for Europeans – from identity to economics to the environment',
		frequency: 'Weekly',
		exactTargetListId: 4234,
		listIdv1: -1,
		listId: 4234,
		signupPage:
			'/commentisfree/2018/mar/22/this-is-europe-sign-up-guardian-email-updates',
		emailEmbed: {
			name: 'This is Europe',
			title: 'Sign up for This is Europe',
			description:
				'The most pressing stories and debates for Europeans – from identity to economics to the environment',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you This is Europe every week",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'best-of-opinion-us',
		name: 'The Best of Guardian Opinion: US edition',
		brazeNewsletterName: 'Editorial_BestOfGuardianOpinionUS',
		brazeSubscribeAttributeName: 'BestOfGuardianOpinionUS_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'best_of_guardian_opinion_us',
		theme: 'comment',
		group: 'opinion',
		description:
			"Join the debate on America's most pressing issues with the US edition of our daily op-ed selection",
		frequency: 'Every weekday',
		exactTargetListId: 4162,
		listIdv1: 3228,
		listId: 4162,
		signupPage:
			'/commentisfree/2015/may/11/sign-up-for-the-best-of-opinion-us-daily-email',
		emailEmbed: {
			name: 'Best of Guardian Opinion US Edition',
			title: 'Sign up for the best of Guardian Opinion US edition',
			description:
				'See things from another point of view with our daily selection of US op-ed pieces. You might even change your mind',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you the best of Guardian Opinion US edition every weekday",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'patriarchy',
		name: 'The Week in Patriarchy',
		brazeNewsletterName: 'Editorial_TheWeekInPatriarchy',
		brazeSubscribeAttributeName: 'TheWeekInPatriarchy_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_week_in_patriarchy',
		theme: 'comment',
		group: 'opinion',
		description:
			'Reviewing the most important stories on feminism and sexism and those fighting for equality',
		frequency: 'Weekly',
		exactTargetListId: 4170,
		listIdv1: 3820,
		listId: 4170,
		exampleUrl: '/commentisfree/series/the-week-in-patriarchy/latest/email',
		signupPage:
			'/info/2017/jan/19/this-week-in-the-patriarchy-jessica-valenti-email',
		emailEmbed: {
			name: 'The Week in Patriarchy',
			title: 'Sign up for The Week in Patriarchy',
			description:
				'Get a weekly recap of the most important stories on feminism and sexism and those fighting for equality',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you The Week in Patriarchy every week",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'best-of-opinion-au',
		name: 'The Best of Guardian Opinion: Australia edition',
		brazeNewsletterName: 'Editorial_BestOfGuardianOpinionAUS',
		brazeSubscribeAttributeName: 'BestOfGuardianOpinionAus_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'best_of_guardian_opinion_aus',
		theme: 'comment',
		group: 'opinion',
		description:
			'Challenge your own perceptions with a daily selection of the opinion pieces from Australia',
		frequency: 'Every weekday',
		exactTargetListId: 4160,
		listIdv1: 2976,
		listId: 4160,
		signupPage:
			'/commentisfree/2014/dec/04/best-of-comment-is-free-australia-subscribe-by-email',
		emailEmbed: {
			name: 'Best of Guardian Opinion Australia Edition',
			title: 'Sign up for the best of Guardian Opinion Australia edition',
			description:
				'See things from another point of view with our daily opinion email for Australia. You might even change your mind',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you the best of Guardian Opinion Australia edition every weekday",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'first-dog',
		name: 'First Dog on the Moon',
		brazeNewsletterName: 'Editorial_FirstDogOnTheMoon',
		brazeSubscribeAttributeName: 'FirstDogOnTheMoon_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'first_dog_on_the_moon',
		theme: 'comment',
		group: 'opinion',
		description:
			'Get an email alert whenever a new First Dog on the Moon cartoon is published by Guardian Australia',
		frequency: 'About three times a week',
		exactTargetListId: 4145,
		listIdv1: 2635,
		listId: 4145,
		signupPage:
			'/commentisfree/2014/jun/16/-sp-first-dog-on-the-moon-subscribe-by-email',
		emailEmbed: {
			name: 'First Dog on the Moon',
			title: 'Sign up for First Dog on the Moon',
			description:
				'Get an email alert whenever a new First Dog on the Moon cartoon is published',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you First Dog on the Moon whenever a new cartoon is published",
			hexCode: '#F9B376',
		},
	},
	{
		id: 'inside-saturday',
		name: 'Inside Saturday',
		brazeNewsletterName: 'Editorial_InsideSaturday',
		brazeSubscribeAttributeName: 'InsideSaturday_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'inside_saturday',
		theme: 'From the papers',
		group: 'From the papers',
		description:
			'The only way to get a look behind the scenes of our brand new magazine, Saturday. Sign up to get the inside story from our top writers as well as all the must-read articles and columns, delivered to your inbox every weekend.',
		frequency: 'Weekly',
		exactTargetListId: 6016,
		listIdv1: -1,
		listId: 6016,
		signupPage: '/info/ng-interactive/2021/sep/14/inside-saturday-sign-up',
		emailEmbed: {
			name: 'Inside Saturday',
			title: 'Sign up for Inside Saturday',
			description:
				'The only way to get a look behind the scenes of our brand new magazine, Saturday. Sign up to get the inside story from our top writers as well as all the must-read articles and columns, delivered to your inbox every weekend.',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Inside Saturday every weekend",
			hexCode: '#DCDCDC',
		},
	},
	{
		id: 'observer-food',
		name: 'The Observer Food Monthly',
		brazeNewsletterName: 'Editorial_OFM',
		brazeSubscribeAttributeName: 'TheObserverFoodMonthly_Subscribe_Email',
		brazeSubscribeEventNamePrefix: 'the_observer_food_monthly',
		theme: 'From the papers',
		group: 'From the papers',
		description:
			'Find out what’s coming up in the latest edition of the magazine plus our favourite food and drink tips',
		frequency: 'Monthly',
		exactTargetListId: 4157,
		listIdv1: 248,
		listId: 4157,
		signupPage:
			'/lifeandstyle/2015/oct/19/observer-food-monthly-newsletter',
		emailEmbed: {
			name: 'The Observer Food Monthly',
			title: 'Sign up for The Observer Food Monthly',
			description:
				'Find out what’s coming up in the latest edition of the magazine plus our favourite food and drink tips',
			successHeadline:
				'Check your email inbox and confirm your subscription',
			successDescription:
				"Thanks for subscribing. We'll send you Observer Food Monthly every month",
			hexCode: '#F9B376',
		},
	},
];
