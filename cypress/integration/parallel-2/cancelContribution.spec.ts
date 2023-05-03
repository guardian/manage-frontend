import {
	contributionCard,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel contribution', () => {
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

	const setupCancellation = () => {
		cy.visit('/');

		setSignInStatus();

		cy.findByText('Manage recurring support').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring support',
		}).click();
	};

	beforeEach(() => {
		cy.setCookie('GU_mvt_id', '0');

		signInAndAcceptCookies();

		cy.intercept('POST', '/api/case', {
			statusCode: 200,
			body: {
				id: 'caseId',
			},
		}).as('get_case');

		cy.intercept('PATCH', '/api/case/**', {
			statusCode: 200,
			body: { message: 'success' },
		}).as('create_case_in_salesforce');

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionCard),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionCard),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		});

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(),
		}).as('new_product_detail');
		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		}).as('get_cancellation_date');

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_contribution');
	});

	it('cancels contribution (reason: As a result of a specific article I read)', () => {
		setupCancellation();
		cy.findByRole('radio', {
			name: 'As the result of a specific article I read',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('does not cancel contribution, case api call returns 500', () => {
		cy.intercept('POST', '/api/case', {
			statusCode: 500,
		}).as('get_case');

		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case').its('response.statusCode').should('equal', 500);

		cy.findByText('Oops!').should('exist');

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('cancels contribution with custom save body component (reason: I can no longer afford to support you)', () => {
		setupCancellation();
		cy.findByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).should('exist');

		cy.findByRole('button', { name: 'I still want to cancel' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('cancels contribution with save body string (reason: I’d like to get something in return for my support)', () => {
		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I’d like to get something ‘in return’ for my support, e.g. digital features',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByText(
			'Thank you for your ongoing support. Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
		).should('exist');
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('save journey completed contribution not cancelled, amount reduced', () => {
		cy.intercept('POST', 'api/update/amount/contributions/**', {
			statusCode: 200,
			body: { status: 'success' },
		});

		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).click();

		cy.get('input[type="number"]').type('80');
		cy.findByRole('button', { name: 'Change amount' }).click();

		cy.findByText(
			'We have successfully updated the amount of your contribution. New amount, £80.00, will be taken on 5 Feb 2022. Thank you for supporting the Guardian.',
		).should('exist');

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('allows cancellation when visiting cancellation page directly', () => {
		cy.visit('/cancel/contributions');

		setSignInStatus();

		cy.findAllByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled',
		});

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});
});
