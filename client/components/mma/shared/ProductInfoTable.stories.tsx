import type { Meta, StoryFn } from '@storybook/react';
import { ProductInfoTable } from '@/client/components/mma/shared/ProductInfoTable';
import { newspaperVoucherPaidByPaypal } from '@/client/fixtures/productBuilder/testProducts';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';

export default {
	title: 'Components/ProductInfoTable',
	component: ProductInfoTable,
} as Meta<typeof ProductInfoTable>;

export const Default: StoryFn<typeof ProductInfoTable> = () => (
	<ProductInfoTable
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		productDetail={newspaperVoucherPaidByPaypal()}
	/>
);
