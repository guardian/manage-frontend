import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import type { ProductTypeWithDeliveryRecordsProperties } from '../../../../../shared/productTypes';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { deliveryRecordsWithDelivery } from '../../../../fixtures/deliveryRecords';
import {
	guardianWeeklyPaidByCard,
	homeDelivery,
} from '../../../../fixtures/productBuilder/testProducts';
import { DeliveryRecords } from './DeliveryRecords';
import { DeliveryRecordsContainer } from './DeliveryRecordsContainer';
import { DeliveryRecordsProblemConfirmation } from './DeliveryRecordsProblemConfirmation';
import { DeliveryRecordsProblemReview } from './DeliveryRecordsProblemReview';

const deliveryRecordsGW = deliveryRecordsWithDelivery();
const deliveryRecordsHomeDelivery = deliveryRecordsWithDelivery(true);

export default {
	component: DeliveryRecordsContainer,
	title: 'Pages/DeliveryHistory',
	decorators: [ReactRouterDecorator],
	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyPaidByCard() },
			container: (
				<DeliveryRecordsContainer
					productType={
						PRODUCT_TYPES.guardianweekly as ProductTypeWithDeliveryRecordsProperties
					}
				/>
			),
		},
	},
} as Meta<typeof DeliveryRecordsContainer>;

export const DeliveryHistoryGuardianWeekly: StoryObj<typeof DeliveryRecords> = {
	render: () => {
		return <DeliveryRecords />;
	},

	parameters: {
		msw: [
			http.get('/api/delivery-records/*', () => {
				return HttpResponse.json(deliveryRecordsGW);
			}),
		],
	},
};

export const ReviewGuardianWeekly: StoryObj<
	typeof DeliveryRecordsProblemReview
> = {
	render: () => {
		return <DeliveryRecordsProblemReview />;
	},

	parameters: {
		msw: [
			http.get('/api/delivery-records/*', () => {
				return HttpResponse.json(deliveryRecordsGW);
			}),
		],
		reactRouter: {
			state: { affectedRecords: deliveryRecordsGW.results },
		},
	},
};

export const ConfirmationGuardianWeekly: StoryObj<
	typeof DeliveryRecordsProblemConfirmation
> = {
	render: () => {
		return <DeliveryRecordsProblemConfirmation />;
	},

	parameters: {
		msw: [
			http.get('/api/delivery-records/*', () => {
				return HttpResponse.json(deliveryRecordsGW);
			}),
			http.post('/api/delivery-records/*', () => {
				return HttpResponse.json(deliveryRecordsGW);
			}),
		],
	},
};

export const DeliveryHistoryNewspaperDelivery: StoryObj<
	typeof DeliveryRecords
> = {
	render: () => {
		return <DeliveryRecords />;
	},

	parameters: {
		msw: [
			http.get('/api/delivery-records/*', () => {
				return HttpResponse.json(deliveryRecordsHomeDelivery);
			}),
		],
		reactRouter: {
			state: { productDetail: homeDelivery() },
			container: (
				<DeliveryRecordsContainer
					productType={
						PRODUCT_TYPES.homedelivery as ProductTypeWithDeliveryRecordsProperties
					}
				/>
			),
		},
	},
};
