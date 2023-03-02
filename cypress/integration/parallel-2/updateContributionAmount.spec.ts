import { contributionCard } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Update contribution amount', () => {
	const setSignInStatus = () => {
		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});
	};

	beforeEach(() => {
		cy.setCookie('GU_mvt_id', '0');

		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: [contributionCard],
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [contributionCard],
		});

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: { subscription: {} },
		}).as('new_product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('POST', '/api/update/amount/contributions/**', {
			statusCode: 200,
		}).as('update_contribution_amount');
	});

	it('Update contribution amount', () => {
		cy.visit('/');

		setSignInStatus();

		cy.findByText('Manage recurring support').click();
		cy.wait('@cancelled');

		cy.findByText('Change amount').click();

		cy.get(
			'[data-cy="contribution-amount-choices"] label:first-of-type',
		).click();

		cy.findByText('Change amount').click();

		cy.wait('@update_contribution_amount');

		cy.contains(
			'We have successfully updated the amount of your contribution.',
		).should('exist');
	});
});
