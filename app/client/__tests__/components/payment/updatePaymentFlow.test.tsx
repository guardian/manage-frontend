import { render } from '@testing-library/react';
import {
	PaymentMethod,
	SelectPaymentMethod,
} from '../../../components/payment/update/PaymentDetailUpdate';

describe('updatePaymentFlow.tsx', () => {
	it('Shows only card when sub/contrib is already using card, and dd is not allowed', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.card}
				currentPaymentMethod={PaymentMethod.card}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={false}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(queryByText(PaymentMethod.dd)).toBeNull();
	});

	it('Shows both card and direct debit when sub/contrib is using card and direct debit is allowed', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.card}
				currentPaymentMethod={PaymentMethod.card}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(getByText(PaymentMethod.dd)).toBeDefined();
	});

	it('Shows both card and direct debit when sub/contrib is already using direct debit', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.dd}
				currentPaymentMethod={PaymentMethod.dd}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(getByText(PaymentMethod.dd)).toBeDefined();
	});

	it('Shows only card when sub/contrib is using Paypal and direct debit is not allowed', () => {
		const { getByText, queryByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.payPal}
				currentPaymentMethod={PaymentMethod.payPal}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(queryByText(PaymentMethod.dd)).toBeNull();
	});

	it('Shows card and dd when sub/contrib is using Paypal and direct debit is allowed', () => {
		const { getByText } = render(
			<SelectPaymentMethod
				value={PaymentMethod.payPal}
				currentPaymentMethod={PaymentMethod.payPal}
				updatePaymentMethod={() => null}
				directDebitIsAllowed={true}
			/>,
		);

		expect(getByText(PaymentMethod.card)).toBeDefined();
		expect(getByText(PaymentMethod.dd)).toBeDefined();
	});
});
