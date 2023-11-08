import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { DigiSubDiscountConfirm } from '@/client/components/mma/cancel/digipack/digisubCancellationSaves/DigiSubDiscountConfirm';
import { digitalPackPaidByDirectDebit } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';

export default {
	title: 'Pages/DigiSub',
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

export const DigiSubThankYouPage: StoryFn<
	typeof DigiSubDiscountConfirm
> = () => {
	return <DigiSubDiscountConfirm />;
};

/*export const DigiSubCancellationOptionsPage: StoryFn<
	typeof DigiSubCancellationOptions
> = () => {
	return <DigiSubCancellationOptions />;
};

export const DigiSubOffersPage: StoryFn<typeof DigiSubOffers> = () => {
	return <DigiSubOffers />;
};

export const ConfirmDigiSubCancellationPage: StoryFn<
	typeof ConfirmDigiSubCancellation
> = () => {
	return <ConfirmDigiSubCancellation />;
}
 */
