import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import {
	patron,
	patronDigitalPack,
	patronMembership,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel patron', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		const basePatronResponse = JSON.parse(
			JSON.stringify(patronDigitalPack()),
		);

		cy.intercept('GET', '/api/me/mma?productType=Digipack', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		});

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		}).as('get_cancellation_date');

		cy.intercept('POST', 'api/discounts/preview-discount', {
			statusCode: 400,
		}).as('preview_discount_ineligible');

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

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_patron');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(),
		}).as('new_product_detail');
	});

	it('cancels patron (digipack)', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.get('button').contains('Cancel subscription').click();

		cy.findByText(
			'To cancel today, please choose from the following options.',
		).should('exist');

		cy.get('button').contains('Continue to cancel online').click();

		cy.findByText('Still want to cancel?').should('exist');

		cy.get('button').contains('Continue to cancel').click();

		cy.findByText(
			'Please confirm to cancel your digital subscription',
		).should('exist');

		cy.get('button').contains('Cancel subscription').click();

		cy.findByText(/Your subscription has been cancelled/).should('exist');
	});

	it('cancels patron (membership)', () => {
		const basePatronResponse = JSON.parse(
			JSON.stringify(patronMembership()),
		);

		cy.intercept('GET', '/api/me/mma?productType=Membership', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.intercept('GET', 'api/existing-payment-options', {
			statusCode: 200,
			body: [],
		});

		cy.visit('/');

		cy.findByText('Manage Membership').click();
		cy.wait('@cancelled');

		cy.findByText(/Cancel/).click();

		cy.findByLabelText('A change in my financial circumstances').click();

		cy.findByText(/Continue/).click();
		cy.findByText('Confirm cancellation').click();

		cy.findByText('Your Membership is cancelled').should('exist');
	});

	it('cancels patron (new specific product type)', () => {
		const basePatronResponse = JSON.parse(JSON.stringify(patron()));

		cy.intercept('GET', '/api/me/mma?productType=Membership', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(basePatronResponse),
		});

		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByText('Would you like to cancel your subscription?').should(
			'exist',
		);

		cy.get('a[href="/cancel/guardianpatron"]').click();

		cy.findByText('Contact us to cancel').should('exist');
		cy.findByText(
			'Please contact our Customer Service team. You can find the contact details for your region below.',
		).should('exist');
	});
});
