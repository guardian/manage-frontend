import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import {
	contributionPaidByCard,
	guardianWeeklyExpiredCard,
	membershipSupporterWithOldPrice,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { productMovePreviewResponse } from '../../../../client/fixtures/productMove';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel Membership saves', () => {
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
			body: toMembersDataApiResponse(membershipSupporterWithOldPrice()),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(membershipSupporterWithOldPrice()),
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

		cy.intercept('POST', '/api/update-cancellation-reason/**', {
			statusCode: 204,
			body: {
				reason: 'reason',
			},
		}).as('update_zuora_cancellation_reason');

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

		cy.findByText(/We're sorry to hear you're thinking of leaving/).should(
			'exist',
		);
		cy.findByRole('button', {
			name: 'Continue to cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
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

	it('cancels membership and user cannot go back to confirmation screen', () => {
		cy.visit('/');
		setSignInStatus();

		cy.get(`[data-cy="Manage Membership"]`).click();

		cy.findByText(/Cancel/).click();

		cy.findByText(/We're sorry to hear you're thinking of leaving/).should(
			'exist',
		);
		cy.findByRole('button', {
			name: 'Continue to cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
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

		cy.findByText(/Your Membership has been cancelled/).should('exist');

		cy.go('back');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});

	it('retains membership', () => {
		cy.visit('/cancel/membership');

		cy.findByText(/We're sorry to hear you're thinking of leaving/).should(
			'exist',
		);
		cy.findByRole('button', {
			name: 'Continue to cancel online',
		}).click();

		cy.findByText(/Thank you for supporting the Guardian/).should('exist');
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
				membershipSupporterWithOldPrice(),
				contributionPaidByCard(),
			),
		});

		cy.visit('/cancel/membership');

		cy.findByText(/Please select a reason/).should('exist');
	});

	it('redirects user in payment failure to normal journey', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				membershipSupporterWithOldPrice(),
				guardianWeeklyExpiredCard(),
			),
		});

		cy.visit('/cancel/membership');

		cy.findByText(/Please select a reason/).should('exist');
	});
});
