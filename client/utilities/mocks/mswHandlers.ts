/**
 * Unified Mock Handlers
 *
 * This file provides unified MSW handlers for multiple pages using localStorage flags
 * to control different response scenarios. This allows for centralized mock management and
 * easy reuse across stories and tests.
 *
 * ## localStorage Flag Dictionary
 *
 * ### accountOverview_cancelled
 * Controls the /api/cancelled/ endpoint responses:
 * - 'empty' (default): Returns []
 * - 'withCancelled': Returns [cancelledContribution, cancelledGuardianWeekly, cancelledGuardianAdLite]
 *
 * ### accountOverview_mobileSubscriptions
 * Controls the /mpapi/user/mobile-subscriptions endpoint responses:
 * - 'empty' (default): Returns { subscriptions: [] }
 * - 'withAppSubscriptions': Returns mobile app subscriptions (iOS/Android puzzle apps, etc.)
 * - 'networkError': Returns 503 error with "Server is unavailable" message
 *
 * ### accountOverview_mma
 * Controls the /api/me/mma endpoint responses (main product data):
 * - 'noSubscription' (default): Returns empty MDA response
 * - 'withSubscriptions': Returns full range of Guardian products (Weekly, DigiPack, Membership, etc.)
 * - 'onlyObserver': Returns Observer-specific products only
 * - 'usaSubscription': Returns Supporter Plus USA product
 * - 'contributionSwitchPossible': Returns single contribution (eligible for switching)
 * - 'contributionPaymentFailure': Returns contribution with payment failure alert
 * - 'contributionSwitchNotPossible': Returns contribution + DigiPack (switching blocked)
 * - 'withCancelled': Returns cancelled products (contributions, memberships, etc.)
 * - 'giftSubscriptions': Returns Guardian Weekly gift recipient and purchase
 * - 'supporterPlusInOffer': Returns Supporter Plus during promotional offer period
 * - 'guardianAdLite': Returns Guardian Ad Lite subscription
 * - 'mpapiFailure': Returns products for testing when mobile API fails
 *
 * ### accountOverview_idapiUser
 * Controls the /idapi/user endpoint responses:
 * - 'default' (default): Returns standard user fixture
 * - 'withUser': Returns standard user fixture (explicit)
 *
 * ### accountOverview_oneOffContributions
 * Controls the /api/me/one-off-contributions endpoint responses:
 * - 'empty' (default): Returns []
 * - 'withContributions': Returns single contributions API response
 *
 * ### helpCentre_knownIssues
 * Controls the /api/known-issues/ endpoint responses:
 * - 'empty' (default): Returns []
 * - 'withIssues': Returns known issues array with sample issue
 *
 * ### helpCentre_article
 * Controls the /api/help-centre/article/{articleCode} endpoint responses:
 * - 'default': Returns sample article content for 'i-need-to-pause-my-delivery'
 * - 'notFound': Returns 404 error
 *
 * ### helpCentre_topic
 * Controls the /api/help-centre/topic/{topicCode} endpoint responses:
 * - 'delivery': Returns delivery topic with sample articles
 * - 'notFound': Returns 404 error
 */

import { http, HttpResponse } from 'msw';
import {
	cancelledContribution,
	cancelledGuardianAdLite,
	cancelledGuardianWeekly,
} from '../../fixtures/cancelledProductDetail';
import {
	CancelledInAppPurchase,
	InAppPurchaseIos,
	PuzzleAppPurchaseAndroid,
	PuzzleAppPurchaseIos,
} from '../../fixtures/inAppPurchase';
import { toMembersDataApiResponse } from '../../fixtures/mdapiResponse';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	digitalPackPaidByDirectDebit,
	guardianAdLite,
	guardianAdLiteCancelled,
	guardianWeeklyCancelled,
	guardianWeeklyGiftPurchase,
	guardianWeeklyGiftRecipient,
	guardianWeeklyPaidByCard,
	homeDelivery,
	homeDeliverySaturdayPlus,
	membershipSupporter,
	nationalDelivery,
	nationalDeliveryPlus,
	newspaperDigitalVoucherObserver,
	newspaperDigitalVoucherPaidByPaypal,
	newspaperdigitalVoucherPlusPaidByCard,
	observerDelivery,
	observerVoucherPaidByCard,
	patronMembership,
	supporterPlus,
	supporterPlusAnnualCancelled,
	supporterPlusCancelled,
	supporterPlusInOfferPeriod,
	supporterPlusUSA,
	tierThree,
	voucherPaidByCard,
	voucherPlusPaidByCard,
} from '../../fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../fixtures/singleContribution';
import { user } from '../../fixtures/user';

// Help Centre sample data
const sampleKnownIssue = [
	{
		date: '20 Jan 2022 12:00',
		message: 'Live Chat is currently unavailable.',
	},
];

const sampleArticleContent = {
	title: 'I need to pause my delivery',
	body: [
		{
			element: 'p',
			content: [
				{
					element: 'text',
					content:
						'All our print subscribers can apply a holiday suspension to their subscription and get credited the cost for the suspended issues on their next bill date.',
				},
			],
		},
	],
	path: 'i-need-to-pause-my-delivery',
	topics: [
		{
			path: 'delivery',
			title: 'Delivery',
		},
	],
};

const sampleTopicContent = {
	path: 'delivery',
	title: 'Delivery',
	articles: [
		{
			path: 'i-need-to-pause-my-delivery',
			title: 'I need to pause my delivery',
		},
		{
			path: 'my-delivery-is-late-or-missing',
			title: 'My delivery is late or missing',
		},
		{
			path: 'my-paper-is-missing-a-section',
			title: 'My paper is missing a section',
		},
	],
};

export const accountOverviewHandlers = [
	http.get('/api/cancelled/', () => {
		const scenario =
			localStorage.getItem('accountOverview_cancelled') || 'empty';

		switch (scenario) {
			case 'withCancelled':
				return HttpResponse.json([
					cancelledContribution,
					cancelledGuardianWeekly,
					cancelledGuardianAdLite,
				]);
			case 'empty':
			default:
				return HttpResponse.json([]);
		}
	}),

	http.get('/mpapi/user/mobile-subscriptions', () => {
		const scenario =
			localStorage.getItem('accountOverview_mobileSubscriptions') ||
			'empty';

		switch (scenario) {
			case 'withAppSubscriptions':
				return HttpResponse.json({
					subscriptions: [
						CancelledInAppPurchase,
						InAppPurchaseIos,
						PuzzleAppPurchaseAndroid,
						PuzzleAppPurchaseIos,
					],
				});
			case 'networkError':
				return HttpResponse.json(
					{ errorMessage: 'Server is unavailable' },
					{ status: 503 },
				);
			case 'empty':
			default:
				return HttpResponse.json({ subscriptions: [] });
		}
	}),

	http.get('/api/me/mma', () => {
		const scenario =
			localStorage.getItem('accountOverview_mma') || 'noSubscription';

		switch (scenario) {
			case 'withSubscriptions':
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperDigitalVoucherPaidByPaypal(),
						newspaperdigitalVoucherPlusPaidByCard(),
						membershipSupporter(),
						patronMembership(),
						supporterPlus(),
						tierThree(),
						homeDelivery(),
						homeDeliverySaturdayPlus(),
						voucherPaidByCard(),
						voucherPlusPaidByCard(),
						observerDelivery(),
						newspaperDigitalVoucherObserver(),
						nationalDelivery(),
						nationalDeliveryPlus(),
					),
				);
			case 'onlyObserver':
				return HttpResponse.json(
					toMembersDataApiResponse(
						newspaperDigitalVoucherObserver(),
						observerDelivery(),
						observerVoucherPaidByCard(),
					),
				);
			case 'usaSubscription':
				return HttpResponse.json(
					toMembersDataApiResponse(supporterPlusUSA()),
				);
			case 'contributionSwitchPossible':
				return HttpResponse.json(
					toMembersDataApiResponse(contributionPaidByPayPal()),
				);
			case 'contributionPaymentFailure':
				return HttpResponse.json(
					toMembersDataApiResponse(
						{
							...contributionPaidByPayPal(),
							alertText: 'Your payment has failed.',
						},
						supporterPlus(),
					),
				);
			case 'contributionSwitchNotPossible':
				return HttpResponse.json(
					toMembersDataApiResponse(
						contributionPaidByPayPal(),
						digitalPackPaidByDirectDebit(),
					),
				);
			case 'withCancelled':
				return HttpResponse.json(
					toMembersDataApiResponse(
						contributionCancelled(),
						guardianWeeklyCancelled(),
						supporterPlusCancelled(),
						supporterPlusAnnualCancelled(),
						guardianAdLiteCancelled(),
						tierThree(),
					),
				);
			case 'giftSubscriptions':
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyGiftRecipient(),
						guardianWeeklyGiftPurchase(),
					),
				);
			case 'supporterPlusInOffer':
				return HttpResponse.json(
					toMembersDataApiResponse(supporterPlusInOfferPeriod()),
				);
			case 'guardianAdLite':
				return HttpResponse.json(
					toMembersDataApiResponse(guardianAdLite()),
				);
			case 'mpapiFailure':
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperDigitalVoucherPaidByPaypal(),
						membershipSupporter(),
						patronMembership(),
						supporterPlus(),
						tierThree(),
						homeDeliverySaturdayPlus(),
						voucherPaidByCard(),
						observerDelivery(),
						newspaperDigitalVoucherObserver(),
					),
				);
			case 'noSubscription':
			default:
				return HttpResponse.json(toMembersDataApiResponse());
		}
	}),

	http.get('/idapi/user', () => {
		const scenario =
			localStorage.getItem('accountOverview_idapiUser') || 'default';

		switch (scenario) {
			case 'withUser':
				return HttpResponse.json(user);
			case 'default':
			default:
				// Return user by default, stories can opt out by not setting this flag
				return HttpResponse.json(user);
		}
	}),

	http.get('/api/me/one-off-contributions', () => {
		const scenario =
			localStorage.getItem('accountOverview_oneOffContributions') ||
			'empty';

		switch (scenario) {
			case 'withContributions':
				return HttpResponse.json(singleContributionsAPIResponse);
			case 'empty':
			default:
				return HttpResponse.json([]);
		}
	}),

	// Help Centre handlers
	http.get('/api/known-issues/', () => {
		const scenario =
			localStorage.getItem('helpCentre_knownIssues') || 'empty';

		switch (scenario) {
			case 'withIssues':
				return HttpResponse.json(sampleKnownIssue);
			case 'empty':
			default:
				return HttpResponse.json([]);
		}
	}),

	http.get('/api/help-centre/article/:articleCode', ({ params }) => {
		const scenario =
			localStorage.getItem('helpCentre_article') || 'default';
		const { articleCode } = params;

		switch (scenario) {
			case 'default':
				if (articleCode === 'i-need-to-pause-my-delivery') {
					return HttpResponse.json(sampleArticleContent);
				}
				return HttpResponse.json(
					{ error: 'Article not found' },
					{ status: 404 },
				);
			case 'notFound':
				return HttpResponse.json(
					{ error: 'Article not found' },
					{ status: 404 },
				);
			default:
				return HttpResponse.json(sampleArticleContent);
		}
	}),

	http.get('/api/help-centre/topic/:topicCode', ({ params }) => {
		const scenario = localStorage.getItem('helpCentre_topic') || 'delivery';
		const { topicCode } = params;

		switch (scenario) {
			case 'delivery':
				if (topicCode === 'delivery') {
					return HttpResponse.json(sampleTopicContent);
				}
				return HttpResponse.json(
					{ error: 'Topic not found' },
					{ status: 404 },
				);
			case 'notFound':
				return HttpResponse.json(
					{ error: 'Topic not found' },
					{ status: 404 },
				);
			default:
				return HttpResponse.json(sampleTopicContent);
		}
	}),
];

export const setAccountOverviewScenario = {
	noSubscription: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'noSubscription');
		localStorage.setItem('accountOverview_idapiUser', 'withUser');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withSubscriptions: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'withSubscriptions');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withOnlyObserverSubscriptions: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'onlyObserver');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withUSASubscription: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'usaSubscription');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withContributionAndSwitchPossible: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem(
			'accountOverview_mma',
			'contributionSwitchPossible',
		);
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withContributionInPaymentFailure: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem(
			'accountOverview_mma',
			'contributionPaymentFailure',
		);
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withContributionAndSwitchNotPossible: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem(
			'accountOverview_mma',
			'contributionSwitchNotPossible',
		);
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withCancelledSubscriptions: () => {
		localStorage.setItem('accountOverview_cancelled', 'withCancelled');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'withCancelled');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withGiftSubscriptions: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'giftSubscriptions');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withAppSubscriptions: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem(
			'accountOverview_mobileSubscriptions',
			'withAppSubscriptions',
		);
		localStorage.setItem('accountOverview_mma', 'noSubscription');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withSingleContribution: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'noSubscription');
		localStorage.setItem(
			'accountOverview_oneOffContributions',
			'withContributions',
		);
	},

	withSupporterPlusDuringOffer: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'supporterPlusInOffer');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	withGuardianAdLite: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem('accountOverview_mobileSubscriptions', 'empty');
		localStorage.setItem('accountOverview_mma', 'guardianAdLite');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	mpapiRequestFailure: () => {
		localStorage.setItem('accountOverview_cancelled', 'empty');
		localStorage.setItem(
			'accountOverview_mobileSubscriptions',
			'networkError',
		);
		localStorage.setItem('accountOverview_mma', 'mpapiFailure');
		localStorage.setItem('accountOverview_oneOffContributions', 'empty');
	},

	clear: () => {
		localStorage.removeItem('accountOverview_cancelled');
		localStorage.removeItem('accountOverview_mobileSubscriptions');
		localStorage.removeItem('accountOverview_mma');
		localStorage.removeItem('accountOverview_idapiUser');
		localStorage.removeItem('accountOverview_oneOffContributions');
	},
};

// Help Centre scenario utility functions
export const setHelpCentreScenario = {
	default: () => {
		localStorage.setItem('helpCentre_knownIssues', 'empty');
		localStorage.setItem('helpCentre_article', 'default');
		localStorage.setItem('helpCentre_topic', 'delivery');
	},

	withKnownIssues: () => {
		localStorage.setItem('helpCentre_knownIssues', 'withIssues');
		localStorage.setItem('helpCentre_article', 'default');
		localStorage.setItem('helpCentre_topic', 'delivery');
	},

	articleNotFound: () => {
		localStorage.setItem('helpCentre_knownIssues', 'empty');
		localStorage.setItem('helpCentre_article', 'notFound');
		localStorage.setItem('helpCentre_topic', 'delivery');
	},

	topicNotFound: () => {
		localStorage.setItem('helpCentre_knownIssues', 'empty');
		localStorage.setItem('helpCentre_article', 'default');
		localStorage.setItem('helpCentre_topic', 'notFound');
	},

	clear: () => {
		localStorage.removeItem('helpCentre_knownIssues');
		localStorage.removeItem('helpCentre_article');
		localStorage.removeItem('helpCentre_topic');
	},
};

// Unified scenario functions (clears all flags)
export const setUnifiedScenario = {
	clear: () => {
		setAccountOverviewScenario.clear();
		setHelpCentreScenario.clear();
	},
};
