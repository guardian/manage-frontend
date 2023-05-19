import {
	toMembersDataApiResponse,
	membershipSupporter,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';
import { singleContributionsAPIResponse } from '../../../client/fixtures/singleContribution';
import { featureSwitches } from '../../../shared/featureSwitches';

if (featureSwitches.singleContributions) {
	describe('single contributions test', () => {
		beforeEach(() => {
			signInAndAcceptCookies();

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(),
			}).as('product_detail');

			cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
				statusCode: 200,
				body: { subscriptions: [] },
			}).as('mobile_subscriptions');

			cy.intercept('GET', '/api/me/one-off-contributions', {
				statusCode: 200,
				body: singleContributionsAPIResponse,
			}).as('single_contributions');

			cy.intercept('GET', '/api/me/mma/**', {
				statusCode: 200,
				body: toMembersDataApiResponse(),
			}).as('refetch_subscription');

			cy.intercept('GET', '/api/cancelled/', {
				statusCode: 200,
				body: [],
			}).as('cancelled');
		});

		it('single contributions accountoverview', () => {
			cy.visit('/');

			cy.wait('@product_detail');
			cy.wait('@mobile_subscriptions');
			cy.wait('@single_contributions');

			cy.findByText('Single Support');
			cy.findByText('$50');
			cy.findByText('15 May 2023');
			cy.findByText('Recurring support');
			cy.findByText('Manage marketing preferences');
		});
	});
}
