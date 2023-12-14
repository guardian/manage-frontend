import { digitalPackPaidByDirectDebit } from '../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel digi sub', () => {
	beforeEach(() => {
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

		cy.intercept('GET', '/api/me/mma?productType=Digipack', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(digitalPackPaidByDirectDebit()),
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

		cy.intercept('POST', 'api/discounts/preview-discount', {
			statusCode: 200,
			body: {
				valid: true,
				discountedPrice: 111.75,
			},
		}).as('preview_discount');

		cy.intercept('POST', 'api/discounts/apply-discount', {
			statusCode: 200,
		}).as('apply_discount');

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_digisub');
	});

	it('cancels Digi Sub and cannot go back into journey', () => {
		cy.visit('/?withFeature=digisubSave');

		cy.findByText('Manage subscription').click();
		cy.findByText('Cancel subscription').click();
		cy.findByText('Continue to cancel online').click();
		cy.findByText('Continue to cancel').click();
		cy.findByRole('button', {
			name: 'Cancel subscription',
		}).click();

		cy.findByText(/Your subscription has been cancelled/).should('exist');

		cy.go('back');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});

	it('goes back to discount screen, applies discount to Digi Sub and cannot renter journey', () => {
		cy.visit('/?withFeature=digisubSave');

		cy.findByText('Manage subscription').click();
		cy.findByText('Cancel subscription').click();
		cy.findByText('Continue to cancel online').click();

		cy.wait('@preview_discount');

		cy.findByText('Continue to cancel').click();

		cy.findByText('Go back to discount').click();

		cy.findByRole('button', {
			name: 'Keep support with discount',
		}).click();

		cy.wait('@apply_discount');

		cy.findByText('Discount confirmed');

		cy.go('back');
		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});
});
