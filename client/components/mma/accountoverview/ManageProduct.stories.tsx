import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { featureSwitches } from '../../../../shared/featureSwitches';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	digitalPackPaidByDirectDebit,
	guardianAdLite,
	guardianWeeklyPaidByCard,
	monthlyContributionPaidByCard,
	newspaperVoucherPaidByPaypal,
	supporterPlusAnnual,
	supporterPlusMonthlyAllAccessDigital,
	tierThree,
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

export const TierThree: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.tierthree} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: tierThree() },
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

export const Contribution: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.contributions} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: monthlyContributionPaidByCard() },
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

export const SupporterPlusAllAccessDigital: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.supporterplus} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: supporterPlusMonthlyAllAccessDigital() },
		},
	},
};

export const GuardianAdLite: StoryObj<typeof ManageProduct> = {
	render: () => {
		return <ManageProduct productType={PRODUCT_TYPES.guardianadlite} />;
	},

	parameters: {
		reactRouter: {
			state: { productDetail: guardianAdLite() },
		},
	},
};
