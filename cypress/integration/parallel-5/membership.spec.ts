import {
	toMembersDataApiResponse,
	membership,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('membership test', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(membership),
		}).as('product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(membership),
		}).as('refetch_subscription');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('membership accountoverview', () => {
		cy.visit('/');

		cy.wait('@product_detail');
		cy.wait('@mobile_subscriptions');

		cy.findByText('Staff Membership');
	});

	it('membership subscription', () => {
		cy.visit('/membership');

		cy.findByText('Manage membership').click();

		cy.findByText('Cancel membership');
	});

	it('membership billing page', () => {
		cy.intercept('GET', '/api/invoices', {
			statusCode: 200,
			body: { invoices: [] },
		}).as('invoices');

		cy.visit('/billing');

		cy.wait('@product_detail');
		cy.wait('@invoices');
		cy.wait('@mobile_subscriptions');

		cy.findAllByText('Billing').should('have.length', 2);
	});
});
