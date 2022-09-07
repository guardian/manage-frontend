import { guardianWeeklyCurrentSubscription } from '../../client/fixtures/productDetail';

export const signInAndAcceptCookies = () => {
	cy.session('auth', () => {
		cy.setCookie('gu-cmp-disabled', 'true');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('mma');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.wait(1000);
		cy.visit('/');

		cy.wait('@mma');
		cy.wait('@cancelled');
	});
};
