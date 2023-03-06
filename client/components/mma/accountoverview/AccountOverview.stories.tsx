import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
import {
	CancelledInAppPurchase,
	InAppPurchase,
} from '../../../fixtures/inAppPurchase';
import {
	contributionPayPal,
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
	supporterPlus,
	toMembersDataApiResponse,
} from '../../../fixtures/productDetail';
import { user } from '../../../fixtures/user';
import { AccountOverview } from './AccountOverview';

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
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
			),
		});

	return <AccountOverview />;
};

export const WithContributionNewLayout: ComponentStory<
	typeof AccountOverview
> = () => {
	featureSwitches['accountOverviewNewLayout'] = true;

	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(contributionPayPal),
		});

	return <AccountOverview />;
};

export const WithContributionNewLayoutPaymentFailure: ComponentStory<
	typeof AccountOverview
> = () => {
	featureSwitches['accountOverviewNewLayout'] = true;
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
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				contributionPaymentFailure,
				supporterPlus,
			),
		});

	return <AccountOverview />;
};

export const WithContributionNewLayoutDigisubAndContribution: ComponentStory<
	typeof AccountOverview
> = () => {
	featureSwitches['accountOverviewNewLayout'] = true;

	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(contributionPayPal, digitalDD),
		});

	return <AccountOverview />;
};

export const WithIAP: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [InAppPurchase] },
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse(digitalDD) })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};

export const WithCancelledIAP: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [CancelledInAppPurchase] },
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};

export const WithOneCancelledAndOneNotCancelledIAP: ComponentStory<
	typeof AccountOverview
> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/mpapi/user/mobile-subscriptions', {
			body: {
				subscriptions: [CancelledInAppPurchase, InAppPurchase],
			},
		})
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};
