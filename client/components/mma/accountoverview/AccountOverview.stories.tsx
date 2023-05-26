import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
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
} as ComponentMeta<typeof AccountOverview>;

export const NoSubscription: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};

export const WithSubscriptions: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
			),
		});

	return <AccountOverview />;
};

export const WithContributionAndSwitchPossible: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(contributionPayPal),
		});

	return <AccountOverview />;
};

export const WithContributionInPaymentFailure: ComponentStory<
	typeof AccountOverview
> = () => {
	const contributionPaymentFailure = {
		...contributionPayPal,
		alertText: 'Your payment has failed.',
	};

	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				contributionPaymentFailure,
				supporterPlus,
			),
		});

	return <AccountOverview />;
};

export const WithContributionAndSwitchNotPossible: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(contributionPayPal, digitalDD),
		});

	return <AccountOverview />;
};

export const WithCancelledSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				contributionCancelled,
				guardianWeeklyCancelled,
				supporterPlusCancelled,
			),
		})
		.get('/api/cancelled/', {
			body: [cancelledContribution, cancelledGuardianWeekly],
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		});

	return <AccountOverview />;
};

export const WithGiftSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				guardianWeeklyGiftRecipient,
				guardianWeeklyGiftPurchase,
			),
		})
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		});

	return <AccountOverview />;
};

export const WithAppSubscriptions: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: {
				subscriptions: [
					CancelledInAppPurchase,
					InAppPurchaseIos,
					PuzzleAppPurchaseAndroid,
					PuzzleAppPurchaseIos,
				],
			},
		})
		.get('/api/me/one-off-contributions', {
			body: [],
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};

export const WithSingleContribution: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: {
				subscriptions: [],
			},
		})
		.get('/api/me/one-off-contributions', {
			body: singleContributionsAPIResponse,
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};
