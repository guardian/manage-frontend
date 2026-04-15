import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { tierThree } from '../../../../client/fixtures/productBuilder/testProducts';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel tier three', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		const tierThreeWithSelfCancelEnabled = JSON.parse(
			JSON.stringify(tierThree()),
		);
		tierThreeWithSelfCancelEnabled.selfServiceCancellation.isAllowed = true;

		const postCancelTierThree = JSON.parse(JSON.stringify(tierThree()));
		postCancelTierThree.subscription.cancelledAt = true;
		postCancelTierThree.subscription.cancellationEffectiveDate =
			'2024-07-25';

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

		cy.intercept('GET', '/api/me/mma?productType=TierThree', {
			statusCode: 200,
			body: toMembersDataApiResponse(tierThreeWithSelfCancelEnabled),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(tierThreeWithSelfCancelEnabled),
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
			body: toMembersDataApiResponse(postCancelTierThree),
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

		cy.intercept('GET', 'api/existing-payment-options', {
			statusCode: 200,
			body: [],
		});
	});

	it('cancels tier three (reason: I dont have time to use my subscription, effective: next billing date)', () => {
		const feedback =
			'I still value the journalism, but this no longer fits my budget right now.';

		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel subscription',
		}).click();

		cy.findByText("We're sorry to see you go").should('exist');
		cy.contains('multiple/multiple').should('not.exist');
		cy.contains('multiple account plan').should('exist');

		cy.findAllByRole('radio').eq(6).click();
		cy.findByRole('textbox').type(feedback);

		cy.findByRole('button', { name: 'Continue to Cancel' }).click();

		cy.wait('@get_case');

		cy.findByText('Pause your subscription').should('exist');
		cy.findByRole('button', { name: 'Previous' }).click();
		cy.findAllByRole('radio').eq(6).should('be.checked');
		cy.findByRole('textbox').should('have.value', feedback);
		cy.findByRole('button', { name: 'Continue to Cancel' }).click();

		cy.findByRole('button', { name: 'Continue to cancel' }).click();

		cy.wait('@cancel_gw_holidays');
		cy.wait('@cancel_gw_deliveryrecords');

		cy.findByText(
			'test, thank you for supporting the Guardian since 29 November 2021. Is this really goodbye?',
		).should('exist');
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.findByText(
			'Your subscription to Digital + Print has been cancelled.',
		).should('exist');
		cy.findByText(
			'Your cancellation will take effect on 25 Jul 2024.',
		).should('exist');
	});
});
