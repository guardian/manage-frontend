import type { Meta, StoryObj } from '@storybook/react';
import { http } from 'msw';
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
				return new Response(JSON.stringify(toMembersDataApiResponse()), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({subscriptions: []}), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),
			http.get('/api/invoices', () => {
				return new Response(JSON.stringify({invoices: []}), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),

			http.get('/idapi/user', () => {
				return new Response(JSON.stringify(user), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
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
				return new Response(JSON.stringify(toMembersDataApiResponse(
					guardianWeeklyPaidByCard(),
					digitalPackPaidByDirectDebit(),
					newspaperVoucherPaidByPaypal(),
					tierThree(),
				)), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),
			http.get('/mpapi/user/mobile-subscriptions', () => {
				return new Response(JSON.stringify({
					subscriptions: [
						InAppPurchase,
						InAppPurchaseIos,
						InAppPurchaseAndroid,
						PuzzleAppPurchaseAndroid,
					],
				}), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),
			http.get('/api/invoices', () => {
				return new Response(JSON.stringify({ invoices: [guardianWeeklyCardInvoice] }), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}),
		],
	},
};
