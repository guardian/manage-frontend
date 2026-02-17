import type { Decorator, Meta, StoryFn } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { useEffect } from 'react';
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

/**
 * Decorator that pre-populates the UpgradeProductStore with mainPlan,
 * subscription, and previewResponse. This simulates the state the store
 * would be in after the ProductCard prefetch completes successfully.
 */
const createStorePopulatorDecorator = (
	productDetail: ProductDetail,
	previewResponse: UpgradePreviewResponse,
): Decorator => {
	const StorePopulator: Decorator = (Story) => {
		const { setMainPlan, setSubscription, setPreviewResponse } =
			useUpgradeProductStore();

		useEffect(() => {
			const mainPlan = getMainPlan(
				productDetail.subscription,
			) as PaidSubscriptionPlan;
			setMainPlan(mainPlan);
			setSubscription(productDetail.subscription);
			setPreviewResponse(previewResponse);
		}, [setMainPlan, setSubscription, setPreviewResponse]);

		return <Story />;
	};
	return StorePopulator;
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
InformationMonthly.decorators = [
	createStorePopulatorDecorator(
		supporterPlus(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
InformationMonthly.parameters = {
	reactRouter: {
		container: <UpgradeProductContainer />,
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
		container: <UpgradeProductContainer />,
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
		container: <UpgradeProductContainer />,
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
		container: <UpgradeProductContainer />,
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
ConfirmationPayPal.decorators = [
	createStorePopulatorDecorator(
		supporterPlusPayPal(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationPayPal.parameters = {
	reactRouter: {
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
ConfirmationSepa.decorators = [
	createStorePopulatorDecorator(
		supporterPlusSepa(),
		mockUpgradePreviewResponseMonthlyGBP,
	),
];
ConfirmationSepa.parameters = {
	reactRouter: {
		container: <UpgradeProductContainer />,
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
		container: <UpgradeProductContainer />,
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
		container: <UpgradeProductContainer />,
	},
};
