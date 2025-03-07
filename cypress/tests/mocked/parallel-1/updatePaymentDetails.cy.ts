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
} from '../../../../client/fixtures/productBuilder/testProducts';
import { singleContributionsAPIResponse } from '../../../../client/fixtures/singleContribution';
import { paymentMethods } from '../../../../client/fixtures/stripe';
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
