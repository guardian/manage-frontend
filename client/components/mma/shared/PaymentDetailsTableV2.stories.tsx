import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	supporterPlus,
	supporterPlusAnnual,
} from '../../../fixtures/productBuilder/testProducts';
import type { NextPaymentDetails } from './NextPaymentDetails';
import { PaymentDetailsTableV2 } from './PaymentDetailsTableV2';

export default {
	title: 'Components/Shared/PaymentDetailsTableV2',
	component: PaymentDetailsTableV2,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'padded',
	},
} as Meta<typeof PaymentDetailsTableV2>;

const mockNextPaymentDetails: NextPaymentDetails = {
	paymentInterval: 'month',
	paymentKey: 'Next payment',
	paymentValue: '£12.00',
	paymentValueShort: '£12',
	isNewPaymentValue: false,
	nextPaymentDateKey: 'Next payment date',
	nextPaymentDateValue: '31 Dec 2025',
};

const mockPreviewWithSavings: BillingFrequencySwitchPreview = {
	currency: 'GBP',
	previewInvoices: [],
	currentContribution: {
		amount: 0,
		period: 'month',
	},
	newPrice: {
		amount: 120,
		period: 'year',
	},
	savings: {
		amount: 20,
		period: 'year',
	},
};

const mockPreviewZeroSavings: BillingFrequencySwitchPreview = {
	currency: 'GBP',
	previewInvoices: [],
	currentContribution: {
		amount: 0,
		period: 'month',
	},
	newPrice: {
		amount: 120,
		period: 'year',
	},
	savings: {
		amount: 0,
		period: 'year',
	},
};

/**
 * Story showing the payment details table with a switch to annual button
 * for a monthly Supporter Plus subscription with zero contributions and savings.
 */
export const MonthlySupporterPlusWithSwitchButton: StoryObj<
	typeof PaymentDetailsTableV2
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<PaymentDetailsTableV2
				productDetail={productDetail}
				specificProductType={PRODUCT_TYPES.supporterplus}
				nextPaymentDetails={mockNextPaymentDetails}
				hasCancellationPending={false}
				billingFrequencySwitchPreview={mockPreviewWithSavings}
			/>
		);
	},

	parameters: {
		msw: [
			http.post(
				'/api/product-switch/billing-frequency/:subscriptionId',
				() => {
					return HttpResponse.json({
						currency: 'GBP',
						previewInvoices: [],
						currentContribution: {
							amount: 0,
							period: 'month',
						},
						newPrice: {
							amount: 120,
							period: 'year',
						},
						savings: {
							amount: 20,
							period: 'year',
						},
					});
				},
			),
		],
	},
};

/**
 * Story showing the payment details table with switch button showing zero savings.
 */
export const MonthlySupporterPlusWithSwitchButtonZeroSavings: StoryObj<
	typeof PaymentDetailsTableV2
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<PaymentDetailsTableV2
				productDetail={productDetail}
				specificProductType={PRODUCT_TYPES.supporterplus}
				nextPaymentDetails={mockNextPaymentDetails}
				hasCancellationPending={false}
				billingFrequencySwitchPreview={mockPreviewZeroSavings}
			/>
		);
	},
};

/**
 * Story showing the payment details table WITHOUT switch button
 * for an annual Supporter Plus subscription.
 */
export const AnnualSupporterPlusNoSwitchButton: StoryObj<
	typeof PaymentDetailsTableV2
> = {
	render: () => {
		const productDetail = supporterPlusAnnual();

		return (
			<PaymentDetailsTableV2
				productDetail={productDetail}
				specificProductType={PRODUCT_TYPES.supporterplus}
				nextPaymentDetails={{
					...mockNextPaymentDetails,
					paymentValue: '£120.00',
				}}
				hasCancellationPending={false}
			/>
		);
	},
};

/**
 * Story showing the payment details table WITHOUT switch button
 * when there's no preview data (monthly but no preview loaded).
 */
export const MonthlySupporterPlusNoPreview: StoryObj<
	typeof PaymentDetailsTableV2
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<PaymentDetailsTableV2
				productDetail={productDetail}
				specificProductType={PRODUCT_TYPES.supporterplus}
				nextPaymentDetails={mockNextPaymentDetails}
				hasCancellationPending={false}
			/>
		);
	},
};
