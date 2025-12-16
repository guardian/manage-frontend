import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as currencyUtils from '@/client/utilities/currencyIso';
import * as productUtils from '@/client/utilities/productUtils';
import type { NextPaymentDetails } from '../NextPaymentDetails';
import { PaymentDetailsTableV2 } from '../PaymentDetailsTableV2';

// Mock dependencies
jest.mock('@/client/utilities/productUtils');
jest.mock('@/client/utilities/currencyIso');
jest.mock('../Buttons', () => ({
	Button: ({ text }: { text: string }) => <button>{text}</button>,
	LinkButton: ({ text }: { text: string }) => <a>{text}</a>,
}));
jest.mock('../CardDisplay', () => ({
	CardDisplay: () => <div data-testid="card-display" />,
}));
jest.mock('../DirectDebitDisplay', () => ({
	DirectDebitDisplay: () => <div data-testid="direct-debit-display" />,
}));
jest.mock('../SepaDisplay', () => ({
	SepaDisplay: () => <div data-testid="sepa-display" />,
}));
jest.mock('../assets/PaypalLogo', () => ({
	PaypalLogo: () => <div data-testid="paypal-logo">PayPal</div>,
}));
jest.mock('../NextPaymentDetails', () => ({
	NewPaymentPriceAlert: () => <span data-testid="new-price-alert">NEW</span>,
}));

const mockIsMonthlySubscription =
	productUtils.isMonthlySubscription as jest.MockedFunction<
		typeof productUtils.isMonthlySubscription
	>;
const mockConvertCurrencyToSymbol =
	currencyUtils.convertCurrencyToSymbol as jest.MockedFunction<
		typeof currencyUtils.convertCurrencyToSymbol
	>;

describe('PaymentDetailsTableV2', () => {
	const mockProductDetail = {
		subscription: {
			subscriptionId: 'sub-123',
			nextPaymentDate: '2025-12-31',
			autoRenew: true,
			card: {
				last4: '4242',
				type: 'Visa',
				expiry: { month: 12, year: 2025 },
				stripePublicKeyForUpdate: 'pk_test_123',
			},
			renewalDate: '2025-12-31',
			currentPlans: [],
			futurePlans: [],
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
	};

	const mockProductType = {
		productType: 'supporterplus',
		urlPart: 'support',
		productTitle: jest.fn(() => 'Supporter Plus'),
	};

	const mockNextPaymentDetails: NextPaymentDetails = {
		paymentInterval: 'month',
		nextPaymentDateKey: 'Next Payment Date',
		nextPaymentDateValue: '31 Dec 2025',
		paymentKey: 'Next Payment',
		paymentValue: '£10.00',
		paymentValueShort: '£10',
	};

	beforeEach(() => {
		jest.clearAllMocks();
		mockConvertCurrencyToSymbol.mockReturnValue('£');
	});

	describe('Basic Rendering', () => {
		it('renders payment details table', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
				/>,
			);

			expect(
				screen.getByRole('region', { name: 'Product details' }),
			).toBeInTheDocument();
		});

		it('renders payment method for paid tier', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={undefined}
					hasCancellationPending={false}
				/>,
			);

			expect(screen.getByTestId('card-display')).toBeInTheDocument();
		});

		it('renders FREE for non-paid tier', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			const nonPaidProduct = { ...mockProductDetail, isPaidTier: false };

			render(
				<PaymentDetailsTableV2
					productDetail={nonPaidProduct as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={undefined}
					hasCancellationPending={false}
				/>,
			);

			expect(screen.getByText('FREE')).toBeInTheDocument();
		});
	});

	describe('Billing Frequency Switch', () => {
		it('shows switch to annual button for monthly subscriptions with preview', () => {
			const mockPreview = {
				currency: 'GBP',
				previewInvoices: [],
				currentContribution: {
					amount: 0,
					period: 'month' as const,
				},
				newPrice: {
					amount: 100,
					period: 'year' as const,
				},
				savings: {
					amount: 20,
					period: 'year' as const,
				},
				currentDiscount: {
					amount: 0,
					period: 'month' as const,
				},
			};

			mockIsMonthlySubscription.mockReturnValue(true);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
					billingFrequencySwitchPreview={mockPreview}
				/>,
			);

			expect(
				screen.getByText('Switch to annual plan'),
			).toBeInTheDocument();
			expect(screen.getByText('Switch and save £20')).toBeInTheDocument();
		});

		it('does not show switch button for annual subscriptions', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
				/>,
			);

			expect(
				screen.queryByText('Switch to annual plan'),
			).not.toBeInTheDocument();
		});

		it('does not show switch button when no preview provided', () => {
			mockIsMonthlySubscription.mockReturnValue(true);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
				/>,
			);

			expect(
				screen.queryByText('Switch to annual plan'),
			).not.toBeInTheDocument();
		});

		it('does not show switch button when user has contribution', () => {
			const mockPreview = {
				currency: 'GBP',
				previewInvoices: [],
				currentContribution: {
					amount: 5,
					period: 'month' as const,
				},
				newPrice: {
					amount: 100,
					period: 'year' as const,
				},
				savings: {
					amount: 20,
					period: 'year' as const,
				},
				currentDiscount: {
					amount: 0,
					period: 'month' as const,
				},
			};

			mockIsMonthlySubscription.mockReturnValue(true);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
					billingFrequencySwitchPreview={mockPreview}
				/>,
			);

			expect(
				screen.queryByText('Switch to annual plan'),
			).not.toBeInTheDocument();
		});
	});

	describe('Conditional Row Rendering', () => {
		it('hides next payment row when autoRenew is false', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			const noAutoRenewProduct = {
				...mockProductDetail,
				subscription: {
					...mockProductDetail.subscription,
					autoRenew: false,
				},
			};

			render(
				<PaymentDetailsTableV2
					productDetail={noAutoRenewProduct as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
				/>,
			);

			expect(
				screen.queryByText('Next Payment Date'),
			).not.toBeInTheDocument();
		});

		it('hides next payment row when cancellation pending', () => {
			mockIsMonthlySubscription.mockReturnValue(false);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={true}
				/>,
			);

			expect(
				screen.queryByText('Next Payment Date'),
			).not.toBeInTheDocument();
		});
	});
});
