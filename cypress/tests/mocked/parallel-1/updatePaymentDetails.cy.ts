import { featureSwitches } from '@/shared/featureSwitches';
import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import {
	ddPaymentMethod,
	executePaymentUpdateResponse,
	stripeSetupIntent,
} from '../../../../client/fixtures/payment';
import {
	digitalPackPaidByCardWithPaymentFailure,
	digitalPackPaidByDirectDebit,
	guardianAdLite,
	guardianWeeklyPaidByCard,
	homeDeliverySunday,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../../../client/fixtures/singleContribution';
import { paymentMethods } from '../../../../client/fixtures/stripe';
import { conf } from '../../../../server/config';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Update payment details', () => {
	beforeEach(() => {
		signInAndAcceptCookies();
	});

	it('Complete card payment update through billing page', () => {
		cy.intercept('GET', '/api/me/mma*', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyPaidByCard()),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyPaidByCard()),
		}).as('refetch_subscription');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', 'api/invoices', {
			statusCode: 200,
			body: { invoices: [] },
		}).as('invoices');

		cy.intercept('POST', '/api/payment/card', {
			statusCode: 200,
			body: stripeSetupIntent,
		}).as('createSetupIntent');

		cy.intercept('POST', '/api/payment/card/**', {
			statusCode: 200,
			body: executePaymentUpdateResponse,
		}).as('scala_backend');

		cy.intercept('POST', 'https://api.stripe.com/v1/setup_intents/**', {
			statusCode: 200,
			body: { status: 'succeeded' },
		}).as('confirmCardSetup');

		cy.intercept('POST', 'https://api.stripe.com/v1/payment_methods', {
			statusCode: 200,
			body: paymentMethods,
		});

		cy.visit('/billing');
		cy.wait('@product_detail');
		cy.wait('@invoices');
		cy.wait('@mobile_subscriptions');

		cy.findByText('Update payment method').click();

		cy.resolve('Stripe').should((value) => {
			expect(value).to.be.ok;
		});

		cy.fillElementsInput('cardNumber', '4242424242424242');
		cy.fillElementsInput('cardExpiry', '1025');
		cy.fillElementsInput('cardCvc', '123');

		cy.get('#recaptcha *> iframe').then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body)
				.find('.recaptcha-checkbox-border')
				.should('be.visible')
				.click()
				.then(() => {
					// wait for recaptcha to resolve
					cy.wait(1000);

					cy.findByText('Update payment method').click();
				});
		});

		cy.wait('@scala_backend');
		cy.wait('@refetch_subscription');

		cy.findByText('Your payment details were updated successfully');
		cy.findByText('Back to Account overview').should('exist');

		cy.get('@createSetupIntent.all').should('have.length', 1);
		cy.get('@confirmCardSetup.all').should('have.length', 1);
		cy.get('@scala_backend.all').should('have.length', 1);
	});

	it('Complete card payment update through Stripe Checkout', () => {
		if (!featureSwitches.tortoiseStripeCheckout) {
			// Skip the test if the feature switch is off
			cy.log('Skipping test because the feature switch is off');
			return;
		}

		const productDetail = homeDeliverySunday();
		const stripeCheckoutUrl = `https://www.google.com`;

		// #region Intercepts
		cy.intercept('GET', '/api/me/mma*', {
			statusCode: 200,
			body: toMembersDataApiResponse(productDetail),
		}).as('product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', 'api/invoices', {
			statusCode: 200,
			body: { invoices: [] },
		}).as('invoices');

		cy.intercept('POST', 'api/payment/checkout-session', {
			statusCode: 200,
			body: { id: '0', url: stripeCheckoutUrl },
		}).as('create_checkout_session');

		cy.intercept('GET', `api/payment/checkout-session/0`, {
			statusCode: 200,
			body: {
				id: '0',
				url: stripeCheckoutUrl,
				object: 'checkout.session',
				adaptive_pricing: null,
				after_expiration: null,
				allow_promotion_codes: null,
				amount_subtotal: null,
				amount_total: null,
				automatic_tax: {
					enabled: false,
					liability: null,
					status: null,
				},
				billing_address_collection: null,
				cancel_url: `https://manage.${conf.DOMAIN}/payment/subscriptioncard`,
				client_reference_id: null,
				client_secret: null,
				collected_information: {
					shipping_details: null,
				},
				consent: null,
				consent_collection: null,
				created: 1743088342,
				currency: null,
				currency_conversion: null,
				custom_fields: [],
				custom_text: {
					after_submit: null,
					shipping_address: null,
					submit: null,
					terms_of_service_acceptance: null,
				},
				customer: null,
				customer_creation: 'if_required',
				customer_details: {
					address: null,
					email: 'developer@guardian.co.uk',
					name: 'Developer',
					phone: null,
					tax_exempt: null,
					tax_ids: [],
				},
				customer_email: 'developer@guardian.co.uk',
				discounts: null,
				expires_at: 1743174742,
				invoice: null,
				invoice_creation: null,
				livemode: false,
				locale: null,
				metadata: {},
				mode: 'setup',
				payment_intent: null,
				payment_link: null,
				payment_method_collection: 'always',
				payment_method_configuration_details: null,
				payment_method_options: {
					card: {
						request_three_d_secure: 'automatic',
					},
				},
				payment_method_types: ['card'],
				payment_status: 'no_payment_required',
				permissions: null,
				phone_number_collection: {
					enabled: false,
				},
				recovered_from: null,
				saved_payment_method_options: null,
				setup_intent: {
					id: 'seti_1R7I6UFNFWz7WMIhvjGlJ2lv',
					object: 'setup_intent',
					application: null,
					automatic_payment_methods: null,
					cancellation_reason: null,
					client_secret:
						'seti_1R7I6UFNFWz7WMIhvjGlJ2lv_secret_S1KmQocYfiWm7XS7orp3GxbVWp5Q59k',
					created: 1743088342,
					customer: null,
					description: null,
					flow_directions: null,
					last_setup_error: null,
					latest_attempt: 'setatt_1R7I6oFNFWz7WMIhElATmpaz',
					livemode: false,
					mandate: null,
					metadata: {},
					next_action: null,
					on_behalf_of: null,
					payment_method: {
						id: 'pm_1R7I6oFNFWz7WMIhoWFlhS1T',
						object: 'payment_method',
						allow_redisplay: 'always',
						billing_details: {
							address: {
								city: null,
								country: 'PT',
								line1: null,
								line2: null,
								postal_code: null,
								state: null,
							},
							email: 'developer@guardian.co.uk',
							name: 'Developer',
							phone: null,
						},
						card: {
							brand: 'mastercard',
							checks: {
								address_line1_check: null,
								address_postal_code_check: null,
								cvc_check: 'pass',
							},
							country: 'US',
							display_brand: 'mastercard',
							exp_month: 11,
							exp_year: 2025,
							fingerprint: 'NDbG5kODznDuXICS',
							funding: 'credit',
							generated_from: null,
							last4: '4444',
							networks: {
								available: ['mastercard'],
								preferred: null,
							},
							regulated_status: 'unregulated',
							three_d_secure_usage: {
								supported: true,
							},
							wallet: null,
						},
						created: 1743088362,
						customer: null,
						livemode: false,
						metadata: {},
						type: 'card',
					},
					payment_method_configuration_details: null,
					payment_method_options: {
						card: {
							mandate_options: null,
							network: null,
							request_three_d_secure: 'automatic',
						},
					},
					payment_method_types: ['card'],
					single_use_mandate: null,
					status: 'succeeded',
					usage: 'off_session',
				},
				shipping_address_collection: null,
				shipping_cost: null,
				shipping_details: null,
				shipping_options: [],
				status: 'complete',
				submit_type: null,
				subscription: null,
				success_url: `https://manage.${conf.DOMAIN}/payment/subscriptioncard/checkout-session-return?id={CHECKOUT_SESSION_ID}&paymentMethodType=card`,
				total_details: null,
				ui_mode: 'hosted',
			},
		}).as('get_checkout_session');

		cy.intercept(
			'POST',
			`/api/payment/card/${productDetail.subscription.subscriptionId}`,
			{
				statusCode: 200,
				body: {
					type: 'mastercard',
					last4: '4444',
					expiryMonth: 11,
					expiryYear: 2025,
				},
			},
		).as('execute_update_payment');

		cy.intercept(
			'GET',
			`/api/me/mma/${productDetail.subscription.subscriptionId}`,
			{
				statusCode: 200,
				body: {
					user: {
						email: 'developer@guardian.co.uk',
					},
					products: [
						{
							mmaCategory: 'subscriptions',
							tier: 'Newspaper Digital Voucher',
							isPaidTier: true,
							selfServiceCancellation: {
								isAllowed: false,
								shouldDisplayEmail: false,
								phoneRegionsToDisplay: ['UK & ROW'],
							},
							billingCountry: 'United Kingdom',
							joinDate: '2025-03-19',
							optIn: true,
							subscription: {
								paymentMethod: 'Card',
								card: {
									last4: '4444',
									expiry: {
										month: 11,
										year: 2025,
									},
									type: 'MasterCard',
									stripePublicKeyForUpdate:
										'pk_test_Qm3CGRdrV4WfGYCpm0sftR0f',
									email: 'developer@guardian.co.uk',
								},
								contactId: '003UD00000SakVlYAJ',
								deliveryAddress: {
									addressLine1: '90 York Way',
									addressLine2: 'Kings Place',
									town: 'London',
									postcode: 'N1 9AG',
									country: 'United Kingdom',
								},
								safeToUpdatePaymentMethod: true,
								start: '2025-03-30',
								end: '2026-03-19',
								nextPaymentPrice: 1599,
								nextPaymentDate: '2025-03-30',
								potentialCancellationDate: '2025-03-30',
								lastPaymentDate: null,
								chargedThroughDate: null,
								renewalDate: '2026-03-19',
								anniversaryDate: '2026-03-30',
								cancelledAt: false,
								subscriptionId: 'A-S00968890',
								trialLength: 3,
								autoRenew: true,
								plan: {
									name: 'Newspaper Digital Voucher',
									price: 1599,
									currency: '£',
									currencyISO: 'GBP',
									billingPeriod: 'month',
								},
								currentPlans: [],
								futurePlans: [
									{
										name: 'Sunday',
										start: '2025-03-30',
										end: '2026-03-19',
										shouldBeVisible: true,
										chargedThrough: null,
										price: 1599,
										currency: '£',
										currencyISO: 'GBP',
										billingPeriod: 'month',
										features: '',
										daysOfWeek: ['Sunday'],
									},
								],
								readerType: 'Direct',
								accountId: '8ad0855895aa29180195aef9334d4457',
								cancellationEffectiveDate: null,
							},
							isTestUser: false,
						},
					],
				},
			},
		).as('get_update_payment');
		// #endregion

		cy.visit('/billing');
		cy.wait('@product_detail');
		cy.wait('@mobile_subscriptions');
		cy.wait('@invoices');

		// Save the current url for later usage
		cy.url().then((url) => {
			cy.wrap(url).as('initialUrl'); // Ensure the URL is stored properly
		});

		// Billing page "Update payment method" button click
		cy.findByText('Update payment method').click();

		// Manage payment method page "Update payment method" button click
		cy.findByText('Update payment method').click();

		// Wait for checkout session creation
		cy.wait('@create_checkout_session');

		// Evaluate if the session was redirected to the correct URL
		cy.url().should('include', stripeCheckoutUrl);

		// Redirect back to the Guardian
		cy.get('@initialUrl').then((initialUrl) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any -- The type 'any' is used here because we are sure that the URL is a string but the type definition is not
			const baseUrl = new URL(initialUrl as any).origin; // Get "https://example.com"
			cy.visit(
				`${baseUrl}/payment/digital/checkout-session-return?id=0&paymentMethodType=card`,
			);
		});

		// Wait for checkout session retrieval
		cy.wait('@get_checkout_session');

		// Wait for payment update
		cy.wait('@execute_update_payment');
		cy.log('Payment update executed successfully');

		// Wait for updated payment details
		cy.wait('@get_update_payment');

		// Final assertions
		cy.findByText('Your payment details were updated successfully');
		cy.findByText('Back to Account overview').should('exist');
	});

	it('Completes card payment update with app redirect from account overview', () => {
		cy.intercept('GET', '/api/me/mma*', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				digitalPackPaidByCardWithPaymentFailure(),
			),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				digitalPackPaidByCardWithPaymentFailure(),
			),
		}).as('refetch_subscription');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: singleContributionsAPIResponse,
		}).as('single_contributions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('POST', '/api/payment/card', {
			statusCode: 200,
			body: stripeSetupIntent,
		}).as('createSetupIntent');

		cy.intercept('POST', '/api/payment/card/**', {
			statusCode: 200,
			body: executePaymentUpdateResponse,
		}).as('update_payment');

		cy.intercept('POST', 'https://api.stripe.com/v1/setup_intents/**', {
			statusCode: 200,
			body: { status: 'succeeded' },
		}).as('confirmCardSetup');

		cy.intercept('POST', 'https://api.stripe.com/v1/payment_methods', {
			statusCode: 200,
			body: paymentMethods,
		});

		cy.visit('/app');

		cy.findByText('A payment needs your attention').should('exist');
		cy.findAllByText('Update payment method').first().click();

		cy.findByText('Your current payment method').should('exist');
		cy.resolve('Stripe').should((value) => {
			expect(value).to.be.ok;
		});

		cy.fillElementsInput('cardNumber', '4242424242424242');
		cy.fillElementsInput('cardExpiry', '1025');
		cy.fillElementsInput('cardCvc', '123');

		cy.get('#recaptcha *> iframe').then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body)
				.find('.recaptcha-checkbox-border')
				.should('be.visible')
				.click()
				.then(() => {
					// wait for recaptcha to resolve
					cy.wait(1000);

					cy.findByText('Update payment method').click();
				});
		});

		cy.wait('@update_payment');
		cy.wait('@refetch_subscription');

		cy.findByText('Your payment details were updated successfully');
		cy.findByText('Return to the app').should('exist');
	});

	it('Shows correct error messages for direct debit form', () => {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		}).as('product_detail');

		cy.intercept('POST', '/api/validate/payment/**', {
			statusCode: 200,
			body: { data: { accountValid: false } },
		}).as('validate_dd');

		cy.visit('/payment/digital');

		cy.wait('@product_detail');
		cy.findByText('Your current payment method');

		cy.get(`[data-cy="Direct debit"] input`).click();

		cy.findByText('Update your payment method');

		cy.findByText('Update payment method').click();
		cy.findByText('Please enter a valid account name');

		cy.get('input[name="Account holder name"]').type('JON R HEE');
		cy.findByText('Update payment method').click();

		cy.findByText('You need to confirm that you are the account holder');

		cy.get('input[name="Sort Code"]').type('SORTCODE');
		cy.get('input[name="Account Number"]').type('142313421234');

		cy.findByText('Update payment method').click();
		cy.findByText('You need to confirm that you are the account holder');

		cy.get('input[name="accountHolderConfirmation"').click();
		cy.findByText('Update payment method').click();

		cy.wait('@validate_dd');

		cy.findByText(
			'Your bank details are invalid. Please check them and try again.',
		);
	});

	it('Complete direct debit payment update', () => {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		}).as('refetch_subscription');

		cy.intercept('POST', '/api/validate/payment/**', {
			statusCode: 200,
			body: { data: { accountValid: true } },
		}).as('validate_dd');

		cy.intercept('POST', '/api/payment/dd/**', {
			statusCode: 200,
			body: ddPaymentMethod,
		}).as('scala_backend');

		cy.visit('/payment/digital');

		cy.wait('@product_detail');
		cy.findByText('Your current payment method');

		cy.get(`[data-cy="Direct debit"] input`).click();

		cy.findByText('Update your payment method');

		cy.get('input[name="Account holder name"]').type('JON R HEE');
		cy.get('input[name="Sort Code"]').type('200000');
		cy.get('input[name="Account Number"]').type('55779911');

		cy.get('input[name="accountHolderConfirmation"').click();
		cy.findByText('Update payment method').click();

		cy.wait('@validate_dd');
		cy.wait('@scala_backend');
		cy.wait('@refetch_subscription');

		cy.findByText('Your payment details were updated successfully');

		cy.get('@scala_backend.all').should('have.length', 1);
	});

	it('Shows payment failure route correctly for direct debit', () => {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		}).as('refetch_subscription');

		cy.intercept('POST', '/api/validate/payment/**', {
			statusCode: 200,
			body: { data: { accountValid: true } },
		}).as('validate_dd');

		cy.intercept('POST', '/api/payment/dd/**', {
			statusCode: 500,
		}).as('scala_backend');

		cy.visit('/payment/digital');

		cy.wait('@product_detail');
		cy.findByText('Your current payment method');

		cy.get(`[data-cy="Direct debit"] input`).click();

		cy.findByText('Update your payment method');

		cy.get('input[name="Account holder name"]').type('JON R HEE');
		cy.get('input[name="Sort Code"]').type('200000');
		cy.get('input[name="Account Number"]').type('55779911');

		cy.get('input[name="accountHolderConfirmation"').click();
		cy.findByText('Update payment method').click();

		cy.wait('@validate_dd');
		cy.wait('@scala_backend');

		cy.findByText('Try again');
		cy.url().should('include', 'failed');

		cy.get('@scala_backend.all').should('have.length', 1);
	});

	it('Show recaptcha error', () => {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyPaidByCard()),
		}).as('product_detail');

		cy.visit('/payment/subscriptioncard');

		cy.wait('@product_detail');

		cy.findByText('Your current payment method');
		cy.findByText('Update your payment method');

		cy.resolve('Stripe').should((value) => {
			expect(value).to.be.ok;
		});

		cy.fillElementsInput('cardNumber', '4242424242424242');
		cy.fillElementsInput('cardExpiry', '1025');
		cy.fillElementsInput('cardCvc', '123');

		cy.findByText('Update payment method').click();

		cy.findByText('Recaptcha has not been completed.');
	});

	it('allows payment update for Guardian ad-lite product', () => {
		cy.intercept('GET', '/api/me/mma*', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLite()),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLite()),
		}).as('refetch_subscription');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: singleContributionsAPIResponse,
		}).as('single_contributions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('POST', '/api/payment/card', {
			statusCode: 200,
			body: stripeSetupIntent,
		}).as('createSetupIntent');

		cy.intercept('POST', '/api/payment/card/**', {
			statusCode: 200,
			body: executePaymentUpdateResponse,
		}).as('update_payment');

		cy.intercept('POST', 'https://api.stripe.com/v1/setup_intents/**', {
			statusCode: 200,
			body: { status: 'succeeded' },
		}).as('confirmCardSetup');

		cy.intercept('POST', 'https://api.stripe.com/v1/payment_methods', {
			statusCode: 200,
			body: paymentMethods,
		});

		cy.visit('/');
		cy.wait('@product_detail');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');
		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByText('Update payment method').click();

		cy.resolve('Stripe').should((value) => {
			expect(value).to.be.ok;
		});

		cy.fillElementsInput('cardNumber', '4242424242424242');
		cy.fillElementsInput('cardExpiry', '1025');
		cy.fillElementsInput('cardCvc', '123');

		cy.get('#recaptcha *> iframe').then(($iframe) => {
			const $body = $iframe.contents().find('body');
			cy.wrap($body)
				.find('.recaptcha-checkbox-border')
				.should('be.visible')
				.click()
				.then(() => {
					// wait for recaptcha to resolve
					cy.wait(1000);

					cy.findByText('Update payment method').click();
				});
		});

		cy.wait('@update_payment');
		cy.wait('@refetch_subscription');

		cy.findByText('Your payment details were updated successfully');
	});
});
