import {
	membership,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel membership saves', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Membership', {
			statusCode: 200,
			body: toMembersDataApiResponse(membership),
		});
	});

	it('switches to recurring contribution', () => {
		cy.visit('/cancel/membership/landing');

		cy.findByText(
			/We're sorry to hear you're thinking of cancelling/,
		).should('exist');
		cy.findByRole('button', {
			name: 'Cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
		cy.findByRole('button', {
			name: 'Continue to cancellation',
		}).click();

		cy.findByText(/consider different support options/).should('exist');
		cy.findByRole('button', {
			name: 'Become a recurring supporter',
		}).click();

		cy.findByText(/Review change/).should('exist');
		cy.findByRole('button', {
			name: 'Confirm change',
		}).click();
	});

	it('cancels membership', () => {
		cy.visit('/cancel/membership/landing');

		cy.findByText(
			/We're sorry to hear you're thinking of cancelling/,
		).should('exist');
		cy.findByRole('button', {
			name: 'Cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
		cy.findByRole('button', {
			name: 'Continue to cancellation',
		}).click();

		cy.findByText(/consider different support options/).should('exist');
		cy.findByRole('button', {
			name: 'Cancel membership',
		}).click();

		cy.findByText(/Your Membership is cancelled/).should('exist');
	});

	it('retains membership', () => {
		cy.visit('/cancel/membership/landing');

		cy.findByText(
			/We're sorry to hear you're thinking of cancelling/,
		).should('exist');
		cy.findByRole('button', {
			name: 'Cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
		cy.findByRole('button', {
			name: 'Continue to cancellation',
		}).click();

		cy.findByText(/consider different support options/).should('exist');
		cy.findByRole('button', {
			name: 'Continue your membership',
		}).click();
	});
});
