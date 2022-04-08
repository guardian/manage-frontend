import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl';
import { contribution } from '../../../client/fixtures/productDetail';

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
				body: [contribution],
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

	it('cancels contribution', function () {
		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: [contribution],
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [contribution],
		});

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: { subscription: {} },
		}).as('new_product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		});

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_contribution');

		cy.intercept('POST', '/api/case', {
			statusCode: 200,
			body: {
				id: 'caseId',
			},
		}).as('get_case');

		cy.intercept('PATCH', '/api/case/**', {
			statusCode: 200,
			body: { message: 'success' },
		}).as('create_case_in_salesforce');

		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.get('[data-cy="Cancel recurring contribution"]').click();
		cy.get('[data-cy="cancellation_reasons"] label').first().click();
		cy.get('[data-cy="cta_container"] a').first().click();

		cy.wait('@get_case');

		cy.findByText('Confirm cancellation').click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.get('[data-cy="cancellation_message"]');

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
	});
});
