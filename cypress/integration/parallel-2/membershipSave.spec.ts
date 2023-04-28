import {
	contributionCard,
	guardianWeeklyExpiredCard,
	membershipSupporter,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { featureSwitches } from '../../../shared/featureSwitches';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

if (featureSwitches.membershipSave) {
	describe('Cancel membership saves', () => {
		beforeEach(() => {
			signInAndAcceptCookies();
			console.log('beforeEach');
			cy.intercept('GET', '/api/me/mma?productType=Membership', {
				statusCode: 200,
				body: toMembersDataApiResponse(membershipSupporter),
			});

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(membershipSupporter),
			});

			cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
				statusCode: 200,
				body: { subscriptions: [] },
			}).as('mobile_subscriptions');

			cy.intercept('GET', '/api/cancelled/', {
				statusCode: 200,
				body: [],
			}).as('cancelled');
		});

		it('switches to recurring contribution', () => {
			cy.visit('/cancel/membership');

			cy.findByText(
				/We're sorry to hear you're thinking of cancelling/,
			).should('exist');
			cy.findByRole('button', {
				name: 'Cancel online',
			}).click();

			cy.findByText(/Thank you for supporting the Guardian/).should(
				'exist',
			);
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
			cy.visit('/');
			cy.get(`[data-cy="Manage membership"]`).click();

			cy.findByText(/Cancel/).click();

			cy.findByText(
				/We're sorry to hear you're thinking of cancelling/,
			).should('exist');
			cy.findByRole('button', {
				name: 'Cancel online',
			}).click();

			cy.findByText(/Thank you for supporting the Guardian/).should(
				'exist',
			);
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
			cy.visit('/cancel/membership');

			cy.findByText(
				/We're sorry to hear you're thinking of cancelling/,
			).should('exist');
			cy.findByRole('button', {
				name: 'Cancel online',
			}).click();

			cy.findByText(/Thank you for supporting the Guardian/).should(
				'exist',
			);
			cy.findByRole('button', {
				name: 'Continue to cancellation',
			}).click();

			cy.findByText(/consider different support options/).should('exist');
			cy.findByRole('button', {
				name: 'Continue your membership',
			}).click();
		});

		it('redirects user with other product to normal journey', () => {
			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(
					membershipSupporter,
					contributionCard,
				),
			});

			cy.visit('/cancel/membership');

			cy.findByText(/Please select a reason/).should('exist');
		});

		it('redirects user in payment failiure to normal journey', () => {
			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(
					membershipSupporter,
					guardianWeeklyExpiredCard,
				),
			});

			cy.visit('/cancel/membership');

			cy.findByText(/Please select a reason/).should('exist');
		});
	});
}
