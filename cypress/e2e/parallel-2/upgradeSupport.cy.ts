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

	it('resets when a different amount is clicked, upgrades contribution to supporter plus, only calls product-move preview once', () => {
		cy.visit('/upgrade-support');

		cy.findByText(/Increase your support/).should('exist');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Confirm support increase/).should('exist');

		cy.get(
			'[data-cy="contribution-amount-choices"] label:nth-of-type(2)',
		).click();

		cy.findByText(/Confirm support increase/).should('not.exist');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.findByRole('button', {
			name: /Confirm increase/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Thank you/).should('exist');

		cy.get('@mdapi_get_contribution.all').should('have.length', 1);
		cy.get('@product_move.all').should('have.length', 2);
	});

	it('shows an error message if switch fails', () => {
		cy.visit('/upgrade-support');

		cy.findByText(/Increase your support/).should('exist');
		cy.wait('@product_move');

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 500,
			body: {},
		}).as('failed_product_move');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.findByRole('button', {
			name: /Confirm increase/,
		}).click();

		cy.wait('@failed_product_move');

		cy.findByText('We were unable to change your support').should('exist');
	});

	it('Does not allow user to navigate back to first page after completion', () => {
		cy.visit('/upgrade-support');

		cy.findByRole('button', {
			name: /Continue with/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Confirm support increase/).should('exist');

		cy.findByRole('button', {
			name: /Confirm increase/,
		}).click();

		cy.wait('@product_move');

		cy.findByText(/Thank you/).should('exist');

		cy.go('back');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});
});
