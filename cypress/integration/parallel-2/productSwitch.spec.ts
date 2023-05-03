import {
	contributionCard,
	contributionPayPal,
	toMembersDataApiResponse,
} from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';
import {
	productMovePreviewResponse,
	productMoveSuccessfulResponse,
} from '../../../client/fixtures/productMove';
import {
	availableProductMovesResponse,
	productMoveResponse,
} from '../../../client/fixtures/productMovement';
import { featureSwitches } from '../../../shared/featureSwitches';
import { ProductDetail } from '../../../shared/productResponse';

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

if (featureSwitches.cancellationProductSwitch) {
	describe('product movement', () => {
		beforeEach(() => {
			signInAndAcceptCookies();

			cy.setCookie('GU_mvt_id', '999999');

			cy.intercept('GET', '/api/me/mma?productType=Contribution', {
				statusCode: 200,
				body: toMembersDataApiResponse(contributionCard),
			});

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(contributionCard),
			});

			cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
				statusCode: 200,
				body: { subscriptions: [] },
			});

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
			});

			cy.intercept('GET', '/api/available-product-moves/**', {
				statusCode: 200,
				body: availableProductMovesResponse,
			}).as('available-product-moves');
		});

		it('Goes to cancellation reason selection on clicking Continue to cancellation', () => {
			cy.visit('/');

			cy.window().then((window) => {
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '1',
					displayName: 'user',
					email: 'example@example.com',
				};
			});

			cy.findByText('Manage recurring contribution').click();
			cy.wait('@cancelled');

			cy.findByRole('link', {
				name: 'Cancel recurring contribution',
			}).click();

			cy.wait('@available-product-moves');

			cy.findByText('Continue to cancellation').click();

			cy.findByText('Please select a reason').should('exist');
		});

		it('Completes a product switch from recurring contribution to digital subscription', () => {
			cy.intercept('POST', '/api/product-move/**', {
				statusCode: 200,
				body: productMoveResponse,
			}).as('product-move');

			cy.visit('/');

			cy.window().then((window) => {
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '1',
					displayName: 'user',
					email: 'example@example.com',
				};
			});

			cy.findByText('Manage recurring contribution').click();
			cy.wait('@cancelled');

			cy.findByRole('link', {
				name: 'Cancel recurring contribution',
			}).click();

			cy.wait('@available-product-moves');

			cy.contains('14 days free trial then 50% off for 3 months').should(
				'exist',
			);

			cy.findByText('£5.99').should('exist');

			cy.findByText('Explore a digital subscription').click();

			cy.findByText(
				'Change your support to a digital subscription',
			).should('exist');
			cy.findByText('Manage your support type').should('exist');
			cy.findByText('Return to cancellation').should('exist');

			cy.findByText('Confirm change').click();

			cy.wait('@product-move');

			cy.contains('digital subscription');
			cy.contains(
				'Your first payment of £5.99 will be taken on 21 June 2022.',
			).should('exist');

			cy.url().should('include', 'confirmed');
		});

		it('Shows error screen if API fails when switching from recurring contribution to digital subscription', () => {
			cy.intercept('POST', '/api/product-move/**', {
				statusCode: 500,
			}).as('product-move-failure');

			cy.visit('/');

			cy.window().then((window) => {
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '1',
					displayName: 'user',
					email: 'example@example.com',
				};
			});

			cy.findByText('Manage recurring contribution').click();
			cy.wait('@cancelled');

			cy.findByRole('link', {
				name: 'Cancel recurring contribution',
			}).click();

			cy.wait('@available-product-moves');

			cy.findByText('Explore a digital subscription').click();

			cy.findByText(
				'Change your support to a digital subscription',
			).should('exist');
			cy.findByText('Manage your support type').should('exist');
			cy.findByText('Return to cancellation').should('exist');

			cy.findByText('Confirm change').click();

			cy.wait('@product-move-failure');

			cy.url().should('include', 'failed');
		});
	});
}

describe('product switching', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				contributionCard,
				contributionPayPal,
			),
		}).as('mdapi_get_contribution');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				contributionCard,
				contributionPayPal,
			),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('POST', '/api/product-move/*', {
			statusCode: 200,
			body: productMovePreviewResponse,
		}).as('product_move');
	});

	it('successfully completes product switching page from Account Overview', () => {
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

	it('shows product switching page when visiting URL directly', () => {
		cy.visit('/switch');
		setSignInStatus();
		cy.findByText('Your current support').should('exist');
	});

	it('shows review page after choosing to switch', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.findByText('Review change').should('exist');
		cy.findByText('Your new support').should('exist');
		cy.findByText('What happens next?').should('exist');
	});

	it('successfully switches product', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

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

		cy.get('@mdapi_get_contribution.all').should('have.length', 1);
	});

	it('Does not allow user to navigate back to switch review and confirmation pages after switch completion', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

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

		cy.go('back');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
	});

	it('shows an error message if switch fails', () => {
		cy.visit('/switch');
		setSignInStatus();

		cy.findByRole('button', {
			name: 'Add extras',
		}).click();

		cy.intercept('POST', '/api/product-move/*', {
			statusCode: 500,
			body: {},
		});

		cy.findByRole('button', { name: 'Confirm change' }).click();

		cy.findByText('We were unable to change your support').should('exist');
	});

	it('shows payment failure error message and does not call product move API again', () => {
		const contributionWithPaymentFailure: ProductDetail = JSON.parse(
			JSON.stringify(contributionCard),
		);
		contributionWithPaymentFailure.alertText = 'Payment failed';

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionWithPaymentFailure),
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
});
