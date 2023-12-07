import { digitalPackPaidByDirectDebit } from '../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel digi sub', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		const DigiSubSelfCancelEnabled = JSON.parse(
			JSON.stringify(digitalPackPaidByDirectDebit()),
		);
		DigiSubSelfCancelEnabled.selfServiceCancellation.isAllowed = true;

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

		cy.intercept('GET', '/api/me/mma?productType=Digipack', {
			statusCode: 200,
			body: toMembersDataApiResponse(DigiSubSelfCancelEnabled),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(DigiSubSelfCancelEnabled),
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
		}).as('cancel_digisub');
	});

	it('cancels Guardian Weekly (reason: I dont have time to use my subscription, effective: today)', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.findByText('Cancel subscription').click();
	});
});
