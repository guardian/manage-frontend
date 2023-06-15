import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyPaidByCard,
	newspaperVoucherPaidByPaypal,
} from '../../../fixtures/productBuilder/testProducts';
import { ManageProduct } from './ManageProduct';

export default {
	title: 'Pages/ManageProduct',
	component: ManageProduct,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof ManageProduct>;

const Template: StoryFn<typeof ManageProduct> = () => (
	<ManageProduct groupedProductType={GROUPED_PRODUCT_TYPES.subscriptions} />
);

export const GuardianWeekly = Template.bind({});
GuardianWeekly.parameters = {
	reactRouter: {
		state: { productDetail: guardianWeeklyPaidByCard() },
	},
};

export const DigitalSubscription = Template.bind({});
DigitalSubscription.parameters = {
	reactRouter: {
		state: { productDetail: digitalPackPaidByDirectDebit() },
	},
};

export const NewspaperSubscriptionCard = Template.bind({});
NewspaperSubscriptionCard.parameters = {
	reactRouter: {
		state: { productDetail: newspaperVoucherPaidByPaypal() },
	},
};
