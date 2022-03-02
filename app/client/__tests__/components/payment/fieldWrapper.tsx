import { render, fireEvent } from '@testing-library/react';
import { NewPaymentMethodDetail } from '../../../components/payment/update/newPaymentMethodDetail';
import { CardInputForm } from '../../../components/payment/update/card/cardInputForm';

const stripePublicKey = 'pk_test_Qm3CGRdrV4WfGYCpm0sftR0f';
const userEmail = 'myemail@email.com';

const newPaymentMethodDetailUpdater = jest.fn((_: NewPaymentMethodDetail) => 1);
const executePaymentUpdate = jest.fn((_: NewPaymentMethodDetail) =>
	Promise.resolve(null),
);

// unfortunately Stripe Elements is buggy with both RTl and Enzyme and does not render, ive posted a question here on their github: https://github.com/stripe/react-stripe-js/issues/243
// as of now, the tests are commented out
// we can mock stripes setupIntents, createPaymentMethod and confirmCardSetup APIs, but mocking their Elements library is time-consuming and seems pointless if we can just use it as is

function returnCardInputForm() {
	return (
		<CardInputForm
			stripeApiKey={stripePublicKey}
			userEmail={userEmail}
			newPaymentMethodDetailUpdater={newPaymentMethodDetailUpdater}
			executePaymentUpdate={executePaymentUpdate}
		/>
	);
}

test('Stripe Elements has not been loaded yet', async () => {
	const { getByText } = render(returnCardInputForm());

	fireEvent(
		getByText('Update payment method'),
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		}),
	);

	getByText('Something went wrong, please check the details and try again.');
});

// fieldWrapper.tsx component should have integration testing, but StripeElements do not load when running tests, so we would have to mock StripeElements, job for the future.
