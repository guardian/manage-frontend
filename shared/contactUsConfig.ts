import type { Topic } from './contactUsTypes';

export const contactUsConfig: Topic[] = [
	{
		id: 'delivery',
		name: 'Delivery',
		enquiryLabel: 'your delivery',
		subTopicsTitle:
			'Step 1: Help us understand what you need to talk about',
		subtopics: [
			{
				id: 's1',
				name: 'I’m going on holiday and need to pause deliveries',
				selfServiceBox: {
					text: [
						'Did you know you can suspend your subscription online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's2',
				name: 'I need to report a problem with my delivery',
				selfServiceBox: {
					text: [
						'Did you know you can report your delivery problem by logging in below and selecting ‘Manage Subscription’? It’s easy to do and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's3',
				name: 'I need to update my delivery details',
				selfServiceBox: {
					text: [
						'Did you know you can update your details online by logging in below and selecting ‘Manage Subscription’? It’s easy to do and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's4',
				name: 'Something else',
				editableSubject: true,
			},
		],
	},
	{
		id: 'billing',
		name: 'My Billing',
		enquiryLabel: 'your billing query',
		subTopicsTitle:
			'Step 1: Help us understand what you need to talk about',
		subtopics: [
			{
				id: 's5',
				name: 'I want to update my payment details',
				selfServiceBox: {
					text: [
						'Did you know you can update your payment details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's6',
				name: 'My payment has failed',
				selfServiceBox: {
					text: [
						'There might be something wrong with your payment details. Did you know you can check these online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's7',
				name: 'I would like to see my invoices and payments',
				selfServiceBox: {
					text: [
						'Did you know you can view your invoices below by logging in below and navigating to the billing tab? It’s easy to use and means you don’t have to wait for a response.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's8',
				name: 'I would like to cancel my payment',
				noForm: true,
				selfServiceBox: {
					text: [
						'Did you know you can cancel by logging in below and selecting ‘Manage my subscription/membership/recurring contribution? It’s easy to use and means you don’t have to wait for a response.',
						'If you still want to contact us, please contact our Customer Service team. You can find the contact details for your region below.',
					],
					linkText: 'Go to your account',
					href: '/',
				},
			},
			{
				id: 's9',
				name: 'Something else',
				editableSubject: true,
			},
		],
	},
	{
		id: 'vouchers',
		name: 'My Newspaper Vouchers',
		enquiryLabel: 'your newspaper vouchers',
		subTopicsTitle:
			'Step 1: Help us understand what you need to talk about',
		subtopics: [
			{
				id: 's10',
				name: 'I’ve lost my vouchers',
			},
			{
				id: 's11',
				name: 'Something else',
				editableSubject: true,
			},
		],
	},
	{
		id: 'account',
		name: 'My Account',
		enquiryLabel: 'your account',
		subTopicsTitle: 'Step 1: What kind of account do you have with us?',
		subtopics: [
			{
				id: 's12',
				name: 'Guardian account',
				subsubTopicsTitle:
					'Step 2: Help us understand what you need to talk about',
				subsubtopics: [
					{
						id: 'ss1',
						name: 'I don’t remember what email I use to sign in with',
					},
					{
						id: 'ss2',
						name: 'I forgot my password',
						selfServiceBox: {
							text: [
								'Did you know you can update your password online using the button below? It’s easy to use and means you don’t have to wait for a response.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss3',
						name: 'I need to update my account details',
						selfServiceBox: {
							text: [
								'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss4',
						name: 'I want to delete my account',
						selfServiceBox: {
							text: [
								'Did you know you can delete your account by logging in below’? It’s easy to use and means you don’t have to wait for a response. Please note that if you have an active subscription or recurring contribution you will need to cancel that first.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss5',
						name: 'Something else',
						editableSubject: true,
					},
				],
			},
			{
				id: 's13',
				name: 'Guardian Jobs account',
				subsubTopicsTitle:
					'Step 2: Help us understand what you need to talk about',
				subsubtopics: [
					{
						id: 'ss6',
						name: 'I haven’t been receiving job alerts',
					},
					{
						id: 'ss7',
						name: 'I don’t remember what email I use to sign in with',
					},
					{
						id: 'ss8',
						name: 'I forgot my password',
						selfServiceBox: {
							text: [
								'Did you know you can update your password online using the button below? It’s easy to use and means you don’t have to wait for a response.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss9',
						name: 'I need to update my account details',
						selfServiceBox: {
							text: [
								'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss10',
						name: 'I want to delete my account',
						selfServiceBox: {
							text: [
								'Did you know you can delete your account by logging in below’? It’s easy to use and means you don’t have to wait for a response. Please note that if you have an active subscription or recurring contribution you will need to cancel that first.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss11',
						name: 'Something else',
						editableSubject: true,
					},
				],
			},
			{
				id: 's14',
				name: 'I have a problem with my newsletter email',
				subsubTopicsTitle:
					'Step 2: Help us understand what you need to talk about',
				subsubtopics: [
					{
						id: 'ss12',
						name: 'I’m not receiving my newsletter emails',
					},
					{
						id: 'ss13',
						name: 'I need to update my email address',
						selfServiceBox: {
							text: [
								'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
							],
							linkText: 'Go to your account',
							href: '/',
						},
					},
					{
						id: 'ss14',
						name: 'I would like to unsubscribe from your newsletter emails',
					},
					{
						id: 'ss15',
						name: 'Something else',
						editableSubject: true,
					},
				],
			},
		],
	},
	{
		id: 'tech',
		name: 'Technical Issues',
		enquiryLabel: 'this issue',
		subTopicsTitle:
			'Step 1: Help us understand what you need to talk about',
		subtopics: [
			{
				id: 's15',
				name: 'I’d like to report a technical issue with your website',
			},
			{
				id: 's16',
				name: 'I’d like to report a technical issue with your app',
			},
			{
				id: 's17',
				name: 'I’d like to provide feedback on your website or app',
				subsubTopicsTitle:
					'Step 2: What would you like to provide feedback on?',
				subsubtopics: [
					{
						id: 'ss16',
						name: 'Website',
					},
					{
						id: 'ss17',
						name: 'Apps',
					},
				],
			},
			{
				id: 's19',
				name: 'I’d like to feedback about the advertisements you’re using',
			},
			{
				id: 's20',
				name: 'Something else',
				editableSubject: true,
			},
		],
	},
	{
		id: 'journalism',
		name: 'Guardian Journalism',
		enquiryLabel: 'our journalism',
		subTopicsTitle:
			'Step 1: Help us understand what you need to talk about',
		subtopics: [
			{
				id: 's21',
				name: 'I’d like to report an error in your article',
			},
			{
				id: 's22',
				name: 'I’d like to make a complaint about your articles',
			},
			{
				id: 's23',
				name: 'I’d like to provide some feedback on your article',
			},
			{
				id: 's24',
				name: 'I’d like to report a broken link in your article',
			},
			{
				id: 's25',
				name: 'Something else',
				editableSubject: true,
			},
		],
	},
	{
		id: 'comments',
		name: 'Commenting',
		enquiryLabel: 'commenting',
	},
	{
		id: 'other',
		name: 'Something else',
		enquiryLabel: 'your query',
		editableSubject: true,
	},
];
