import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import {
	contributionPaidByCard,
	contributionPaidByPayPal,
} from '../../../client/fixtures/productBuilder/testProducts';
import { productMovePreviewResponse } from '../../../client/fixtures/productMove';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('upgrade support', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				contributionPaidByCard(),
				contributionPaidByPayPal(),
			),
		}).as('mdapi_get_contribution');

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 200,
			body: productMovePreviewResponse,
		}).as('product_move');
	});

	it('upgrades contribution to supporter plus', () => {
		cy.visit('/upgrade-support');

		cy.findByText(/Increase your support/).should('exist');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Confirm change/).should('exist');

		cy.findByRole('button', {
			name: /Confirm support change/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Your new support/).should('exist');

		cy.get('@mdapi_get_contribution.all').should('have.length', 1);
		cy.get('@product_move.all').should('have.length', 2);
	});

	it('resets when a different amount is clicked, only calls product-move preview once', () => {
		cy.visit('/upgrade-support');

		cy.findByText(/Increase your support/).should('exist');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Confirm change/).should('exist');

		cy.get(
			'[data-cy="contribution-amount-choices"] label:nth-of-type(2)',
		).click();

		cy.findByText(/Confirm change/).should('not.exist');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.findByRole('button', {
			name: /Confirm support change/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Your new support/).should('exist');

		cy.get('@mdapi_get_contribution.all').should('have.length', 1);
		cy.get('@product_move.all').should('have.length', 2);
	});
});
