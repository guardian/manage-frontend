import {
	guardianWeeklyPaidByCard,
	nationalDelivery,
	supporterPlus,
} from '../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Delivery address', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=ContentSubscription', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				supporterPlus(),
			),
		}).as('product_detail');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('PUT', '/api/delivery/address/update/**', {
			statusCode: 200,
			body: 'success',
		}).as('address_update');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');
	});

	it('Can update delivery address. Navigating from account overview', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				supporterPlus(),
			),
		}).as('mma');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByText('Manage subscription').click();
		cy.findByText('Manage delivery address').click();

		cy.get('input').first().invoke('val').should('equal', 'Kings Place');
		cy.get('input').first().clear().type('Queens Place');

		cy.get('input[name="instructions-checkbox"]').click();
		cy.findByText('Review details').click();

		cy.findByText('Submit details').click();

		cy.wait('@address_update')
			.its('request.body')
			.should('have.property', 'addressLine1', 'Queens Place');

		cy.findByText(
			'We have successfully updated your delivery details for your Guardian Weekly subscription. You will shortly receive a confirmation email.',
		).should('exist');
		cy.findByText('Queens Place').should('exist');

		cy.get('@address_update.all').should('have.length', 1);
	});

	it('Cannot update National delivery address. Navigating from account overview', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(nationalDelivery(), supporterPlus()),
		}).as('mma');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByText('Manage subscription').click();

		cy.intercept('GET', '/api/me/mma?productType=ContentSubscription', {
			statusCode: 200,
			body: toMembersDataApiResponse(nationalDelivery(), supporterPlus()),
		});

		cy.findByText('Manage delivery address').click();

		cy.findByText(/Changed address?/).should('exist');
	});

	it('Cannot update Guardian Weekly address, if also have National delivery', () => {
		cy.intercept('GET', '/api/me/mma**', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				nationalDelivery(),
				guardianWeeklyPaidByCard(),
				supporterPlus(),
			),
		}).as('mma');

		cy.visit('/guardianweekly');

		cy.wait('@mma');

		cy.findByText('Manage delivery address').click();

		cy.intercept('GET', '/api/me/mma?productType=ContentSubscription', {
			statusCode: 200,
			body: toMembersDataApiResponse(nationalDelivery(), supporterPlus()),
		});

		cy.findByText(/Changed address?/).should('exist');
	});

	it('Shows updated address when returning to manage subscription page', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				supporterPlus(),
			),
		}).as('mma');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByText('Manage subscription').click();
		cy.findByText('Manage delivery address').click();

		cy.get('input').eq(0).clear().type('Queens Place');
		cy.get('input').eq(1).clear().type('50 York Way');
		cy.get('input').eq(2).clear().type('Melbourne');
		cy.get('input').eq(3).clear().type('VIC');
		cy.get('input').eq(4).clear().type('3401');

		cy.get('input[name="instructions-checkbox"]').click();
		cy.findByText('Review details').click();

		cy.findByText('Submit details').click();
		cy.wait('@address_update');

		cy.findByText('Return to subscription').click();

		cy.findByText('Queens Place').should('exist');
		cy.findByText('50 York Way').should('exist');
		cy.findByText('Melbourne').should('exist');
		cy.findByText('VIC').should('exist');
		cy.findByText('3401').should('exist');
	});
});
