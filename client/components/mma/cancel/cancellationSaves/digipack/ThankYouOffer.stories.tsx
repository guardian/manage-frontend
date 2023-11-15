import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { digitalPackPaidByDirectDebit } from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { CancellationContainer } from '../../CancellationContainer';
import { ThankYouOffer } from './ThankYouOffer';

export default {
	title: 'Pages/CancellationSave/DigiPack/Thank You + Offer',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof CancellationContainer>;

export const Default: StoryObj<typeof ThankYouOffer> = {
	render: () => {
		return <ThankYouOffer />;
	},

	parameters: {
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
};
