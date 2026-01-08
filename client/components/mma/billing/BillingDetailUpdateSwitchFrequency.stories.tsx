import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { supporterPlus } from '../../../fixtures/productBuilder/testProducts';
import { BillingUpdateContext } from './BillingDetailUpdateContainer';
import { BillingDetailUpdateSwitchFrequency } from './BillingDetailUpdateSwitchFrequency';

export default {
	title: 'Pages/Billing/SwitchFrequency',
	component: BillingDetailUpdateSwitchFrequency,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof BillingDetailUpdateSwitchFrequency>;

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
 * Story showing the switch billing frequency screen with savings
 * for a monthly Supporter Plus subscription with zero contributions.
 */
export const SwitchFrequencyFormWithSavings: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<BillingUpdateContext.Provider
				value={{
					productDetail,
					isFromApp: false,
				}}
			>
				<BillingDetailUpdateSwitchFrequency
					productType={PRODUCT_TYPES.supporterplus}
				/>
			</BillingUpdateContext.Provider>
		);
	},

	parameters: {
		reactRouter: {
			state: {
				preview: mockPreviewWithSavings,
			},
		},
	},
};

/**
 * Story showing the switch billing frequency screen with zero savings
 * for a monthly Supporter Plus subscription with zero contributions.
 */
export const SwitchFrequencyFormZeroSavings: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<BillingUpdateContext.Provider
				value={{
					productDetail,
					isFromApp: false,
				}}
			>
				<BillingDetailUpdateSwitchFrequency
					productType={PRODUCT_TYPES.supporterplus}
				/>
			</BillingUpdateContext.Provider>
		);
	},

	parameters: {
		reactRouter: {
			state: {
				preview: mockPreviewZeroSavings,
			},
		},
	},
};

/**
 * Story showing the success message after successfully switching
 * billing frequency from monthly to annual.
 */
export const SwitchFrequencySuccess: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => {
		// supporterPlus() already returns a monthly subscription by default
		const productDetail = supporterPlus();

		return (
			<BillingUpdateContext.Provider
				value={{
					productDetail,
					isFromApp: false,
				}}
			>
				<BillingDetailUpdateSwitchFrequency
					productType={PRODUCT_TYPES.supporterplus}
				/>
			</BillingUpdateContext.Provider>
		);
	},

	parameters: {
		reactRouter: {
			state: {
				preview: mockPreviewWithSavings,
			},
		},
		msw: [
			// Mock successful switch API call
			http.post(
				'/api/product-switch/billing-frequency/:subscriptionId',
				() => {
					return HttpResponse.json({
						invoiceIds: ['INV-123'],
					});
				},
			),
		],
	},

	play: async ({ canvasElement }) => {
		// Auto-click the confirm button to show success state
		const canvas = canvasElement;
		// Wait a bit for the component to render
		await new Promise((resolve) => setTimeout(resolve, 500));

		const confirmButton = canvas.querySelector(
			'button[aria-label*="Confirm annual plan"]',
		) as HTMLButtonElement;

		if (confirmButton) {
			confirmButton.click();
		}
	},
};
