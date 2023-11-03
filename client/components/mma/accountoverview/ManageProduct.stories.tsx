import type { Meta, StoryObj } from '@storybook/react';
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

export const GuardianWeekly: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.guardianweekly} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyPaidByCard() },
		},
	},
};

export const DigitalSubscription: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.digipack} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: digitalPackPaidByDirectDebit() },
		},
	},
};

export const NewspaperSubscriptionCard: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.digitalvoucher} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: newspaperVoucherPaidByPaypal() },
		},
	},
};

featureSwitches.supporterPlusUpdateAmount = true;

export const SupporterPlus: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.supporterplus} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: supporterPlusAnnual() },
		},
	},
};
