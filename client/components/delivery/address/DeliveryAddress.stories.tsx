import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { guardianWeeklyCard } from '../../../fixtures/productDetail';
import DeliveryAddressChangeContainer from './DeliveryAddressChangeContainer';
import DeliveryAddressConfirmation from './DeliveryAddressConfirmation';
import { DeliveryAddressUpdate } from './DeliveryAddressForm';
import DeliveryAddressReview from './DeliveryAddressReview';

export default {
	component: DeliveryAddressChangeContainer,
	title: 'Pages/DeliveryAddress',
	decorators: [ReactRouterDecorator],
	parameters: {
		reactRouter: {
			state: guardianWeeklyCard,
			container: (
				<DeliveryAddressChangeContainer
					productType={PRODUCT_TYPES.guardianweekly}
				/>
			),
		},
		msw: [
			rest.get('/api/me/mma', (_req, res, ctx) => {
				return res(ctx.json([guardianWeeklyCard]));
			}),
		],
	},
} as ComponentMeta<typeof DeliveryAddressChangeContainer>;

export const UpdateDeliveryAddress: ComponentStory<
	typeof DeliveryAddressUpdate
> = () => {
	return <DeliveryAddressUpdate productType={PRODUCT_TYPES.guardianweekly} />;
};

export const Review: ComponentStory<typeof DeliveryAddressReview> = () => {
	return <DeliveryAddressReview productType={PRODUCT_TYPES.guardianweekly} />;
};

export const Confirmation: ComponentStory<
	typeof DeliveryAddressConfirmation
> = () => {
	return (
		<DeliveryAddressConfirmation
			productType={PRODUCT_TYPES.guardianweekly}
		/>
	);
};

Confirmation.parameters = {
	msw: [
		rest.get('/api/me/mma', (_req, res, ctx) => {
			return res(ctx.json([guardianWeeklyCard]));
		}),
		rest.put('/api/delivery/address/update/*', (_req, res, ctx) => {
			return res(ctx.status(200));
		}),
	],
};
