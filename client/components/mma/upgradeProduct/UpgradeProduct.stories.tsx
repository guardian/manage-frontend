import type { Decorator, Meta, StoryFn } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import type {
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import type { UpgradePreviewResponse } from '../../../../shared/productSwitchTypes';
import { baseSupporterPlus } from '../../../fixtures/productBuilder/baseProducts';
import { ProductBuilder } from '../../../fixtures/productBuilder/productBuilder';
import {
	supporterPlus,
	supporterPlusAnnual,
} from '../../../fixtures/productBuilder/testProducts';
import { useUpgradeProductStore } from '../../../stores/UpgradeProductStore';
import { UpgradeProductConfirmation } from './UpgradeProductConfirmation';
import {
	UpgradeProductContainer,
	UpgradeProductPageContainer,
} from './UpgradeProductContainer';
import { UpgradeProductInformation } from './UpgradeProductInformation';
import { UpgradeProductThankYou } from './UpgradeProductThankYou';

const StoryPageContainer = () => (
	<UpgradeProductPageContainer>
		<Outlet />
	</UpgradeProductPageContainer>
);

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

/**
 * Decorator that synchronously pre-populates the UpgradeProductStore before
 * child components render. Stories use StoryPageContainer (layout only) instead
 * of UpgradeProductContainer to bypass the deep-link loader/redirect logic.
 */
const createStorePopulatorDecorator = (
	productDetail: ProductDetail,
	previewResponse: UpgradePreviewResponse,
): Decorator => {
	return (Story) => {
		const initialized = useRef(false);
		if (!initialized.current) {
			const store = useUpgradeProductStore.getState();
			store.clearStore();
			const mainPlan = getMainPlan(
				productDetail.subscription,
			) as PaidSubscriptionPlan;
			store.setMainPlan(mainPlan);
			store.setSubscription(productDetail.subscription);
			store.setPreviewResponse(previewResponse);
			initialized.current = true;
		}
		return <Story />;
	};
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
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof UpgradeProductContainer>;

export const InformationMonthly: StoryFn<
	typeof UpgradeProductInformation
> = () => {
	return <UpgradeProductInformation />;
};
InformationMonthly.decorators = [
	createStorePopulatorDecorator(
		supporterPlus(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
InformationMonthly.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
};

export const InformationAnnual: StoryFn<
	typeof UpgradeProductInformation
> = () => {
	return <UpgradeProductInformation />;
};
InformationAnnual.decorators = [
	createStorePopulatorDecorator(
		supporterPlusAnnual(),
		mockUpgradePreviewResponseAnnualGBP,
	),
];
InformationAnnual.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
};

export const ConfirmationMonthly: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationMonthly.decorators = [
	createStorePopulatorDecorator(
		supporterPlus(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationMonthly.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};

export const ConfirmationAnnual: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationAnnual.decorators = [
	createStorePopulatorDecorator(
		supporterPlusAnnual(),
		mockUpgradePreviewResponseAnnualGBP,
	),
];
ConfirmationAnnual.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseAnnualGBP),
};

export const ConfirmationDirectDebit: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationDirectDebit.decorators = [
	createStorePopulatorDecorator(
		supporterPlusDirectDebit(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationDirectDebit.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationDirectDebit.storyName = 'Confirmation - Direct Debit';

export const ConfirmationPayPal: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationPayPal.decorators = [
	createStorePopulatorDecorator(
		supporterPlusPayPal(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationPayPal.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationPayPal.storyName = 'Confirmation - PayPal';

export const ConfirmationSepa: StoryFn<
	typeof UpgradeProductConfirmation
> = () => {
	return <UpgradeProductConfirmation />;
};
ConfirmationSepa.decorators = [
	createStorePopulatorDecorator(
		supporterPlusSepa(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationSepa.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
	msw: mswHandlersSuccess(mockUpgradePreviewResponseMonthlyGBP),
};
ConfirmationSepa.storyName = 'Confirmation - SEPA';

export const ThankYouMonthly: StoryFn<typeof UpgradeProductThankYou> = () => {
	return <UpgradeProductThankYou />;
};
ThankYouMonthly.decorators = [
	createStorePopulatorDecorator(
		supporterPlus(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ThankYouMonthly.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
};

export const ThankYouAnnual: StoryFn<typeof UpgradeProductThankYou> = () => {
	return <UpgradeProductThankYou />;
};
ThankYouAnnual.decorators = [
	createStorePopulatorDecorator(
		supporterPlusAnnual(),
		mockUpgradePreviewResponseAnnualGBP,
	),
];
ThankYouAnnual.parameters = {
	reactRouter: {
		container: <StoryPageContainer />,
	},
};
