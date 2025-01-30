import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import {
	guardianAdLite,
	guardianAdLiteCancelled,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel Guardian Ad-Lite', () => {
	const setupCancellation = () => {
		cy.visit('/');

		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByText('Manage subscription').click();

		cy.findByRole('link', {
			name: 'Cancel subscription',
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

		cy.intercept('GET', '/api/me/mma?productType=GuardianAdLite', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLite()),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLite()),
		}).as('mma');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLite()),
		}).as('new_product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		}).as('get_cancellation_date');

		cy.intercept('POST', '/api/cancel/**', {
			statusCode: 200,
		}).as('cancel_guardian_ad_lite');
	});

	it('user successfully cancels', () => {
		setupCancellation();

		cy.intercept('GET', '/api/me/mma?productType=GuardianAdLite', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianAdLiteCancelled()),
		}).as('get_cancelled_product');

		cy.findByText('Is this really goodbye?');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@cancel_guardian_ad_lite');
		cy.wait('@get_cancelled_product');

		cy.findByRole('heading', {
			name: 'Your guardian ad-lite is cancelled',
		});
	});
});
