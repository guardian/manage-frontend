import { contribution } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';
import {
	availableProductMovesResponse,
	productMoveResponse,
} from '../../../client/fixtures/productMovement';
import { featureSwitches } from '../../../shared/featureSwitches';

if (featureSwitches.cancellationProductSwitch) {
	describe('product movement', () => {
		beforeEach(() => {
			signInAndAcceptCookies();

			cy.setCookie('GU_mvt_id', '999999');

			cy.intercept('GET', '/api/me/mma?productType=Contribution', {
				statusCode: 200,
				body: [contribution],
			});

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: [contribution],
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

			cy.intercept('GET', '/api/available-product-moves/**', {
				statusCode: 200,
				body: availableProductMovesResponse,
			}).as('available-product-moves');
		});

		it('Goes to cancellation reason selection on clicking Continue to cancellation', () => {
			cy.visit('/');

			cy.window().then((window) => {
				// @ts-ignore
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '200006712',
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
				// @ts-ignore
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '200006712',
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
				// @ts-ignore
				window.guardian.identityDetails = {
					signInStatus: 'signedInRecently',
					userId: '200006712',
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