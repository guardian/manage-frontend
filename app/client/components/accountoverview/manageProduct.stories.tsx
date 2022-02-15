import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ManageProduct from './manageProduct';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';

import {
	guardianWeeklyCard,
	digitalDD,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';

export default {
	title: 'Pages/ManageProduct',
	component: ManageProduct,
	parameters: {
		controls: { disabled: true },
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ManageProduct>;

export const GuardianWeekly: ComponentStory<typeof ManageProduct> = () => (
	<ManageProduct
		path="/"
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		location={{ state: { productDetail: guardianWeeklyCard } }}
	/>
);

export const NewspaperSubscriptionCard: ComponentStory<
	typeof ManageProduct
> = () => (
	<ManageProduct
		path="/"
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		location={{ state: { productDetail: digitalDD } }}
	/>
);

export const DigitalSubscription: ComponentStory<typeof ManageProduct> = () => (
	<ManageProduct
		path="/"
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		location={{ state: { productDetail: newspaperVoucherPaypal } }}
	/>
);
