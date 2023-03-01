import type { StripeSetupIntent } from '../../shared/stripeSetupIntent';

export const stripeSetupIntent: StripeSetupIntent = {
	id: 'seti_test',
	client_secret: 'seti_test_secret_test',
};

export const executePaymentUpdateResponse = {
	type: 'visa',
	last4: '4242',
	expiryMonth: 4,
	expiryYear: 2024,
};

export const ddPaymentMethod = {
	accountName: 'JON R HEE',
	accountNumber: '****9911',
	sortCode: '200000',
};
