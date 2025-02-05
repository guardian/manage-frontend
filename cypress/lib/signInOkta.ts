/**
 * Non-mocked sign-in with Gateway using Okta
 */

export const signInOkta = () => {
	// When this function runs, the browser will already be showing the Gateway sign-in page
	// because MMA will have redirected to it when it loads the first page of the test.
	cy.setCookie('gu-cmp-disabled', 'true', {
		domain: '.thegulocal.com',
	});

	// Necessary otherwise we get a 502 error back from MMA for some reason, perhaps a race condition?
	// TODO: Make this not suck
	cy.wait(1000);

	cy.visit('/');
	cy.createTestUser({
		isUserEmailValidated: true,
		doNotSetUsername: true,
	})?.then(({ emailAddress, finalPassword }) => {
		cy.get('input[name=email]').type(emailAddress);
		cy.get('[data-cy="main-form-submit-button"]').click();
		cy.contains('Sign in with password instead').click();
		cy.get('input[name=password]').type(finalPassword);
		cy.get('[data-cy="main-form-submit-button"]').click();
	});
};
