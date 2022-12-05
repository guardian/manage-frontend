import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../shared/featureSwitches';
import {
	contribution,
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
	supporterPlus,
} from '../../fixtures/productDetail';
import { user } from '../../fixtures/user';
import AccountOverview from './accountOverview';

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
		.get('/api/me/mma', { body: [] })
		.get('/idapi/user', { body: user });

	return <AccountOverview />;
};

export const WithSubscriptions: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/api/me/mma', {
			body: [
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
				contribution,
			],
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
		.get('/api/me/mma', {
			body: [contribution],
		});

	return <AccountOverview />;
};

export const WithContributionNewLayoutPaymentFailure: ComponentStory<
	typeof AccountOverview
> = () => {
	featureSwitches['accountOverviewNewLayout'] = true;
	const contributionPaymentFailure = {
		...contribution,
		alertText: 'Your payment has failed.',
	};

	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/api/me/mma', {
			body: [contributionPaymentFailure, supporterPlus],
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
		.get('/api/me/mma', {
			body: [contribution, digitalDD],
		});

	return <AccountOverview />;
};
