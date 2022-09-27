import { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import {
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';
import { user } from '../../fixtures/user';
import Billing from './billing';

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
		.get('/api/me/mma', { body: [] })
		.get('/api/invoices', { body: { invoices: [] } })
		.get('/idapi/user', { body: user });

	return <Billing />;
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: [guardianWeeklyCard, digitalDD, newspaperVoucherPaypal],
		})
		.get('/api/invoices', { body: { invoices: [] } });

	return <Billing />;
};
