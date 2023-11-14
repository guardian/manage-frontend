import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { ManageProductV2 } from '@/client/components/mma/accountoverview/manageProducts/ManageProductV2';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { digitalPackPaidByDirectDebit } from '../../../../fixtures/productBuilder/testProducts';

export default {
	title: 'Pages/ManageProductV2',
	component: ManageProductV2,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ManageProductV2>;

export const DigitalSubscription: StoryObj<typeof ManageProductV2> = {
	render: () => {
		return <ManageProductV2 productType={PRODUCT_TYPES.digipack} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: digitalPackPaidByDirectDebit() },
		},
	},
};
