import { digitalPackPaidByDirectDebit } from '../../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';
import { DiscountPreviewResponse } from '../../../../client/utilities/discountPreview';

const discountPreviewResponse: DiscountPreviewResponse = {
	discountedPrice: 111.75,
	discountPercentage: 100,
	upToPeriods: 3,
	upToPeriodsType: 'month',
	firstDiscountedPaymentDate: '2024-05-30',
	nextNonDiscountedPaymentDate: '2024-07-30',
	nonDiscountedPayments: [{ date: '2024-07-30', amount: 111.75 }],
};

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
			body: discountPreviewResponse,
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

	it('cancels after ineligible for discount', () => {
		cy.intercept('POST', 'api/discounts/preview-discount', {
			statusCode: 400,
		}).as('preview_discount_ineligible');

		cy.visit('/?withFeature=digisubSave');

		cy.findByText('Manage subscription').click();
		cy.findByText('Cancel subscription').click();
		cy.findByText('Continue to cancel online').click();

		cy.findByText(/discount/).should('not.exist');

		cy.findByText('Continue to cancel').click();

		cy.findByText(/Go back to discount/).should('not.exist');

		cy.findByRole('button', {
			name: 'Cancel subscription',
		}).click();

		cy.findByText(/Your subscription has been cancelled/).should('exist');
	});

	it('goes back to discount screen, applies discount to Digi Sub and cannot re-enter journey', () => {
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

		cy.findByText('Discount confirmed');

		cy.go('back');
		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});
});
