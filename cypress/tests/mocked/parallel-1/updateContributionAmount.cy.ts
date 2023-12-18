import {
	contributionPaidByCard,
	supporterPlus,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Update contribution amount', () => {
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

	beforeEach(() => {
		cy.setCookie('GU_mvt_id', '0');

		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionPaidByCard()),
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

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: { subscription: {} },
		}).as('new_product_detail');

		cy.intercept('POST', '/api/update/amount/**', {
			statusCode: 200,
		}).as('update_amount');

		cy.intercept('POST', '/api/update-supporter-plus-amount/**', {
			statusCode: 200,
			body: { message: 'success' },
		}).as('supporter_plus_update_amount');
	});

	it('Updates recurring contribution amount', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(contributionPaidByCard()),
		});
		cy.visit('/');

		setSignInStatus();

		cy.findByText('Manage recurring support').click();
		cy.wait('@cancelled');

		cy.findByText('Change amount').click();

		cy.get(
			'[data-cy="contribution-amount-choices"] label:first-of-type',
		).click();

		cy.findByText('Change amount').click();

		cy.wait('@update_amount');

		cy.contains(
			'We have successfully updated the amount of your support.',
		).should('exist');
	});

	it('Updates supporter plus amount', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(supporterPlus()),
		});
		cy.visit('/?withFeature=supporterPlusUpdateAmount');

		setSignInStatus();

		cy.findByText('Manage recurring support').click();
		cy.wait('@cancelled');

		cy.findByText('Change amount').click();

		cy.get(
			'[data-cy="supporter-plus-amount-choices"] label:first-of-type',
		).click();

		cy.findByText('Change amount').click();

		cy.wait('@supporter_plus_update_amount');

		cy.contains(
			'We have successfully updated the amount of your support.',
		).should('exist');
	});
});
