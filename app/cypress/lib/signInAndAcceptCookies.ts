const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = 'Yes, I’m happy';
import { guardianWeeklyCurrentSubscription } from '../../client/fixtures/productDetail';

export const signInAndAcceptCookies = () => {
	cy.session('auth', () => {
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

		// accept cookies
		cy.getIframeBody(iframeMessage)
			.find(`button[title="${acceptCookiesButtonText}"]`, {
				timeout: 10000,
			})
			.click();

		// wait for cookies to be set
		cy.wait(1000);
	});
};
