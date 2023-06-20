import { membershipSupporter } from '../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('membership test', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(membershipSupporter()),
		}).as('product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(membershipSupporter()),
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
		cy.wait('@single_contributions');

		cy.findByText('Guardian Membership');
	});

	it('membership subscription', () => {
		cy.visit('/membership');

		cy.findByText('Manage Membership').click();

		cy.findByText('Cancel Membership');
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
