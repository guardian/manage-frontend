import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyPaidByCard,
	newspaperVoucherPaidByPaypal,
	supporterPlusAnnual,
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

export const GuardianWeekly: StoryFn<typeof ManageProduct> = () => {
	return <ManageProduct productType={PRODUCT_TYPES.guardianweekly} />;
};

GuardianWeekly.parameters = {
	reactRouter: {
		state: { productDetail: guardianWeeklyPaidByCard() },
	},
};

export const DigitalSubscription: StoryFn<typeof ManageProduct> = () => {
	return <ManageProduct productType={PRODUCT_TYPES.digipack} />;
};

DigitalSubscription.parameters = {
	reactRouter: {
		state: { productDetail: digitalPackPaidByDirectDebit() },
	},
};

export const NewspaperSubscriptionCard: StoryFn<typeof ManageProduct> = () => {
	return <ManageProduct productType={PRODUCT_TYPES.digitalvoucher} />;
};

NewspaperSubscriptionCard.parameters = {
	reactRouter: {
		state: { productDetail: newspaperVoucherPaidByPaypal() },
	},
};

featureSwitches.supporterPlusUpdateAmount = true;
export const SupporterPlus: StoryFn<typeof ManageProduct> = () => {
	return <ManageProduct productType={PRODUCT_TYPES.supporterplus} />;
};

SupporterPlus.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusAnnual() },
	},
};
