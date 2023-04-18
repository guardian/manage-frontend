import type { ComponentMeta, ComponentStory } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
import {
	InAppPurchase,
	InAppPurchaseAndroid,
	InAppPurchaseIos,
	PuzzleAppPurchaseAndroid,
} from '../../../fixtures/inAppPurchase';
import { guardianWeeklyCardInvoice } from '../../../fixtures/invoices';
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
		.get('/mpapi/user/mobile-subscriptions', {
			body: { subscriptions: [] },
		})
		.get('/idapi/user', { body: user });

	return <Billing />;
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
	featureSwitches['appSubscriptions'] = true;

	fetchMock
		.restore()
		.get('/api/me/mma', {
			body: toMembersDataApiResponse(
				guardianWeeklyCard,
				digitalDD,
				newspaperVoucherPaypal,
			),
		})
		.get('/mpapi/user/mobile-subscriptions', {
			body: {
				subscriptions: [
					InAppPurchase,
					InAppPurchaseIos,
					InAppPurchaseAndroid,
					PuzzleAppPurchaseAndroid,
				],
			},
		})
		.get('/api/invoices', {
			body: { invoices: [guardianWeeklyCardInvoice] },
		});

	return <Billing />;
};
