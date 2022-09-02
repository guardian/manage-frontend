import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RouterState } from '../../../.storybook/RouterState';

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
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ManageProduct>;

export const GuardianWeekly: ComponentStory<typeof ManageProduct> = () => (
	<RouterState initialState={{ productDetail: guardianWeeklyCard }}>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</RouterState>
);

export const DigitalSubscription: ComponentStory<typeof ManageProduct> = () => (
	<RouterState initialState={{ productDetail: digitalDD }}>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</RouterState>
);

export const NewspaperSubscriptionCard: ComponentStory<
	typeof ManageProduct
> = () => (
	<RouterState initialState={{ productDetail: newspaperVoucherPaypal }}>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</RouterState>
);
