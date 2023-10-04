import { user as userResponse } from '../../../client/fixtures/user';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Settings Form', () => {
	beforeEach(() => {
		signInAndAcceptCookies();
		// cy.session('auth', () => {
		// 	cy.setCookie('gu-cmp-disabled', 'true');
		// });

		cy.intercept('GET', '/idapi/user', {
			body: userResponse,
		}).as('user');

		cy.visit('/account-settings');
		cy.wait('@user');
	});

	const updatedUserResponse = {
		...userResponse,
		user: {
			...userResponse.user,
			privateFields: { registrationLocation: 'Canada' },
		},
	};

	it('displays user data correctly on page load', () => {
		cy.findByLabelText('Email').should(
			'have.value',
			'test.user@example.com',
		);
		cy.findByLabelText('Location').should('have.value', 'Other');
	});

	it('submits updated user data correctly and displays updated response', () => {
		cy.intercept('PUT', '/idapi/user', {
			statusCode: 200,
			body: updatedUserResponse,
		}).as('updatedUserResponse');

		// Check form correctly submits text field and dropdown value
		cy.findAllByLabelText('Last Name').type('NewSurname');
		cy.findByLabelText('Location').select('Prefer not to say');
		cy.findAllByText('Save changes').click();
		cy.wait('@updatedUserResponse')
			.its('request.body')
			.should('have.deep.property', 'privateFields', {
				registrationLocation: 'Prefer not to say',
				secondName: 'UserNewSurname',
			});

		// Check form correctly updated with new response value
		cy.findByLabelText('Location').should('have.value', 'Canada');
	});
});
