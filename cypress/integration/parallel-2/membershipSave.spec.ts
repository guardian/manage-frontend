import {
	contributionPaidByCard,
	guardianWeeklyExpiredCard,
} from '../../../client/fixtures/productBuilder/testProducts';
import {
	membershipSupporter,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { productMovePreviewResponse } from '../../../client/fixtures/productMove';
import { featureSwitches } from '../../../shared/featureSwitches';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

if (featureSwitches.membershipSave) {
	describe('Cancel membership saves', () => {
		const setSignInStatus = () => {
			cy.window().then((window) => {
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '1',
					displayName: 'user',
					email: 'example@example.com',
				};
			});
		};

		beforeEach(() => {
			signInAndAcceptCookies();
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

			cy.intercept('GET', '/api/me/one-off-contributions', {
				statusCode: 200,
				body: [],
			}).as('single_contributions');

			cy.intercept('GET', '/api/cancelled/', {
				statusCode: 200,
				body: [],
			}).as('cancelled');

			cy.intercept('POST', '/api/case', {
				statusCode: 200,
				body: {
					id: 'caseId',
				},
			}).as('get_case');

			cy.intercept('POST', '/api/cancel/**', {
				statusCode: 200,
			}).as('cancel_membership');

			cy.intercept('GET', '/api/me/mma/**', {
				statusCode: 200,
				body: toMembersDataApiResponse(),
			});

			cy.intercept('POST', '/api/reminders/create', {
				statusCode: 200,
			}).as('set_reminder');

			cy.intercept('POST', '/api/product-move/**', {
				statusCode: 200,
				body: productMovePreviewResponse,
			}).as('product_move');
		});

		it('switches to recurring contribution', () => {
			cy.visit('/cancel/membership');

			cy.findByText(
				/We're sorry to hear you're thinking of leaving/,
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

			cy.findByText(
				/Are you sure you want to lose your exclusive benefits/,
			).should('exist');
			cy.findByRole('button', {
				name: 'Become a recurring contributor',
			}).click();

			cy.findByText(/Review and confirm change/).should('exist');
			cy.findByRole('button', {
				name: 'Confirm change',
			}).click();

			cy.wait('@product_move');
			cy.findByText(/Thank you/).should('exist');
			cy.findByText(/test@test.com/).should('exist');
		});

		it('cancels membership', () => {
			cy.visit('/');
			setSignInStatus();

			cy.get(`[data-cy="Manage membership"]`).click();

			cy.findByText(/Cancel/).click();

			cy.findByText(
				/We're sorry to hear you're thinking of leaving/,
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

			cy.findByText(
				/Are you sure you want to lose your exclusive benefits/,
			).should('exist');
			cy.findByRole('button', {
				name: 'Cancel Membership',
			}).click();

			cy.findByText(/Are you sure/).should('exist');
			cy.findByRole('button', {
				name: 'Confirm Cancellation',
			}).click();

			cy.wait('@get_case');
			cy.wait('@cancel_membership');

			cy.findByText(/Your membership has been cancelled/).should('exist');

			cy.findAllByRole('radio', {
				name: 'Other',
			}).click();

			cy.findByRole('button', {
				name: 'Submit',
			}).click();

			cy.wait('@get_case');

			cy.findByText(/You can support us again any time/).should('exist');
			cy.findByRole('button', {
				name: 'Set my reminder',
			}).click();

			cy.wait('@set_reminder');

			cy.findByText(/Thank you for setting up support reminder/).should(
				'exist',
			);
		});

		it('retains membership', () => {
			cy.visit('/cancel/membership');

			cy.findByText(
				/We're sorry to hear you're thinking of leaving/,
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

			cy.findByText(
				/Are you sure you want to lose your exclusive benefits/,
			).should('exist');
			cy.findByRole('button', {
				name: /Keep my Membership/,
			}).click();
		});

		it('redirects user with other product to normal journey', () => {
			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(
					membershipSupporter,
					contributionPaidByCard(),
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
					guardianWeeklyExpiredCard(),
				),
			});

			cy.visit('/cancel/membership');

			cy.findByText(/Please select a reason/).should('exist');
		});
	});
}
