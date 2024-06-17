import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
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
	supporterPlusCancelled,
	supporterPlusInOfferPeriod,
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/idapi/user', (_req, res, ctx) => {
				return res(ctx.json(user));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							guardianWeeklyPaidByCard(),
							digitalPackPaidByDirectDebit(),
							newspaperVoucherPaidByPaypal(),
							membershipSupporter(),
							supporterPlus(),
						),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(contributionPaidByPayPal()),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							contributionPaymentFailure,
							supporterPlus(),
						),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							contributionPaidByPayPal(),
							digitalPackPaidByDirectDebit(),
						),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(
					ctx.json([cancelledContribution, cancelledGuardianWeekly]),
				);
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							contributionCancelled(),
							guardianWeeklyCancelled(),
							supporterPlusCancelled(),
						),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							guardianWeeklyGiftRecipient(),
							guardianWeeklyGiftPurchase(),
						),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(
					ctx.json({
						subscriptions: [
							CancelledInAppPurchase,
							InAppPurchaseIos,
							PuzzleAppPurchaseAndroid,
							PuzzleAppPurchaseIos,
						],
					}),
				);
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(
					ctx.json({
						subscriptions: [],
					}),
				);
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json(toMembersDataApiResponse()));
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json(singleContributionsAPIResponse));
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
			rest.get('/api/cancelled/', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
				return res(ctx.json({ subscriptions: [] }));
			}),
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(supporterPlusInOfferPeriod()),
					),
				);
			}),
			rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
				return res(ctx.json([]));
			}),
		],
	},
};
