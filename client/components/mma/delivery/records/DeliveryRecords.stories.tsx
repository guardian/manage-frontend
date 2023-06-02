import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import type { ProductTypeWithDeliveryRecordsProperties } from '../../../../../shared/productTypes';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { deliveryRecordsWithDelivery } from '../../../../fixtures/deliveryRecords';
import { guardianWeeklyPaidByCard } from '../../../../fixtures/productBuilder/testProducts';
import { DeliveryRecords } from './DeliveryRecords';
import { DeliveryRecordsContainer } from './DeliveryRecordsContainer';
import { DeliveryRecordsProblemConfirmation } from './DeliveryRecordsProblemConfirmation';
import { DeliveryRecordsProblemReview } from './DeliveryRecordsProblemReview';

const productTypeWithDeliveryRecords = {
	...PRODUCT_TYPES.guardianweekly,
	delivery: {
		records: {
			productNameForProblemReport: '',
			showDeliveryInstructions: true,
			numberOfProblemRecordsToShow: 0,
			contactUserOnExistingProblemReport: true,
			availableProblemTypes: [],
		},
		enableDeliveryInstructionsUpdate: true,
	},
} as ProductTypeWithDeliveryRecordsProperties;

export default {
	component: DeliveryRecordsContainer,
	title: 'Pages/DeliveryHistory',
	decorators: [ReactRouterDecorator],
	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyPaidByCard() },
			container: (
				<DeliveryRecordsContainer
					productType={productTypeWithDeliveryRecords}
				/>
			),
		},
	},
} as ComponentMeta<typeof DeliveryRecordsContainer>;

export const DeliveryHistory: ComponentStory<typeof DeliveryRecords> = () => {
	return <DeliveryRecords />;
};

DeliveryHistory.parameters = {
	msw: [
		rest.get('/api/delivery-records/*', (_req, res, ctx) => {
			return res(ctx.json(deliveryRecordsWithDelivery));
		}),
	],
};

export const Review: ComponentStory<
	typeof DeliveryRecordsProblemReview
> = () => {
	return <DeliveryRecordsProblemReview />;
};

Review.parameters = {
	msw: [
		rest.get('/api/delivery-records/*', (_req, res, ctx) => {
			return res(ctx.json(deliveryRecordsWithDelivery));
		}),
	],
	reactRouter: {
		state: { affectedRecords: deliveryRecordsWithDelivery.results },
	},
};

export const Confirmation: ComponentStory<
	typeof DeliveryRecordsProblemConfirmation
> = () => {
	return <DeliveryRecordsProblemConfirmation />;
};

Confirmation.parameters = {
	msw: [
		rest.get('/api/delivery-records/*', (_req, res, ctx) => {
			return res(ctx.json(deliveryRecordsWithDelivery));
		}),
		rest.post('/api/delivery-records/*', (_req, res, ctx) => {
			return res(ctx.json(deliveryRecordsWithDelivery));
		}),
	],
};
