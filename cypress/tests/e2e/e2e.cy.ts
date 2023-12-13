import { signInOkta } from '../../lib/signInOkta';

describe('E2E with Okta', () => {
	beforeEach(() => {
		Cypress.config('defaultCommandTimeout', 30_000);

		cy.clearAllCookies();
		signInOkta();
		cy.get('h1').should('contain', 'Account overview');
	});

	context('account overview tab', () => {
		it('should contain an email address', () => {
			cy.findByText('Email address');
		});
	});

	context('profile tab', () => {
		it('should contain a username', () => {
			cy.visit('/public-settings');
			cy.findByText('Username');
		});
	});

	context('emails tab', () => {
		it('should allow the user to update their email preferences', () => {
			cy.visit('/email-prefs');
			cy.findByText('Guardian products and support').click();
			cy.visit('/email-prefs');
			cy.findByText('Guardian products and support')
				.parents('div')
				.get('input[type="checkbox"]')
				.should('be.checked');
		});

		it('should allow the user to unsubscribe from all emails', () => {
			cy.visit('/email-prefs');
			cy.findByText('Unsubscribe from all emails').click();
			cy.visit('/email-prefs');
			cy.get('input[type="checkbox"]').should('not.be.checked');
		});
	});

	context('settings tab', () => {
		it('should allow the user to update their personal information', () => {
			cy.visit('/account-settings');
			cy.findByLabelText('First Name').clear();
			cy.findByLabelText('Last Name').clear();
			cy.findByLabelText('First Name').type('Test');
			cy.findByLabelText('Last Name').type('User');
			cy.findByText('Save changes').click();
			cy.visit('/account-settings');
			cy.findByLabelText('First Name').should('have.value', 'Test');
			cy.findByLabelText('Last Name').should('have.value', 'User');
		});
	});

	context('help tab', () => {
		it('should allow the user to submit the help centre contact form', () => {
			cy.visit('/help');
			cy.findByText(
				'If you still can’t find what you need and want to contact us, check',
			)
				.parent()
				.findByText('here')
				.click();
			cy.findByText('Take me to the form').click();
			cy.findByText('Begin form').click();
			cy.findByText('Continue to step 2').click();
			cy.findByLabelText('Full Name').type('Test');
			cy.get('textarea[name="message"]').type('Problem details');
			cy.solveGoogleReCAPTCHA();
			cy.wait(1000);
			cy.findByText('Submit').click();
			cy.findByText('Thank you for contacting us');
		});
	});
});
