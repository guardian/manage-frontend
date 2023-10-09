import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { ValueOfDigiSubSupport } from '@/client/components/mma/cancel/cancellationSaves/digisubs/ValueOfDigiSubSupport';
import { SelectReason } from '@/client/components/mma/cancel/cancellationSaves/SelectReason';
import { digitalPackPaidByDirectDebit } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';

export default {
	title: 'Pages/DigisubCancellationSave',
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

/*export const LandingPage: StoryFn<typeof DigiSubCancellationLanding> = () => {
	return <DigiSubCancellationLanding />;
};*/

export const ValueOfDigiSubsSupportPage: StoryFn<
	typeof ValueOfDigiSubSupport
> = () => {
	return <ValueOfDigiSubSupport />;
};

/*export const ConfirmDiscount: StoryFn<typeof ConfirmDigisubDiscount> = () => {
	return <ConfirmDigisubDiscount />;
};

export const ConfirmCancellation: StoryFn<
	typeof ConfirmDigisubCancellation
> = () => {
	return <ConfirmDigisubCancellation />;
};*/

export const CancellationReasons: StoryFn<typeof SelectReason> = () => {
	return <SelectReason />;
};

/*export const Reminder: StoryFn<typeof SelectReminder> = () => {
    return <SelectReminder />;
};*/
