import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import {
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
	toMembersDataApiResponse,
} from '../../../fixtures/productDetail';
import { user } from '../../../fixtures/user';
import { Billing } from './Billing';

export default {
	title: 'Pages/Billing',
	component: Billing,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Billing>;

export const NoSubscription: ComponentStory<typeof Billing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', { body: toMembersDataApiResponse() })
		.get('/api/invoices', { body: { invoices: [] } })
		.get('/idapi/user', { body: user });

	return <Billing />;
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
			),
		})
		.get('/api/invoices', { body: { invoices: [] } });

	return <Billing />;
};
