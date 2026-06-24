import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { supporterPlus } from '../../../fixtures/productBuilder/testProducts';
import { BillingUpdateContext } from './BillingDetailUpdateContainer';
import {
	BillingDetailUpdateSwitchFrequency,
	BillingDetailUpdateSwitchFrequencyDisplayError,
	BillingDetailUpdateSwitchFrequencyDisplayForm,
	BillingDetailUpdateSwitchFrequencyDisplaySuccess,
} from './BillingDetailUpdateSwitchFrequency';

export default {
	title: 'Pages/Billing/SwitchFrequency',
	component: BillingDetailUpdateSwitchFrequency,
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
 * Helper: renders the switch-frequency nested route tree inside a MemoryRouter.
 * `initialPath` controls which child route is rendered (e.g. "" for the form,
 * "success" for the success route, "error" for the error route).
 * `state` is placed on the initial history entry so `useLocation().state` works
 * inside the component.
 */
const SwitchFrequencyStory = ({
	preview,
	initialPath = '',
}: {
	preview: BillingFrequencySwitchPreview;
	initialPath?: 'success' | 'error' | '';
}) => {
	const productDetail = supporterPlus();
	const basePath = '/billing/support/switch-frequency';
	const fullPath = initialPath ? `${basePath}/${initialPath}` : basePath;

	return (
		<BillingUpdateContext.Provider
			value={{ productDetail, isFromApp: false }}
		>
			<MemoryRouter
				initialEntries={[{ pathname: fullPath, state: { preview } }]}
			>
				<Routes>
					<Route
						path="/billing/support/switch-frequency"
						element={
							<BillingDetailUpdateSwitchFrequency
								productType={PRODUCT_TYPES.supporterplus}
							/>
						}
					>
						<Route
							index
							element={
								<BillingDetailUpdateSwitchFrequencyDisplayForm />
							}
						/>
						<Route
							path="success"
							element={
								<BillingDetailUpdateSwitchFrequencyDisplaySuccess />
							}
						/>
						<Route
							path="error"
							element={
								<BillingDetailUpdateSwitchFrequencyDisplayError />
							}
						/>
					</Route>
				</Routes>
			</MemoryRouter>
		</BillingUpdateContext.Provider>
	);
};

/**
 * Story showing the switch billing frequency form with savings
 * for a monthly Supporter Plus subscription with zero contributions.
 */
export const SwitchFrequencyFormWithSavings: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => <SwitchFrequencyStory preview={mockPreviewWithSavings} />,
};

/**
 * Story showing the switch billing frequency form with zero savings
 * for a monthly Supporter Plus subscription with zero contributions.
 */
export const SwitchFrequencyFormZeroSavings: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => <SwitchFrequencyStory preview={mockPreviewZeroSavings} />,
};

/**
 * Story showing the success page after successfully switching
 * billing frequency from monthly to annual.
 */
export const SwitchFrequencySuccess: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => (
		<SwitchFrequencyStory
			preview={mockPreviewWithSavings}
			initialPath="success"
		/>
	),
	parameters: {
		msw: [
			http.post(
				'/api/product-switch/billing-frequency/:subscriptionId',
				() => HttpResponse.json({ invoiceIds: ['INV-123'] }),
			),
		],
	},
};

/**
 * Story showing the error page when switching billing frequency fails.
 */
export const SwitchFrequencyError: StoryObj<
	typeof BillingDetailUpdateSwitchFrequency
> = {
	render: () => (
		<SwitchFrequencyStory
			preview={mockPreviewWithSavings}
			initialPath="error"
		/>
	),
};
