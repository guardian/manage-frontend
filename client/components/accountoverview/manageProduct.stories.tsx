import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

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
	<MemoryRouter
		initialEntries={[{ state: { productDetail: guardianWeeklyCard } }]}
	>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</MemoryRouter>
);

export const NewspaperSubscriptionCard: ComponentStory<
	typeof ManageProduct
> = () => (
	<MemoryRouter initialEntries={[{ state: { productDetail: digitalDD } }]}>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</MemoryRouter>
);

export const DigitalSubscription: ComponentStory<typeof ManageProduct> = () => (
	<MemoryRouter
		initialEntries={[{ state: { productDetail: newspaperVoucherPaypal } }]}
	>
		<ManageProduct
			groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		/>
	</MemoryRouter>
);
