import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import {
	digitalDD,
	guardianWeeklyCard,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';
import ManageProduct from './manageProduct';

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
		state: { productDetail: guardianWeeklyCard },
	},
};

export const DigitalSubscription = Template.bind({});
DigitalSubscription.parameters = {
	reactRouter: {
		state: { productDetail: digitalDD },
	},
};

export const NewspaperSubscriptionCard = Template.bind({});
NewspaperSubscriptionCard.parameters = {
	reactRouter: {
		state: { productDetail: newspaperVoucherPaypal },
	},
};
