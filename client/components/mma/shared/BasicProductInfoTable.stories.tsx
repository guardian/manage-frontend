import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { newspaperVoucherPaidByPaypal } from '../../../fixtures/productBuilder/testProducts';
import { BasicProductInfoTable } from './BasicProductInfoTable';

export default {
	title: 'Components/BasicProductInfoTable',
	component: BasicProductInfoTable,
} as ComponentMeta<typeof BasicProductInfoTable>;

export const Default: ComponentStory<typeof BasicProductInfoTable> = () => (
	<BasicProductInfoTable
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		productDetail={newspaperVoucherPaidByPaypal()}
	/>
);
