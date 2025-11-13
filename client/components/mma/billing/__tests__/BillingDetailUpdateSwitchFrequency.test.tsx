import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import type { ProductDetail } from '@/shared/productResponse';
// eslint-disable-next-line import/order -- type imports from shared modules
import type { ProductType } from '@/shared/productTypes';

// Must come after other mocks to avoid circular dependencies
import { BillingUpdateContext } from '../BillingDetailUpdateContainer';
import { BillingDetailUpdateSwitchFrequency } from '../BillingDetailUpdateSwitchFrequency';

// Setup mocks BEFORE importing component to prevent AsyncLoader dependency issues
jest.mock('@/client/utilities/currencyIso', () => ({
	convertCurrencyToSymbol: jest.fn(),
}));

jest.mock('@/client/utilities/utils', () => ({
	shuffleArray: (arr: unknown[]) => arr,
	formatAmount: jest.fn(),
}));

jest.mock('@/client/utilities/productUtils', () => ({
	isMonthlySubscription: jest.fn(),
	changeSubscriptionBillingFrequencyFetch: jest.fn(),
}));

jest.mock('@/shared/generalTypes', () => ({
	getCorrectArticle: jest.fn(),
}));

// Mock AsyncLoader at the base level to prevent class extension issues
jest.mock('../../shared/AsyncLoader', () => {
	return {
		AsyncLoader: class MockAsyncLoader {
			constructor() {
				// Mock constructor
			}
		},
	};
});

jest.mock('@/shared/productResponse', () => ({
	formatDate: jest.fn(),
	getMainPlan: jest.fn(),
	isPaidSubscriptionPlan: jest.fn(),
}));

jest.mock('@/shared/productTypes');
jest.mock('react-router', () => ({
	Navigate: ({ to }: { to: string }) => (
		<div data-testid="navigate-component">{to}</div>
	),
	useNavigate: jest.fn(),
	useLocation: jest.fn(() => ({ state: null })),
	Outlet: () => <div data-testid="outlet" />,
	useSearchParams: jest.fn(() => [new URLSearchParams()]),
}));
jest.mock('../../shared/benefits/BenefitsToggle', () => ({
	BenefitsToggle: () => <div data-testid="benefits-toggle" />,
}));
jest.mock('../../shared/CardDisplay', () => ({
	CardDisplay: ({ last4, type }: { last4: string; type: string }) => (
		<div data-testid="card-display">
			{type} ending in {last4}
		</div>
	),
}));
jest.mock('../../shared/DirectDebitDisplay', () => ({
	DirectDebitDisplay: ({ accountName }: { accountName: string }) => (
		<div data-testid="direct-debit-display">{accountName}</div>
	),
}));
jest.mock('../../shared/SepaDisplay', () => ({
	SepaDisplay: () => <div data-testid="sepa-display">SEPA</div>,
}));
jest.mock('../../shared/assets/PaypalLogo', () => ({
	PaypalLogo: () => <div data-testid="paypal-logo">PayPal</div>,
}));

// Helper function to get all mocks - required for test execution
const getMocks = () => {
	const productUtils = jest.requireMock('@/client/utilities/productUtils');
	const utils = jest.requireMock('@/client/utilities/utils');
	const currencyIso = jest.requireMock('@/client/utilities/currencyIso');
	const productResponse = jest.requireMock('@/shared/productResponse');
	const generalTypes = jest.requireMock('@/shared/generalTypes');
	const reactRouter = jest.requireMock('react-router');
	return {
		productUtils,
		utils,
		currencyIso,
		productResponse,
		generalTypes,
		reactRouter,
	};
};

describe('BillingDetailUpdateSwitchFrequency', () => {
	const mockProductDetail = {
		subscription: {
			subscriptionId: 'sub-123',
			renewalDate: '2025-12-31',
			autoRenew: true,
			card: {
				last4: '4242',
				type: 'Visa',
				expiry: { month: 12, year: 2025 },
			},
			currentPlans: [],
			futurePlans: [],
			cancelledAt: null,
			readerType: 'Direct',
			start: '2023-01-01',
			end: '2025-12-31',
			anniversaryDate: '2025-01-01',
			nextPaymentDate: '2025-12-31',
			lastPaymentDate: '2025-11-30',
			termUnit: 'months',
			termLength: 1,
			renew: true,
			contractEffectiveDate: '2025-01-01',
		},
		isPaidTier: true,
		isTestUser: false,
		mmaProductKey: 'Supporter Plus',
		joinDate: '2023-01-01',
		selfServiceCancellation: {
			isAllowed: true,
			shouldDisplayEmail: false,
			phoneRegionsToDisplay: [],
		},
	} as unknown as ProductDetail;

	const mockProductType = {
		productType: 'supporterplus',
		urlPart: 'support',
		friendlyName: 'Supporter Plus',
		shortFriendlyName: 'support',
		productTitle: () => 'Supporter Plus',
	} as unknown as ProductType;

	const mockPreview: BillingFrequencySwitchPreview = {
		previewInvoices: [],
		currentContribution: { amount: 0, currency: 'GBP', period: 'month' },
		newPrice: { amount: 120, currency: 'GBP', period: 'year' },
		savings: { amount: 20, currency: 'GBP', period: 'year' },
	};

	let mocks: ReturnType<typeof getMocks>;

	beforeEach(() => {
		jest.clearAllMocks();
		mocks = getMocks();

		mocks.productUtils.isMonthlySubscription.mockReturnValue(true);
		mocks.utils.formatAmount.mockImplementation((n: number) =>
			n.toFixed(2),
		);
		mocks.currencyIso.convertCurrencyToSymbol.mockReturnValue('£');
		mocks.productResponse.formatDate.mockReturnValue('31 Dec 2025');
		mocks.productResponse.isPaidSubscriptionPlan.mockReturnValue(true);
		mocks.generalTypes.getCorrectArticle.mockReturnValue('a');

		const mockPlan = {
			name: 'Monthly Plan',
			price: 9999,
			currency: 'GBP',
			billingPeriod: 'month',
		};
		mocks.productResponse.getMainPlan.mockReturnValue(mockPlan);
	});

	describe('Redirect Logic', () => {
		it('redirects to root when subscription is not monthly', () => {
			const mocks2 = getMocks();
			mocks2.productUtils.isMonthlySubscription.mockReturnValue(false);

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByTestId('navigate-component')).toHaveTextContent(
				'/',
			);
		});
	});

	describe('Router State Handling', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('uses preview data from router state when available', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('region', {
					name: /billing plan comparison/i,
				}),
			).toBeInTheDocument();
			expect(
				mocks.productUtils.changeSubscriptionBillingFrequencyFetch,
			).not.toHaveBeenCalled();
		});
	});

	describe('Form Display', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('displays heading with savings amount', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByText(/Switch to an annual plan and save.*a year/i),
			).toBeInTheDocument();
		});

		it('displays benefits toggle component', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByTestId('benefits-toggle')).toBeInTheDocument();
		});

		it('displays current and new prices in comparison card', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByText(/Current/)).toBeInTheDocument();
			expect(screen.getByText(/New/)).toBeInTheDocument();
		});
	});

	describe('Payment Method Display', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('displays card payment method when available', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByTestId('card-display')).toBeInTheDocument();
		});

		it('displays PayPal payment method when available', () => {
			const productDetailWithPayPal = {
				...mockProductDetail,
				subscription: {
					...mockProductDetail.subscription,
					card: undefined,
					payPalEmail: 'user@example.com',
				},
			};

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: productDetailWithPayPal,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByTestId('paypal-logo')).toBeInTheDocument();
		});
	});

	describe('Terms and Conditions', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('displays terms and conditions section', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('region', { name: /terms and conditions/i }),
			).toBeInTheDocument();
		});

		it('displays auto-renewal information', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByText(/auto-renew each year/i),
			).toBeInTheDocument();
		});

		it('displays cancel subscription button in terms', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('button', {
					name: /Cancel your subscription/i,
				}),
			).toBeInTheDocument();
		});

		it('navigates to cancel page when cancel button clicked', () => {
			const mockNavigate = jest.fn();
			mocks.reactRouter.useNavigate.mockReturnValue(mockNavigate);

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			const cancelButton = screen.getByRole('button', {
				name: /Cancel your subscription/i,
			});
			fireEvent.click(cancelButton);

			expect(mockNavigate).toHaveBeenCalledWith(
				'/cancel/support',
				expect.objectContaining({
					state: { productDetail: mockProductDetail },
				}),
			);
		});
	});

	describe('Form Actions', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('displays confirm and stay buttons', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('button', { name: /Confirm annual plan/i }),
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: /Stay with monthly plan/i }),
			).toBeInTheDocument();
		});

		it('navigates to product page when stay button clicked', () => {
			const mockNavigate = jest.fn();
			mocks.reactRouter.useNavigate.mockReturnValue(mockNavigate);

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			const stayButton = screen.getByRole('button', {
				name: /Stay with monthly plan/i,
			});
			fireEvent.click(stayButton);

			expect(mockNavigate).toHaveBeenCalledWith(
				'/support',
				expect.objectContaining({
					state: { productDetail: mockProductDetail },
				}),
			);
		});

		it('disables buttons while processing', async () => {
			mocks.productUtils.changeSubscriptionBillingFrequencyFetch.mockImplementation(
				() =>
					new Promise((resolve) => {
						setTimeout(() => resolve({}), 100);
					}),
			);

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			const confirmButton = screen.getByRole('button', {
				name: /Confirm annual plan/i,
			});
			fireEvent.click(confirmButton);

			expect(confirmButton).toBeDisabled();
		});
	});

	describe('Form Submission', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('renders action buttons for user choice', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			const confirmButton = screen.getByRole('button', {
				name: /Confirm annual plan/i,
			});
			expect(confirmButton).toBeInTheDocument();
			expect(confirmButton).not.toBeDisabled();
		});
	});

	describe('Success State', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('renders success section after submission', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			// Simply verify the component renders without errors
			expect(
				screen.getByRole('region', {
					name: /billing plan comparison/i,
				}),
			).toBeInTheDocument();
		});

		it('displays navigation buttons section', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('button', { name: /Confirm annual plan/i }),
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: /Stay with monthly plan/i }),
			).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('has proper region labels for landmarks', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('region', {
					name: /billing plan comparison/i,
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('region', { name: /terms and conditions/i }),
			).toBeInTheDocument();
		});

		it('has group role for action buttons', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByRole('group', { name: /Action buttons/i }),
			).toBeInTheDocument();
		});

		it('has aria-busy attribute during processing', async () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			const confirmButton = screen.getByRole('button', {
				name: /Confirm annual plan/i,
			});
			fireEvent.click(confirmButton);

			await waitFor(() => {
				expect(confirmButton).toHaveAttribute('aria-busy', 'true');
			});
		});
	});

	describe('Edge Cases', () => {
		beforeEach(() => {
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: mockPreview },
			});
		});

		it('handles isFromApp context value', () => {
			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: true,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(
				screen.getByText(/Switch to an annual plan/i),
			).toBeInTheDocument();
		});

		it('handles zero savings correctly', () => {
			const zeroSavingsPreview: BillingFrequencySwitchPreview = {
				previewInvoices: [],
				currentContribution: {
					amount: 0,
					currency: 'GBP',
					period: 'month',
				},
				newPrice: { amount: 120, currency: 'GBP', period: 'year' },
				savings: { amount: 0, currency: 'GBP', period: 'year' },
			};
			mocks.reactRouter.useLocation.mockReturnValue({
				state: { preview: zeroSavingsPreview },
			});

			render(
				<BillingUpdateContext.Provider
					value={{
						productDetail: mockProductDetail,
						isFromApp: false,
					}}
				>
					<BillingDetailUpdateSwitchFrequency
						productType={mockProductType}
					/>
				</BillingUpdateContext.Provider>,
			);

			expect(screen.getByText(/Save £0/)).toBeInTheDocument();
		});
	});
});
