import type { Meta } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { observerVoucherPaidByCard } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	confirmedStory,
	pauseStory,
	reasonsStory,
	reviewStory,
	withReader,
} from './selfServeCancellationStory';

const product = {
	productType: PRODUCT_TYPES.voucherobserver,
	productDetail: withReader(observerVoucherPaidByCard(), 'United Kingdom'),
};

export default {
	title: 'Pages/Cancellation/Observer voucher',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CancellationContainer>;

export const Reasons = reasonsStory(product);
export const Pause = pauseStory(product);
export const ReviewSoft = reviewStory(product, 'soft');
export const ReviewHard = reviewStory(product, 'hard');
export const ReviewHardWithCredit = reviewStory(product, 'hardWithCredit');
export const ConfirmedSoft = confirmedStory(product, 'soft');
export const ConfirmedHard = confirmedStory(product, 'hard');
