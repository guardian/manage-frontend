import type { Meta , StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { toMembersDataApiResponse } from '@/client/fixtures/mdapiResponse';
import { guardianWeeklyPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { DeliveryAddressChangeContainer } from './DeliveryAddressChangeContainer';
import { DeliveryAddressConfirmation } from './DeliveryAddressConfirmation';
import { DeliveryAddressUpdate } from './DeliveryAddressForm';
import { DeliveryAddressReview } from './DeliveryAddressReview';

export default {
	component: DeliveryAddressChangeContainer,
	title: 'Pages/DeliveryAddress',
	decorators: [ReactRouterDecorator],
	parameters: {
		reactRouter: {
			state: guardianWeeklyPaidByCard(),
			container: (
				<DeliveryAddressChangeContainer
					productType={PRODUCT_TYPES.guardianweekly}
				/>
			),
		},
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(
					ctx.json(
						toMembersDataApiResponse(guardianWeeklyPaidByCard()),
					),
				);
			}),
		],
	},
} as Meta<typeof DeliveryAddressChangeContainer>;

export const UpdateDeliveryAddress: StoryFn<
	typeof DeliveryAddressUpdate
> = () => {
	return <DeliveryAddressUpdate productType={PRODUCT_TYPES.guardianweekly} />;
};

export const Review: StoryFn<typeof DeliveryAddressReview> = () => {
	return <DeliveryAddressReview productType={PRODUCT_TYPES.guardianweekly} />;
};

export const Confirmation: StoryFn<typeof DeliveryAddressConfirmation> = () => {
	return (
		<DeliveryAddressConfirmation
			productType={PRODUCT_TYPES.guardianweekly}
		/>
	);
};

Confirmation.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(
				ctx.json(toMembersDataApiResponse(guardianWeeklyPaidByCard())),
			);
		}),
		rest.put('/api/delivery/address/update/*', (_req, res, ctx) => {
			return res(ctx.status(200));
		}),
	],
};
