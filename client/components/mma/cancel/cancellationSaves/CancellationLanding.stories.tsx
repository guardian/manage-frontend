import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import {
	digitalPackPaidByDirectDebit,
	membershipSupporterCurrencyUSD,
} from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { CancellationContainer } from '../CancellationContainer';
import { CancellationLanding } from './CancellationLanding';

export default {
	title: 'Pages/CancellationLanding',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CancellationContainer>;

export const Membership: StoryObj<typeof CancellationLanding> = {
	render: () => {
		return <CancellationLanding />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: membershipSupporterCurrencyUSD(),
				user: { email: 'test@test.com' },
			},
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.membership} />
			),
		},
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							membershipSupporterCurrencyUSD(),
						),
					),
				);
			}),
		],
	},
};

export const DigiPack: StoryObj<typeof CancellationLanding> = {
	render: () => {
		return <CancellationLanding />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: digitalPackPaidByDirectDebit(),
				user: { email: 'test@test.com' },
			},
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.digipack} />
			),
		},
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(
							digitalPackPaidByDirectDebit(),
						),
					),
				);
			}),
		],
	},
};
