import { guardianWeeklyPaidByCard } from '../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel guardian weekly', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		const GWwithSelfCancelEnabled = JSON.parse(
			JSON.stringify(guardianWeeklyPaidByCard()),
		);
		GWwithSelfCancelEnabled.selfServiceCancellation.isAllowed = true;

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

		cy.intercept('GET', '/api/me/mma?productType=GuardianWeekly', {
			statusCode: 200,
			body: toMembersDataApiResponse(GWwithSelfCancelEnabled),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(GWwithSelfCancelEnabled),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		});

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

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
		}).as('cancel_gw');

		cy.intercept('GET', 'api/holidays/**', {
			publicationsToRefund: [],
		}).as('cancel_gw_holidays');

		cy.intercept('GET', 'api/delivery-records/**', {
			results: [],
			deliveryProblemMap: {},
			contactPhoneNumbers: {
				Id: 'yo',
			},
		}).as('cancel_gw_deliveryrecords');
	});

	it('cancels Guardian Weekly (reason: I dont have time to use my subscription, effective: today)', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel subscription',
		}).click();
		cy.findAllByRole('radio').eq(6).click();

		cy.findAllByRole('radio').check('Today');
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@cancel_gw_holidays');
		cy.wait('@cancel_gw_deliveryrecords');
		cy.wait('@create_case_in_salesforce');

		cy.findByText(
			'Your cancellation request has been successfully submitted. Our customer service team will try their best to contact you as soon as possible to confirm the cancellation and refund any credit you are owed.',
		).should('exist');

		cy.get('@get_cancellation_date.all').should('have.length', 1);
	});

	it('cancels Guardian Weekly (reason: I dont have time to use my subscription, effective: next billing date)', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel subscription',
		}).click();
		cy.findAllByRole('radio').eq(6).click();

		cy.get('input[type="radio"][value="EndOfLastInvoicePeriod"]').click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@cancel_gw_holidays');
		cy.wait('@cancel_gw_deliveryrecords');
		cy.wait('@create_case_in_salesforce');
		cy.wait('@new_product_detail');

		cy.findByText('Your Guardian Weekly subscription is cancelled').should(
			'exist',
		);

		cy.get('@get_cancellation_date.all').should('have.length', 1);
	});
});
