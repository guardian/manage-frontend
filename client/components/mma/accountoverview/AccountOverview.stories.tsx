import type { Meta, StoryObj } from '@storybook/react';
import { http } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
import {
	cancelledContribution,
	cancelledGuardianWeekly,
} from '../../../fixtures/cancelledProductDetail';
import {
	CancelledInAppPurchase,
	InAppPurchaseIos,
	PuzzleAppPurchaseAndroid,
	PuzzleAppPurchaseIos,
} from '../../../fixtures/inAppPurchase';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import {
	contributionCancelled,
	contributionPaidByPayPal,
	digitalPackPaidByDirectDebit,
	guardianWeeklyCancelled,
	guardianWeeklyGiftPurchase,
	guardianWeeklyGiftRecipient,
	guardianWeeklyPaidByCard,
	membershipSupporter,
	newspaperVoucherPaidByPaypal,
	supporterPlus,
	supporterPlusAnnualCancelled,
	supporterPlusCancelled,
	supporterPlusInOfferPeriod,
	tierThree,
} from '../../../fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../../fixtures/singleContribution';
import { user } from '../../../fixtures/user';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;

export default {
	title: 'Pages/AccountOverview',
	component: AccountOverview,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof AccountOverview>;

export const NoSubscription: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(toMembersDataApiResponse()),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/idapi/user', () => {
				return new Response(JSON.stringify(user), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(
							guardianWeeklyPaidByCard(),
							digitalPackPaidByDirectDebit(),
							newspaperVoucherPaidByPaypal(),
							membershipSupporter(),
							supporterPlus(),
							tierThree(),
						),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithContributionAndSwitchPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(contributionPaidByPayPal()),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithContributionInPaymentFailure: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(
							contributionPaymentFailure,
							supporterPlus(),
						),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

const contributionPaymentFailure = {
	...contributionPaidByPayPal(),
	alertText: 'Your payment has failed.',
};

export const WithContributionAndSwitchNotPossible: StoryObj<
	typeof AccountOverview
> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(
							contributionPaidByPayPal(),
							digitalPackPaidByDirectDebit(),
						),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithCancelledSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(
					JSON.stringify([
						cancelledContribution,
						cancelledGuardianWeekly,
					]),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(
							contributionCancelled(),
							guardianWeeklyCancelled(),
							supporterPlusCancelled(),
							supporterPlusAnnualCancelled(),
							tierThree(),
						),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithGiftSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(
							guardianWeeklyGiftRecipient(),
							guardianWeeklyGiftPurchase(),
						),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithAppSubscriptions: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(
					JSON.stringify({
						subscriptions: [
							CancelledInAppPurchase,
							InAppPurchaseIos,
							PuzzleAppPurchaseAndroid,
							PuzzleAppPurchaseIos,
						],
					}),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(toMembersDataApiResponse()),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};

export const WithSingleContribution: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(toMembersDataApiResponse()),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(
					JSON.stringify(singleContributionsAPIResponse),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
		],
	},
};

export const WithSupporterPlusDuringOffer: StoryObj<typeof AccountOverview> = {
	render: () => {
		return <AccountOverview />;
	},

	parameters: {
		msw: [
			http.get('/api/cancelled/', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({ subscriptions: [] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
			http.get('/api/me/mma', () => {
				return new Response(
					JSON.stringify(
						toMembersDataApiResponse(supporterPlusInOfferPeriod()),
					),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
			}),
			http.get('/api/me/one-off-contributions', () => {
				return new Response(JSON.stringify([]), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}),
		],
	},
};
