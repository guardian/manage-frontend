import { render } from '@testing-library/react';
import { CurrentPaymentDetails } from '../../../components/mma/paymentUpdate/CurrentPaymentDetail';
import {
	digitalPackPaidByDirectDebit,
	guardianWeeklyExpiredCard,
	guardianWeeklyPaidByCard,
	newspaperDigitalVoucherPaidByPaypal,
} from '../../../fixtures/productBuilder/testProducts';

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
				<CurrentPaymentDetails {...digitalPackPaidByDirectDebit()} />,
			);

			expect(getByText('ending 911')).toBeDefined();
			expect(getByText('20-00-00')).toBeDefined();
		});
	});

	describe('For Paypal', () => {
		test('shows masked email', () => {
			const { getByText } = render(
				<CurrentPaymentDetails
					{...newspaperDigitalVoucherPaidByPaypal(
						'subscriber@example.com',
					)}
				/>,
			);

			expect(getByText('s********r@example.com')).toBeDefined();
		});
	});
});
