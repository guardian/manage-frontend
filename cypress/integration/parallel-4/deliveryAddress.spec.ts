import {
	guardianWeeklyCurrentSubscription,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Delivery address', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=ContentSubscription', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyCurrentSubscription),
		}).as('product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('Can update delivery address. Navigating from account overview', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyCurrentSubscription),
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

		cy.get('@address_update.all').should('have.length', 1);
	});

	it('Shows updated address when returning to manage subscription page', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyCurrentSubscription),
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

		cy.get('input').eq(0).clear().type('Queens Place');
		cy.get('input').eq(1).clear().type('50 York Way');
		cy.get('input').eq(2).clear().type('Melbourne');
		cy.get('input').eq(3).clear().type('VIC');
		cy.get('input').eq(4).clear().type('3401');

		cy.get('input[name="instructions-checkbox"]').click();
		cy.findByText('Review details').click();

		cy.findByText('Submit details').click();
		cy.wait('@address_update');

		cy.findByText('Return to subscription').click();

		cy.findByText('Queens Place').should('exist');
		cy.findByText('50 York Way').should('exist');
		cy.findByText('Melbourne').should('exist');
		cy.findByText('VIC').should('exist');
		cy.findByText('3401').should('exist');
	});
});
