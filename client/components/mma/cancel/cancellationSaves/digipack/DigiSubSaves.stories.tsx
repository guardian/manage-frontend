import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { ConfirmDigiSubCancellation } from '@/client/components/mma/cancel/cancellationSaves/digipack/ConfirmDigiSubCancellation';
import { DigiSubDiscountConfirm } from '@/client/components/mma/cancel/cancellationSaves/digipack/DigiSubDiscountConfirm';
import { ThankYouOffer } from '@/client/components/mma/cancel/cancellationSaves/digipack/ThankYouOffer';
import {
	digitalPackPaidByDirectDebit,
	digitalPackWithPaymentFailure,
} from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';

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
	typeof DigiSubDiscountConfirm
> = () => {
	return <DigiSubDiscountConfirm />;
};

export const EligibleForDiscount: StoryObj<typeof ThankYouOffer> = {
	render: () => {
		return <ThankYouOffer />;
	},
	parameters: {
		msw: [
			rest.post('/api/discounts/check-eligibility', (_req, res, ctx) => {
				return res(ctx.json({ valid: true }));
			}),
		],
	},
};

export const IneligibleForDiscount: StoryObj<typeof ThankYouOffer> = {
	render: () => {
		return <ThankYouOffer />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: digitalPackWithPaymentFailure(),
				user: { email: 'test@test.com' },
			},
		},
		msw: [
			rest.post('/api/discounts/check-eligibility', (_req, res, ctx) => {
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
