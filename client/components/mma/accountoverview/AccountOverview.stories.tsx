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
	contributionCancelled,
	contributionPayPal,
	digitalDD,
	guardianWeeklyCancelled,
	guardianWeeklyCard,
	guardianWeeklyGiftPurchase,
	guardianWeeklyGiftRecipient,
	newspaperVoucherPaypal,
	supporterPlus,
	supporterPlusCancelled,
	toMembersDataApiResponse,
} from '../../../fixtures/productDetail';
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
						guardianWeeklyCard,
						digitalDD,
						newspaperVoucherPaypal,
					),
				),
			);
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
					toMembersDataApiResponse(contributionPayPal, digitalDD),
				),
			);
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
						guardianWeeklyCancelled,
						supporterPlusCancelled,
					),
				),
			);
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
						guardianWeeklyGiftRecipient,
						guardianWeeklyGiftPurchase,
					),
				),
			);
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
	],
};
