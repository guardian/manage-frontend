import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Delivery address', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=ContentSubscription', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('Can update delivery address. Navigating from account overview', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('mma');

		cy.intercept('PUT', '/api/delivery/address/update/**', {
			statusCode: 200,
			body: 'success',
		}).as('address_update');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.findByText('Manage subscription').click();
		cy.findByText('Manage delivery address').click();
		cy.get('input').first().invoke('val').should('equal', 'Kings Place');
		cy.get('input').first().clear().type('Queens Place');

		cy.get('input[name="instructions-checkbox"]').click();
		cy.findByText('Review details').click();

		cy.findByText('Submit details').click();

		cy.wait('@address_update')
			.its('request.body')
			.should('have.property', 'addressLine1', 'Queens Place');

		cy.findByText(
			'We have successfully updated your delivery details for your Guardian Weekly subscription. You will shortly receive a confirmation email.',
		).should('exist');
		cy.findByText('Queens Place').should('exist');
	});
});
