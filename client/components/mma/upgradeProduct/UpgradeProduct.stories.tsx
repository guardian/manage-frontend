import type { Decorator, Meta, StoryFn } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { useEffect } from 'react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import type { UpgradePreviewResponse } from '../../../../shared/productSwitchTypes';
import { baseSupporterPlus } from '../../../fixtures/productBuilder/baseProducts';
import { ProductBuilder } from '../../../fixtures/productBuilder/productBuilder';
import {
	supporterPlus,
	supporterPlusAnnual,
} from '../../../fixtures/productBuilder/testProducts';
import { useAccountStore } from '../../../stores/AccountStore';
import { useUpgradeProductStore } from '../../../stores/UpgradeProductStore';
import { UpgradeProductConfirmation } from './UpgradeProductConfirmation';
import { UpgradeProductContainer } from './UpgradeProductContainer';
import { UpgradeProductInformation } from './UpgradeProductInformation';
import { UpgradeProductThankYou } from './UpgradeProductThankYou';

// Payment method fixtures
const supporterPlusDirectDebit = () =>
	new ProductBuilder(baseSupporterPlus())
		.payByDirectDebit()
		.getProductDetailObject();

const supporterPlusPayPal = () =>
	new ProductBuilder(baseSupporterPlus())
		.payByPayPal()
		.getProductDetailObject();

const supporterPlusSepa = () =>
	new ProductBuilder(baseSupporterPlus())
		.payBySepa()
		.getProductDetailObject();

const ResetStoresDecorator: Decorator = (Story) => {
	const clearUpgradeStore = useUpgradeProductStore(
		(state) => state.clearStore,
	);
	const clearAccountStore = useAccountStore((state) => state.clearAccount);

	useEffect(() => {
		clearUpgradeStore();
		clearAccountStore();
	}, [clearUpgradeStore, clearAccountStore]);

	return <Story />;
};

const mockUpgradePreviewResponseMonthlyGBP: UpgradePreviewResponse = {
	amountPayableToday: 5.5,
	proratedRefundAmount: 4.5,
	targetCatalogPrice: 14.99,
	nextPaymentDate: '2026-03-15',
};

const mockUpgradePreviewResponseAnnualGBP: UpgradePreviewResponse = {
	amountPayableToday: 55.0,
	proratedRefundAmount: 45.0,
	targetCatalogPrice: 149.0,
	nextPaymentDate: '2027-01-15',
};

const mswHandlersSuccess = (previewResponse: UpgradePreviewResponse) => [
	http.post('/api/subscriptions/*/change-plan/preview', () => {
		return HttpResponse.json(previewResponse);
	}),
	http.post('/api/subscriptions/*/change-plan', () => {
		return HttpResponse.json({ success: true });
	}),
];

export default {
	title: 'Pages/UpgradeProduct',
	component: UpgradeProductContainer,
	decorators: [ResetStoresDecorator, ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof UpgradeProductContainer>;

export const InformationMonthly: StoryFn<
	typeof UpgradeProductInformation
> = () => {
	return <UpgradeProductInformation />;
};
InformationMonthly.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlus() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};

export const InformationAnnual: StoryFn<
	typeof UpgradeProductInformation
> = () => {
	return <UpgradeProductInformation />;
};
InformationAnnual.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusAnnual() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseAnnualGBP),
};

export const ConfirmationMonthly: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationMonthly.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlus() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};

export const ConfirmationAnnual: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationAnnual.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusAnnual() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseAnnualGBP),
};

export const ConfirmationDirectDebit: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationDirectDebit.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusDirectDebit() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationDirectDebit.storyName = 'Confirmation - Direct Debit';

export const ConfirmationPayPal: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationPayPal.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusPayPal() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationPayPal.storyName = 'Confirmation - PayPal';

export const ConfirmationSepa: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationSepa.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusSepa() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationSepa.storyName = 'Confirmation - SEPA';

export const ThankYouMonthly: StoryFn<typeof UpgradeProductThankYou> = () => {
	return <UpgradeProductThankYou />;
};
ThankYouMonthly.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlus() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};

export const ThankYouAnnual: StoryFn<typeof UpgradeProductThankYou> = () => {
	return <UpgradeProductThankYou />;
};
ThankYouAnnual.parameters = {
	reactRouter: {
		state: { productDetail: supporterPlusAnnual() },
		container: <UpgradeProductContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseAnnualGBP),
};
