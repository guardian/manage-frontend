import { contribution } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel contribution', () => {
	beforeEach(() => {
		signInAndAcceptCookies();
	});

	it('cancels contribution', () => {
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
