import { signInOkta } from '../../lib/signInOkta';

describe('Okta auth expiry', () => {
	beforeEach(() => {
		Cypress.config('defaultCommandTimeout', 30_000);

		cy.clearAllCookies();
		signInOkta();
		cy.get('h1').should('contain', 'Account overview');
	});

	it('should redirect to /reauthenticate if the ID token auth_time is too old', () => {
		cy.wait(6000); // 6 seconds (maxAge is 5 seconds)
		cy.setCookie('okta-config-override', JSON.stringify({ maxAge: 5 }));
		cy.visit('/profile');
		cy.url().should('contain', '/reauthenticate');
		// If the URL contains 'fromURI', we've been redirected to /reauthenticate
		// by Gateway, not by the identity middleware.
		cy.url().should('not.contain', 'fromURI');
		cy.url().should(
			'contain',
			'returnUrl=https%3A%2F%2Fmanage.thegulocal.com%2Fprofile',
		);
	});
});
