import { render } from '@testing-library/react';
import {
	PaymentMethod,
	SelectPaymentMethod,
} from '../../../components/payment/update/PaymentDetailUpdate';

describe('updatePaymentFlow.tsx', () => {
	it('Shows only card when sub/crontrib is already using card', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.card}
				currentPaymentMethod={PaymentMethod.card}
				updatePaymentMethod={() => null}
			/>,
		);

		getByText(PaymentMethod.card);
		expect(queryByText(PaymentMethod.dd)).toBeNull();
	});

	it('Shows both card and direct debit when sub/crontrib is using direct debit', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.dd}
				currentPaymentMethod={PaymentMethod.dd}
				updatePaymentMethod={() => null}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(getByText(PaymentMethod.dd)).toBeDefined();
	});

	it('Shows only card when sub/crontrib is using Paypal', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.payPal}
				currentPaymentMethod={PaymentMethod.payPal}
				updatePaymentMethod={() => null}
			/>,
		);

		getByText(PaymentMethod.card);
		expect(queryByText(PaymentMethod.dd)).toBeNull();
	});
});