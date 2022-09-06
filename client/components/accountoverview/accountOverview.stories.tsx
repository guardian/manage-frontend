import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
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

	return (
		<MemoryRouter>
			<AccountOverview />
		</MemoryRouter>
	);
};

export const WithSubscriptions: ComponentStory<typeof AccountOverview> = () => {
	fetchMock
		.restore()
		.get('/api/cancelled/', { body: [] })
		.get('/api/me/mma', {
			body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
		});

	return (
		<MemoryRouter>
			<AccountOverview />
		</MemoryRouter>
	);
};
