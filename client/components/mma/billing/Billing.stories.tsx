import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	InAppPurchase,
	InAppPurchaseAndroid,
	InAppPurchaseIos,
	PuzzleAppPurchaseAndroid,
} from '../../../fixtures/inAppPurchase';
import { guardianWeeklyCardInvoice } from '../../../fixtures/invoices';
import { toMembersDataApiResponse } from '../../../fixtures/mdapiResponse';
import {
	digitalPackPaidByDirectDebit,
	guardianAdLite,
	guardianAdLiteCancelled,
	guardianWeeklyPaidByCard,
	newspaperVoucherPaidByPaypal,
	tierThree,
} from '../../../fixtures/productBuilder/testProducts';
import { user } from '../../../fixtures/user';
import { Billing } from './Billing';

export default {
	title: 'Pages/Billing',
	component: Billing,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Billing>;

export const NoSubscription: StoryObj<typeof Billing> = {
	render: () => {
		return <Billing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse());
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({ subscriptions: [] });
			}),
			http.get('/api/invoices', () => {
				return HttpResponse.json({ invoices: [] });
			}),
			http.get('/idapi/user', () => {
				return HttpResponse.json(user);
			}),
		],
	},
};

export const WithSubscriptions: StoryObj<typeof Billing> = {
	render: () => {
		featureSwitches['appSubscriptions'] = true;

		return <Billing />;
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperVoucherPaidByPaypal(),
						tierThree(),
						guardianAdLite(),
						guardianAdLiteCancelled(),
					),
				);
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return HttpResponse.json({
					subscriptions: [
						InAppPurchase,
						InAppPurchaseIos,
						InAppPurchaseAndroid,
						PuzzleAppPurchaseAndroid,
					],
				});
			}),
			http.get('/api/invoices', () => {
				return HttpResponse.json({
					invoices: [guardianWeeklyCardInvoice],
				});
			}),
		],
	},
};
