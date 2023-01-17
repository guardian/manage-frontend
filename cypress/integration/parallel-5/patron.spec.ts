import {
	guardianWeeklyCard,
	toMembersDataApiResponse,
	patronDigitalSub,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

const patronMDAPI = [patronDigitalSub, guardianWeeklyCard];

describe('patron test', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				patronDigitalSub,
				guardianWeeklyCard,
			),
		}).as('product_detail');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: patronMDAPI,
		}).as('refetch_subscription');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('patron accountoverview', () => {
		cy.visit('/');

		cy.wait('@product_detail');

		cy.findAllByText('not applicable').should('have.length', 1);
	});

	it('patron manage subscription page', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(patronDigitalSub),
		}).as('product_detail');

		cy.visit('/subscriptions');

		cy.wait('@product_detail');

		cy.findAllByText('not applicable').should('have.length', 1);
	});

	it('patron billing page', () => {
		cy.intercept('GET', '/api/invoices', {
			statusCode: 200,
			body: { invoices: [] },
		}).as('invoices');

		cy.visit('/billing');

		cy.wait('@product_detail');
		cy.wait('@invoices');

		cy.findAllByText('not applicable').should('have.length', 2);
	});
});
