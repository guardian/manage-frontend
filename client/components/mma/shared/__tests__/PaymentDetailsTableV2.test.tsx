import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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
const mockChangeSubscriptionBillingFrequencyFetch =
	productUtils.changeSubscriptionBillingFrequencyFetch as jest.MockedFunction<
		typeof productUtils.changeSubscriptionBillingFrequencyFetch
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

	describe('Preview Fetch Logic', () => {
		it('fetches preview for monthly subscriptions', async () => {
			const mockResponse = {
				json: jest.fn().mockResolvedValue({
					previewInvoices: [],
					newPrice: { amount: 100, currency: 'GBP', period: 'year' },
					savings: { amount: 20, currency: 'GBP', period: 'year' },
				}),
			};

			mockIsMonthlySubscription.mockReturnValue(true);
			mockChangeSubscriptionBillingFrequencyFetch.mockResolvedValue(
				mockResponse as never as Response,
			);

			render(
				<PaymentDetailsTableV2
					productDetail={mockProductDetail as never}
					specificProductType={mockProductType as never}
					nextPaymentDetails={mockNextPaymentDetails}
					hasCancellationPending={false}
				/>,
			);

			await waitFor(() => {
				expect(
					mockChangeSubscriptionBillingFrequencyFetch,
				).toHaveBeenCalledWith(false, 'sub-123', true, 'Annual');
			});
		});

		it('does not fetch preview for annual subscriptions', () => {
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
				mockChangeSubscriptionBillingFrequencyFetch,
			).not.toHaveBeenCalled();
		});

		it('handles fetch errors gracefully', async () => {
			mockIsMonthlySubscription.mockReturnValue(true);
			mockChangeSubscriptionBillingFrequencyFetch.mockRejectedValue(
				new Error('API Error'),
			);

			expect(() => {
				render(
					<PaymentDetailsTableV2
						productDetail={mockProductDetail as never}
						specificProductType={mockProductType as never}
						nextPaymentDetails={mockNextPaymentDetails}
						hasCancellationPending={false}
					/>,
				);
			}).not.toThrow();
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
