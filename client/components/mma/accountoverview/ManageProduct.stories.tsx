import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import { newspaperVoucherPaypal } from '../../../fixtures/productDetail';
import { ManageProduct } from './ManageProduct';

export default {
	title: 'Pages/ManageProduct',
	component: ManageProduct,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ManageProduct>;

const Template: ComponentStory<typeof ManageProduct> = () => (
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
		state: { productDetail: newspaperVoucherPaypal },
	},
};
