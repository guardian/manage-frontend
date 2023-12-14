import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { ConfirmDigiSubCancellation } from '@/client/components/mma/cancel/cancellationSaves/digipack/ConfirmDigiSubCancellation';
import { DigiSubDiscountConfirmed } from '@/client/components/mma/cancel/cancellationSaves/digipack/DigiSubDiscountConfirmed';
import { DigiSubThankYouOffer } from '@/client/components/mma/cancel/cancellationSaves/digipack/DigiSubThankYouOffer';
import {
	digitalPackPaidByDirectDebit,
	digitalPackWithPaymentFailure,
} from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { SelectReason } from '../SelectReason';

export default {
	title: 'Pages/DigiSubSaves',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: digitalPackPaidByDirectDebit(),
				user: { email: 'test@test.com' },
			},
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.digipack} />
			),
		},
	},
} as Meta<typeof CancellationContainer>;

export const DiscountThankYouPage: StoryFn<
	typeof DigiSubDiscountConfirmed
> = () => {
	return <DigiSubDiscountConfirmed />;
};

export const EligibleForDiscount: StoryObj<typeof DigiSubThankYouOffer> = {
	render: () => {
		return <DigiSubThankYouOffer />;
	},
	parameters: {
		msw: [
			rest.post('/api/discounts/preview-discount', (_req, res, ctx) => {
				return res(ctx.json({ valid: true }));
			}),
		],
	},
};

export const IneligibleForDiscount: StoryObj<typeof DigiSubThankYouOffer> = {
	render: () => {
		return <DigiSubThankYouOffer />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: digitalPackWithPaymentFailure(),
				user: { email: 'test@test.com' },
			},
		},
		msw: [
			rest.post('/api/discounts/preview-discount', (_req, res, ctx) => {
				return res(ctx.json({ valid: false }));
			}),
		],
	},
};

export const ConfirmCancellation: StoryFn<
	typeof ConfirmDigiSubCancellation
> = () => {
	return <ConfirmDigiSubCancellation />;
};

export const DigiSubCancellationReason: StoryFn<typeof SelectReason> = () => {
	return <SelectReason />;
};
