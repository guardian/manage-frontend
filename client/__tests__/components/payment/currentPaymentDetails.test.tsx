import { render } from '@testing-library/react';
import { CurrentPaymentDetails } from '../../../components/mma/paymentUpdate/CurrentPaymentDetail';
import {
	guardianWeeklyExpiredCard,
	guardianWeeklyPaidByCard,
} from '../../../fixtures/productBuilder/testProducts';
import {
	digitalDD,
	newspaperVoucherPaypal,
} from '../../../fixtures/productDetail';

describe('currentPaymentDetails.tsx', () => {
	it('Shows product name', () => {
		const { getByText } = render(
			<CurrentPaymentDetails {...guardianWeeklyPaidByCard()} />,
		);

		expect(getByText('Guardian Weekly')).toBeDefined();
	});

	describe('For Card', () => {
		test('Shows last 4 digits on card and expiry date', () => {
			const { getByText } = render(
				<CurrentPaymentDetails {...guardianWeeklyPaidByCard()} />,
			);

			expect(getByText('ending 4242')).toBeDefined();
			expect(getByText('4 / 2024')).toBeDefined();
		});

		test('Shows expired when expiry date is in the past', () => {
			const { getByText } = render(
				<CurrentPaymentDetails {...guardianWeeklyExpiredCard()} />,
			);

			expect(getByText('Expired')).toBeDefined();
		});
	});

	describe('For Direct Debit', () => {
		test('shows account number and sort code', () => {
			const { getByText } = render(
				<CurrentPaymentDetails {...digitalDD} />,
			);

			expect(getByText('ending 911')).toBeDefined();
			expect(getByText('20-00-00')).toBeDefined();
		});
	});

	describe('For Paypal', () => {
		test('shows masked email', () => {
			const { getByText } = render(
				<CurrentPaymentDetails {...newspaperVoucherPaypal} />,
			);

			expect(getByText('t*******r@example.com')).toBeDefined();
		});
	});
});
