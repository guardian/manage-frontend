import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
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
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard()))
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

export const Confirmation: StoryObj<typeof DeliveryAddressConfirmation> = {
	render: () => {
		return (
			<DeliveryAddressConfirmation
				productType={PRODUCT_TYPES.guardianweekly}
			/>
		);
	},

	parameters: {
		msw: [
			http.get('/api/me/mma', () => {
				return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard()))
			}),
			http.put('/api/delivery/address/update/*', () => {
				return new HttpResponse(null, {
					status: 200,
				})
			}),
		],
	},
};
