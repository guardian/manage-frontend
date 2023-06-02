import type { ComponentMeta, ComponentStory } from '@storybook/react';
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
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyCancelled,
	guardianWeeklyGiftPurchase,
	guardianWeeklyGiftRecipient,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import {
	contributionCancelled,
	contributionPayPal,
	membershipSupporter,
	newspaperVoucherPaypal,
	supporterPlus,
	supporterPlusCancelled,
	toMembersDataApiResponse,
} from '../../../fixtures/productDetail';
import { singleContributionsAPIResponse } from '../../../fixtures/singleContribution';
import { user } from '../../../fixtures/user';
import { AccountOverview } from './AccountOverview';

featureSwitches['appSubscriptions'] = true;
featureSwitches['singleContributions'] = true;

export default {
	title: 'Pages/AccountOverview',
	component: AccountOverview,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof AccountOverview>;

export const NoSubscription: ComponentStory<typeof AccountOverview> = () => {
	return <AccountOverview />;
};

NoSubscription.parameters = {
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
};

export const WithSubscriptions: ComponentStory<typeof AccountOverview> = () => {
	return <AccountOverview />;
};

WithSubscriptions.parameters = {
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
						newspaperVoucherPaypal,
						membershipSupporter,
						supporterPlus,
					),
				),
			);
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
	],
};

export const WithContributionAndSwitchPossible: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithContributionAndSwitchPossible.parameters = {
	msw: [
		rest.get('/api/cancelled/', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(ctx.json({ subscriptions: [] }));
		}),
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(ctx.json(toMembersDataApiResponse(contributionPayPal)));
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
	],
};

export const WithContributionInPaymentFailure: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

const contributionPaymentFailure = {
	...contributionPayPal,
	alertText: 'Your payment has failed.',
};

WithContributionInPaymentFailure.parameters = {
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
						supporterPlus,
					),
				),
			);
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
	],
};

export const WithContributionAndSwitchNotPossible: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithContributionAndSwitchNotPossible.parameters = {
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
						contributionPayPal,
						digitalPackPaidByDirectDebit(),
					),
				),
			);
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
	],
};

export const WithCancelledSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithCancelledSubscriptions.parameters = {
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
						contributionCancelled,
						guardianWeeklyCancelled(),
						supporterPlusCancelled,
					),
				),
			);
		}),
		rest.get('/api/me/one-off-contributions', (_req, res, ctx) => {
			return res(ctx.json([]));
		}),
	],
};

export const WithGiftSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithGiftSubscriptions.parameters = {
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
};

export const WithAppSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithAppSubscriptions.parameters = {
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
};

export const WithSingleContribution: ComponentStory<
	typeof AccountOverview
> = () => {
	return <AccountOverview />;
};

WithSingleContribution.parameters = {
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
};
