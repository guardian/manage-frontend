import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { GROUPED_PRODUCT_TYPES } from '../../shared/productTypes';
import { newspaperVoucherPaypal } from '../fixtures/productDetail';
import { BasicProductInfoTable } from './basicProductInfoTable';

export default {
	title: 'Components/BasicProductInfoTable',
	component: BasicProductInfoTable,
} as ComponentMeta<typeof BasicProductInfoTable>;

export const Default: ComponentStory<typeof BasicProductInfoTable> = () => (
	<BasicProductInfoTable
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		productDetail={newspaperVoucherPaypal}
	/>
);
