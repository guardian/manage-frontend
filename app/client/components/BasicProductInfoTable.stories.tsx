import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BasicProductInfoTable } from './basicProductInfoTable';
import { newspaperVoucherPaypal } from '../fixtures/productDetail';
import { GROUPED_PRODUCT_TYPES } from '../../shared/productTypes';

export default {
	title: 'Components/BasicProductInfoTable',
	component: BasicProductInfoTable,
	parameters: {
		controls: { hideNoControlsWarning: true },
	},
} as ComponentMeta<typeof BasicProductInfoTable>;

export const Default: ComponentStory<typeof BasicProductInfoTable> = () => (
	<BasicProductInfoTable
		groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions}
		productDetail={newspaperVoucherPaypal}
	/>
);
