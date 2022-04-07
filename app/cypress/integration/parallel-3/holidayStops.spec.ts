import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl';
import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';
import {
	potentialDeliveries,
	noPotentialDeliveries,
	existingHolidays,
} from '../../../client/fixtures/holidays';

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on('uncaught:exception', () => {
	return false;
});

const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = 'Yes, I’m happy';

describe('Holiday stops', function () {
	beforeEach(function () {
		cy.session('auth', () => {
			setLocalBaseUrl();

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: [guardianWeeklyCurrentSubscription],
			}).as('mma');

			cy.intercept('GET', '/api/cancelled/', {
				statusCode: 200,
				body: [],
			}).as('cancelled');

			cy.wait(1000);
			cy.visit('/');

			cy.wait('@mma');
			cy.wait('@cancelled');

			// accept cookies
			cy.getIframeBody(iframeMessage)
				.find(`button[title="${acceptCookiesButtonText}"]`, {
					timeout: 10000,
				})
				.click();

			// wait for cookies to be set
			cy.wait(1000);
		});

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/holidays/A-S00293857/potential?*', {
			statusCode: 200,
			body: potentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.intercept('GET', '/api/holidays/A-S00293857', {
			statusCode: 200,
			body: existingHolidays,
		}).as('fetch_existing_holidays');

		cy.intercept('POST', '/api/holidays', {
			statusCode: 200,
			body: {
				message: 'success',
			},
		}).as('create_holiday_stop');
	});

	it('can add a holiday stop', function () {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create_suspension_cta"] button').click();

		cy.findByText('Choose the dates you will be away');
		cy.get('[data-cy="date_picker"] div').eq(9).click();
		cy.get('[data-cy="date_picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');
		cy.get('[data-cy="suspended-issues"')
			.contains('Suspending')
			.contains('1 issue');

		cy.findByText('Review details').click();

		cy.get('table').contains('9 February - 11 February 2022');
		cy.get('table').contains('1 issue');
		cy.get('table').contains('$8.13 off your 1 February 2023 payment');

		cy.findByText('Confirm').click();

		cy.wait('@create_holiday_stop');
		cy.findByText('Your schedule has been set').should('exist');
	});

	it('can amend a holiday stop', function () {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create_suspension_cta"] button').click();

		cy.get('[data-cy="date_picker"] div').eq(9).click();
		cy.get('[data-cy="date_picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');
		cy.findByText('Review details').click();

		cy.findByText('Amend').click();

		cy.findByText('Choose the dates you will be away').should('exist');
		cy.get('[aria-label="day"]').eq(0).should('have.value', '9');
		cy.get('[aria-label="month"]').eq(0).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(0).should('have.value', '2022');
		cy.get('[aria-label="day"]').eq(1).should('have.value', '11');
		cy.get('[aria-label="month"]').eq(1).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(1).should('have.value', '2022');
	});

	it('can not create holiday stop for dates when there is no delivery', function () {
		cy.intercept('GET', '/api/holidays/A-S00293857/potential?*', {
			statusCode: 200,
			body: noPotentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create_suspension_cta"] button').click();

		cy.get('[data-cy="date_picker"] div').eq(8).click();
		cy.get('[data-cy="date_picker"] div').eq(10).click();
		cy.wait('@fetch_potential_holidays');

		cy.findByText('No issues occur during selected period').should('exist');
	});
});
