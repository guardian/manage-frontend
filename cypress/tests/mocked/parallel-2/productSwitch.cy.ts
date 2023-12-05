import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';
import {
	productMovePreviewResponse,
	productMoveSuccessfulResponse,
} from '../../../../client/fixtures/productMove';
import {
	contributionAboveSupporterPlusThreshold,
	contributionPaidByPayPalAboveSupporterPlusThreshold,
	contributionWithPaymentFailure,
	nonServicedCountryContributor,
} from '../../../../client/fixtures/productBuilder/testProducts';

const setSignInStatus = () => {
	cy.window().then((window) => {
		window.guardian.identityDetails = {
			signInStatus: 'signedInRecently',
			userId: '1',
			displayName: 'user',
			email: 'example@example.com',
		};
	});
};

describe('product switching', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				contributionAboveSupporterPlusThreshold(),
				contributionPaidByPayPalAboveSupporterPlusThreshold(),
			),
		}).as('mdapi_get_contribution');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				contributionAboveSupporterPlusThreshold(),
				contributionPaidByPayPalAboveSupporterPlusThreshold(),
			),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 200,
			body: productMovePreviewResponse,
		}).as('product_move');
	});

	it('successfully completes product switching page from Account Overview (pay by PayPal)', () => {
		cy.visit('/');
		setSignInStatus();

		cy.findAllByText('Change to monthly + extras').should('have.length', 2);
		cy.findAllByText('Change to monthly + extras').last().click();
		cy.findByText('Your current support').should('exist');

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.findByLabelText('PayPal').should('exist');
		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.intercept('POST', '/api/product-move/*', {
			statusCode: 200,
			body: productMoveSuccessfulResponse,
		});

		cy.findByText(/Thank you for changing your support type/).should(
			'exist',
		);
		cy.findByText(
			/Your first billing date is today and you will be charged £5/,
		).should('exist');

		cy.get('@mdapi_get_contribution.all').should('have.length', 0);
	});

	it('switches product', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByText('Your current support').should('exist');

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 200,
			body: productMoveSuccessfulResponse,
		});

		cy.findByText(/Thank you for changing your support type/).should(
			'exist',
		);
		cy.findByText(
			/Your first billing date is today and you will be charged £5/,
		).should('exist');

		cy.get('@mdapi_get_contribution.all').should('have.length', 1);
	});

	it('Does not allow user to navigate back to switch review and confirmation pages after switch completion', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 200,
			body: productMoveSuccessfulResponse,
		});

		cy.findByText(/Thank you for changing your support type/).should(
			'exist',
		);
		cy.findByText(
			/Your first billing date is today and you will be charged £5/,
		).should('exist');

		cy.go('back');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});

	it('shows an error message if switch fails', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.intercept('POST', '/api/product-move/**', {
			statusCode: 500,
			body: {},
		});

		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.findByText('We were unable to change your support').should('exist');
	});

	it('shows payment failure error message and does not call product move API again', () => {
		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionWithPaymentFailure()),
		});

		cy.visit('/switch');
		setSignInStatus();

		cy.findByText('There is a problem with your payment method').should(
			'exist',
		);

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.findByText('There is a problem with your payment method').should(
			'exist',
		);

		cy.get('@product_move.all').should('have.length', 1);
	});

	it('Billing Country is non-serviceable for Supporter Plus switch', () => {
		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(nonServicedCountryContributor()),
		}).as('mdapi_get_contribution');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(nonServicedCountryContributor()),
		});

		cy.visit('/');
		setSignInStatus();

		cy.findAllByText('Change to monthly + extras').should('have.length', 0);

		cy.visit('/switch');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
		cy.findAllByText('Change to monthly + extras').should('have.length', 0);
	});
});
