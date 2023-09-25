import type { Meta, StoryFn } from '@storybook/react';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { newspaperVoucherPaidByPaypal } from '../../../fixtures/productBuilder/testProducts';
import { BasicProductInfoTable } from './BasicProductInfoTable';

export default {
	title: 'Components/BasicProductInfoTable',
	component: BasicProductInfoTable,
} as Meta<typeof BasicProductInfoTable>;

export const Default: StoryFn<typeof BasicProductInfoTable> = () => (
	<BasicProductInfoTable
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		productDetail={newspaperVoucherPaidByPaypal()}
	/>
);
