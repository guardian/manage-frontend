import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { observerDelivery } from '../../../../client/fixtures/productBuilder/testProducts';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel home delivery - Sunday', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		const baseHomeDeliverySundayResponse = JSON.parse(
			JSON.stringify(observerDelivery()),
		);

		cy.intercept('GET', '/api/me/mma?productType=HomeDelivery', {
			statusCode: 200,
			body: toMembersDataApiResponse(baseHomeDeliverySundayResponse),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(baseHomeDeliverySundayResponse),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		});

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('cancels home delivery', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByText('Would you like to cancel your subscription?').should(
			'exist',
		);

		cy.get('a[href="/cancel/homedelivery"]').click();

		cy.findByText('Contact us to cancel').should('exist');
		cy.findByText(
			'Please contact our Customer Service team. You can find the contact details for your region below.',
		).should('exist');
	});
});
