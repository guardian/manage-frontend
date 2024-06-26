import {
	guardianWeeklyPaidByCard,
	patronDigitalPack,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('patron test', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				patronDigitalPack(),
				guardianWeeklyPaidByCard(),
			),
		}).as('product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/me/mma?productType=**', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				patronDigitalPack(),
				guardianWeeklyPaidByCard(),
			),
		}).as('fetch_subscription');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('patron accountoverview', () => {
		cy.visit('/');

		cy.wait('@product_detail');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findAllByText('not applicable').should('have.length', 1);
	});

	it('patron manage subscription page', () => {
		cy.visit('/digital');

		cy.wait('@fetch_subscription');

		cy.findAllByText('not applicable').should('have.length', 2);
	});

	it('patron billing page', () => {
		cy.intercept('GET', '/api/invoices', {
			statusCode: 200,
			body: { invoices: [] },
		}).as('invoices');

		cy.visit('/billing');

		cy.wait('@product_detail');
		cy.wait('@invoices');
		cy.wait('@mobile_subscriptions');

		cy.findAllByText('not applicable').should('have.length', 2);
	});
});
