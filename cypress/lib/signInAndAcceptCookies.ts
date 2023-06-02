import { guardianWeeklyPaidByCard } from '../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../client/fixtures/productDetail';

export const signInAndAcceptCookies = () => {
	cy.session('auth', () => {
		cy.setCookie('gu-cmp-disabled', 'true');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyPaidByCard()),
		}).as('mma');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.wait(1000);
		cy.visit('/');

		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
	});
};
