import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';

import Billing from './billing';
import {
	guardianWeeklyCard,
	digitalDD,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';
import { user } from '../../fixtures/user';

export default {
	title: 'Pages/Billing',
	component: Billing,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Billing>;

export const NoSubscription: ComponentStory<typeof Billing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', { body: [] })
		.get('/api/invoices', { body: { invoices: [] } })
		.get('/idapi/user', { body: user });

	return (
		<MemoryRouter>
			<Billing />
		</MemoryRouter>
	);
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
		})
		.get('/api/invoices', { body: { invoices: [] } });

	return (
		<MemoryRouter>
			<Billing />
		</MemoryRouter>
	);
};
