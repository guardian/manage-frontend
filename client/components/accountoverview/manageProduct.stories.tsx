import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../../.storybook/ReactRouterDecorator';

import ManageProduct from './manageProduct';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';

import {
	guardianWeeklyCard,
	digitalDD,
	newspaperVoucherPaypal,
} from '../../fixtures/productDetail';

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