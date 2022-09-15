import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import fetchMock from 'fetch-mock';

import AccountOverview from './accountOverview';
import {
	guardianWeeklyCard,
	digitalDD,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';
import { user } from '../../fixtures/user';

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
			body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
		});

	return <AccountOverview />;
};
