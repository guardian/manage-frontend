import { render } from '@testing-library/react';
import {
	PaymentMethod,
	SelectPaymentMethod,
} from '../../../components/mma/paymentUpdate/PaymentDetailUpdate';

describe('updatePaymentFlow.tsx', () => {
	it('Shows only card when sub/contrib is already using card, and dd is not allowed', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.Card}
				currentPaymentMethod={PaymentMethod.Card}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={false}
			/>,
		);

		expect(getByText(PaymentMethod.Card)).toBeDefined();
		expect(queryByText(PaymentMethod.DirectDebit)).toBeNull();
	});

	it('Shows both card and direct debit when sub/contrib is using card and direct debit is allowed', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.Card}
				currentPaymentMethod={PaymentMethod.Card}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.Card)).toBeDefined();
		expect(getByText(PaymentMethod.DirectDebit)).toBeDefined();
	});

	it('Shows both card and direct debit when sub/contrib is already using direct debit', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.DirectDebit}
				currentPaymentMethod={PaymentMethod.DirectDebit}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.Card)).toBeDefined();
		expect(getByText(PaymentMethod.DirectDebit)).toBeDefined();
	});

	it('Shows only card when sub/contrib is using Paypal and direct debit is not allowed', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.PayPal}
				currentPaymentMethod={PaymentMethod.PayPal}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={false}
			/>,
		);

		expect(getByText(PaymentMethod.Card)).toBeDefined();
		expect(queryByText(PaymentMethod.DirectDebit)).toBeNull();
	});

	it('Shows card and dd when sub/contrib is using Paypal and direct debit is allowed', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.PayPal}
				currentPaymentMethod={PaymentMethod.PayPal}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.Card)).toBeDefined();
		expect(getByText(PaymentMethod.DirectDebit)).toBeDefined();
	});
});
