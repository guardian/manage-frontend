import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
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
} as ComponentMeta<typeof Billing>;

export const NoSubscription: ComponentStory<typeof Billing> = () => {
	return <Billing />;
};

NoSubscription.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(ctx.json(toMembersDataApiResponse()));
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(
				ctx.json({
					subscriptions: [],
				}),
			);
		}),
		rest.get('/api/invoices', (_req, res, ctx) => {
			return res(ctx.json({ invoices: [] }));
		}),

		rest.get('/idapi/user', (_req, res, ctx) => {
			return res(ctx.json(user));
		}),
	],
};

export const WithSubscriptions: ComponentStory<typeof Billing> = () => {
	featureSwitches['appSubscriptions'] = true;

	return <Billing />;
};

WithSubscriptions.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(
				ctx.json(
					toMembersDataApiResponse(
						guardianWeeklyPaidByCard(),
						digitalPackPaidByDirectDebit(),
						newspaperVoucherPaidByPaypal(),
					),
				),
			);
		}),
		rest.get('/mpapi/user/mobile-subscriptions', (_req, res, ctx) => {
			return res(
				ctx.json({
					subscriptions: [
						InAppPurchase,
						InAppPurchaseIos,
						InAppPurchaseAndroid,
						PuzzleAppPurchaseAndroid,
					],
				}),
			);
		}),
		rest.get('/api/invoices', (_req, res, ctx) => {
			return res(ctx.json({ invoices: [guardianWeeklyCardInvoice] }));
		}),
	],
};
