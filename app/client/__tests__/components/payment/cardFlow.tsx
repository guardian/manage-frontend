import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NewPaymentMethodDetail } from '../../../components/payment/update/newPaymentMethodDetail';
import { CardInputForm } from '../../../components/payment/update/card/cardInputForm';
import { RecaptchaProps } from '../../../components/payment/update/card/Recaptcha';
import { StripeSetupIntent } from '../../../../shared/stripeSetupIntent';
import { PaymentMethod } from '@stripe/stripe-js';

const stripePublicKey = 'pk_test_Qm3CGRdrV4WfGYCpm0sftR0f';
const userEmail = 'myemail@email.com';
const stripeSetupIntent: StripeSetupIntent = {
	id: 'setupIntentId',
	client_secret: 'setupIntentSecret',
};

const newPaymentMethodDetailUpdater = jest.fn((_: NewPaymentMethodDetail) => 1);
const executePaymentUpdate = jest.fn((_: NewPaymentMethodDetail) =>
	Promise.resolve(null),
);

const stripePaymentMethod: PaymentMethod | unknown = {
	id: 'stripePaymentMethodId',
	created: 0,
	card: {
		brand: 'brand',
		last4: '4242',
		exp_month: 12,
		exp_year: 25,
		country: 'GB',
		checks: null,
		three_d_secure_usage: null,
		funding: '',
		wallet: null,
	},
};

const mockStripe = () => ({
	elements: jest.fn(),
	createToken: jest.fn(),
	createSource: jest.fn(),
	createPaymentMethod: jest.fn(() => stripePaymentMethod),
	confirmCardPayment: jest.fn(),
	confirmCardSetup: jest.fn(),
	paymentRequest: jest.fn(),
	_registerWrapper: jest.fn(),
});

const Recaptcha = ({ setRecaptchaToken }: RecaptchaProps) => (
	<input
		id="mockGrecaptcha"
		type="checkbox"
		onChange={() => setRecaptchaToken('mockRecaptchaToken')}
	/>
);

jest.mock('@stripe/react-stripe-js', () => {
	const stripe = jest.requireActual('@stripe/react-stripe-js');

	return {
		...stripe,
		useElements: () => {
			return {
				getElement: jest.fn(() => true),
			};
		},
		useStripe: () => {
			return mockStripe;
		},
	};
});

jest.mock('../../../components/payment/update/card/Recaptcha', () => ({
	__esModule: true,
	default: Recaptcha,
}));

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

describe('cardInputForm.tsx and stripeCardInputForm.tsx', () => {
	beforeEach(() => {
		// tslint:disable-next-line: no-object-mutation
		global.fetch = jest.fn().mockImplementation((url) => {
			return new Promise((resolve) => {
				resolve({
					ok: true,
					status: 200,
					headers: {
						get: () => 'pass',
					},
					json: () => {
						if (url.includes('/api/payment/card')) {
							return stripeSetupIntent;
						}
					},
				});
			});
		});
	});

	test('Recaptcha error is shown when recaptcha not completed', () => {
		const { getByText } = render(returnCardInputForm());

		fireEvent(
			getByText('Update payment method'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			}),
		);

		getByText('Recaptcha has not been completed.');
	});
});
