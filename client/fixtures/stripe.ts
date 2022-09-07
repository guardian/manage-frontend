export const paymentMethods = {
	id: 'pm_1J2RZI2eZvKYlo2CaP803dMY',
	object: 'payment_method',
	billing_details: {
		address: {
			city: 'Kuala Lumpur',
			country: null,
			line1: 'Level 10, 1 Sentral, Jalan Rakyat, Kuala Lumpur Sentral',
			line2: null,
			postal_code: '50706',
			state: null,
		},
		email: 'jenny@example.com',
		name: null,
		phone: '+15555555555',
	},
	card: {
		brand: 'visa',
		checks: {
			address_line1_check: null,
			address_postal_code_check: null,
			cvc_check: 'pass',
		},
		country: 'US',
		exp_month: 8,
		exp_year: 2022,
		fingerprint: 'Xt5EWLLDS7FJjR1c',
		funding: 'credit',
		generated_from: null,
		last4: '4242',
		networks: {
			available: ['visa'],
			preferred: null,
		},
		three_d_secure_usage: {
			supported: true,
		},
		wallet: null,
	},
	created: 123456789,
	customer: null,
	livemode: false,
	metadata: {
		order_id: '123456789',
	},
	type: 'card',
};
