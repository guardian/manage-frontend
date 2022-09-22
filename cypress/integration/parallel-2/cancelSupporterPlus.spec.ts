import { supporterPlus } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel Supporter Plus', () => {
	beforeEach(() => {
		cy.setCookie('GU_mvt_id', '0');

		signInAndAcceptCookies();

		supporterPlus.selfServiceCancellation.isAllowed = true;

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

		cy.intercept('GET', '/api/me/mma?productType=SupporterPlus', {
			statusCode: 200,
			body: [supporterPlus],
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [supporterPlus],
		});

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: { subscription: {} },
		}).as('new_product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		});

		cy.intercept('POST', '/supporter-plus-cancel/**', {
			statusCode: 200,
		}).as('cancel_supporter_plus');
	});

	it('allows self-service cancellation of Supporter Plus', () => {
		cy.visit('/');

		cy.findByText('Manage subscription').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel subscription',
		}).click();

		cy.findAllByRole('radio').eq(0).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_supporter_plus');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your supporter plus is cancelled.',
		});
	});
});
