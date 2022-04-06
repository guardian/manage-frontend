import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl';
import {
	guardianWeeklyCurrentSubscription,
	digitalDD,
} from '../../../client/fixtures/productDetail';
import {
	stripeSetupIntent,
	executePaymentUpdateResponse,
	ddPaymentMethod,
} from '../../../client/fixtures/payment';
import { paymentMethods } from '../../../client/fixtures/stripe';

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on('uncaught:exception', () => {
	return false;
});

const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = 'Yes, I’m happy';

describe('E2E Page rendering', function () {
	beforeEach(function () {
		cy.session('auth', () => {
			setLocalBaseUrl();

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: [guardianWeeklyCurrentSubscription],
			}).as('mma');

			cy.intercept('GET', '/api/cancelled/', {
				statusCode: 200,
				body: [],
			}).as('cancelled');

			cy.wait(1000);
			cy.visit('/');

			cy.wait('@mma');
			cy.wait('@cancelled');

			// accept cookies
			cy.getIframeBody(iframeMessage)
				.find(`button[title="${acceptCookiesButtonText}"]`, {
					timeout: 10000,
				})
				.click();

			// wait for cookies to be set
			cy.wait(1000);
		});
	});

	it('Complete card payment update', function () {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('refetch_subscription');

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

		cy.visit('/payment/subscriptioncard');

		cy.wait('@product_detail');

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

		cy.get('@createSetupIntent.all').should('have.length', 1);
		cy.get('@confirmCardSetup.all').should('have.length', 1);
		cy.get('@scala_backend.all').should('have.length', 1);
	});

	it('Shows correct error messages for direct debit form', function () {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: [digitalDD],
		}).as('product_detail');

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
		cy.findByText(
			'Your bank details are invalid. Please check them and try again.',
		);
	});

	it('Complete direct debit payment update', function () {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: [digitalDD],
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: [digitalDD],
		}).as('refetch_subscription');

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

		cy.wait('@scala_backend');
		cy.wait('@refetch_subscription');

		cy.findByText('Your payment details were updated successfully');

		cy.get('@scala_backend.all').should('have.length', 1);
	});

	it('Show recaptcha error', function () {
		cy.intercept('GET', '/api/me/mma?productType=*', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
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
});
