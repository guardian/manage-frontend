import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { ConfirmCancellation } from '@/client/components/mma/cancel/cancellationSaves/digipack/ConfirmCancellation';
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
	},
};

export const ConfirmDigiSubCancellation: StoryFn<
	typeof ConfirmCancellation
> = () => {
	return <ConfirmCancellation />;
};
