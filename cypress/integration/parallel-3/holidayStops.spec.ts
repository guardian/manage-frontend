import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import {
	potentialDeliveries,
	noPotentialDeliveries,
	existingHolidays,
	existingHolidaysWithDeletion,
	multiplePotentialDeliveries,
	existingHolidaysFirstIssueDecember,
	yearSpanningPotentialDeliveries,
} from '../../../client/fixtures/holidays';
import { guardianWeeklyPaidByCard } from '../../../client/fixtures/productBuilder/testProducts';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Holiday stops', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: toMembersDataApiResponse(guardianWeeklyPaidByCard()),
		}).as('product_detail');

		cy.intercept('GET', '/api/holidays/*/potential?*', {
			statusCode: 200,
			body: yearSpanningPotentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.intercept('GET', '/api/holidays/*', {
			statusCode: 200,
			body: existingHolidaysFirstIssueDecember,
		}).as('fetch_existing_holidays');

		cy.intercept('POST', '/api/holidays', {
			statusCode: 200,
			body: {
				message: 'success',
			},
		}).as('create_holiday_stop');
	});

	it('can add a new holiday stop', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		cy.findByText('Choose the dates you will be away');

		// Selects 09/02/2022 - 11/02/2022
		cy.get('[data-cy="date-picker"] div').eq(9).click();
		cy.get('[data-cy="date-picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');

		// Total issues suspended
		cy.get('[data-cy="suspension-issue-count"]').eq(0).contains('1 issue');

		cy.findByText('Review details').click();

		cy.get('table').contains('9 February - 11 February 2022');
		cy.get('table').contains('1 issue');
		cy.get('table').contains('$2.89 off your 1 February 2023 payment');

		cy.findByText('Confirm').click();

		cy.wait('@create_holiday_stop');
		cy.findByText('Your schedule has been set').should('exist');

		cy.get('@create_holiday_stop.all').should('have.length', 1);
	});

	it('can amend a non-confirmed holiday stop', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		// Selects 09/02/2022 - 11/02/2022
		cy.get('[data-cy="date-picker"] div').eq(9).click();
		cy.get('[data-cy="date-picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');
		cy.findByText('Review details').click();

		cy.findByText('Amend').click();

		cy.findByText('Choose the dates you will be away').should('exist');
		cy.findByText('Please select your new dates...').should('exist');
		cy.get('[aria-label="day"]').eq(0).should('have.value', '9');
		cy.get('[aria-label="month"]').eq(0).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(0).should('have.value', '2022');
		cy.get('[aria-label="day"]').eq(1).should('have.value', '11');
		cy.get('[aria-label="month"]').eq(1).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(1).should('have.value', '2022');

		cy.get('[data-cy="date-picker"] div').eq(16).click();
		cy.get('[data-cy="date-picker"] div').eq(18).click();
		cy.wait('@fetch_potential_holidays');

		// Selects 16/02/2022 - 18/02/2022
		cy.get('[aria-label="day"]').eq(0).should('have.value', '16');
		cy.get('[aria-label="day"]').eq(1).should('have.value', '18');

		// Total issues suspended
		cy.get('[data-cy="suspension-issue-count"]').eq(0).contains('1 issue');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
		cy.get('@fetch_potential_holidays.all').should('have.length', 2);
	});

	it('can not create a holiday stop for date range when there are no deliveries', () => {
		cy.intercept('GET', '/api/holidays/*/potential?*', {
			statusCode: 200,
			body: noPotentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		// Selects 08/02/2022 - 10/02/2022
		cy.get('[data-cy="date-picker"] div').eq(8).click();
		cy.get('[data-cy="date-picker"] div').eq(10).click();
		cy.wait('@fetch_potential_holidays');

		cy.findByText('No issues occur during selected period').should('exist');

		cy.get('@product_detail.all').should('have.length', 1);
		cy.get('@fetch_potential_holidays.all').should('have.length', 1);
	});

	it('shows existing holidays stops on overview page', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');

		cy.get('table').contains('11 March - 12 March 2022');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
	});

	it('can amend an existing holiday stop from overview page', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');

		cy.get('table').findByText('Amend').click();
		cy.findByText('Please select your new dates...').should('exist');

		// Selects 09/02/2022 - 11/02/2022
		cy.get('[data-cy="date-picker"] div').eq(9).click();
		cy.get('[data-cy="date-picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');

		cy.findByText('Review details').click();
		cy.get('table').contains('9 February - 11 February 2022');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
	});

	it('can delete an existing holiday stop from overview page', () => {
		cy.intercept('DELETE', '/api/holidays/*/*', {
			statusCode: 200,
			body: {
				message: 'success',
			},
		}).as('delete_holiday_stop');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');

		cy.get('table').findByText('Delete').click();

		cy.intercept('GET', '/api/holidays/*', {
			statusCode: 200,
			body: existingHolidaysWithDeletion,
		}).as('fetch_existing_holidays');

		cy.findByRole('button', { name: 'Yes' }).click();
		cy.wait('@delete_holiday_stop');
		cy.wait('@fetch_existing_holidays');

		cy.get('table').contains('Deleted on 7 April 2022');

		cy.get('@fetch_existing_holidays.all').should('have.length', 2);
		cy.get('@product_detail.all').should('have.length', 1);
		cy.get('@delete_holiday_stop.all').should('have.length', 1);
	});

	it('can create a holiday stop where multiple products of the same type exist by navigating from the Account Overview page', () => {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				guardianWeeklyPaidByCard(),
			),
		}).as('mma');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/holidays/*', {
			statusCode: 200,
			body: existingHolidays,
		}).as('fetch_existing_holidays');

		cy.intercept('GET', '/api/holidays/*/potential?*', {
			statusCode: 200,
			body: potentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
		cy.findAllByText('Manage subscription').eq(0).click();

		cy.findByText(/A-S00/).should('exist');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findAllByText('Manage subscription').eq(1).click();

		cy.findByText(/A-S00/).should('exist');
		cy.findByRole('link', { name: 'Manage suspensions' }).click();

		cy.wait('@fetch_existing_holidays');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		cy.findByText('Choose the dates you will be away').should('exist');

		// Selects 09/02/2022 - 11/02/2022
		cy.get('[data-cy="date-picker"] div').eq(9).click();
		cy.get('[data-cy="date-picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');

		// Total issues suspended
		cy.get('[data-cy="suspension-issue-count"]').eq(0).contains('1 issue');

		cy.findByText('Review details').click();

		cy.get('table').contains('9 February - 11 February 2022');
		cy.get('table').contains('1 issue');
		cy.get('table').contains('£2.89 off your 1 February 2023 payment');

		cy.findByText('Confirm').click();

		cy.wait('@create_holiday_stop');
		cy.findByText('Your schedule has been set').should('exist');

		cy.get('@create_holiday_stop.all').should('have.length', 1);
	});

	it('redirects you to the Account Overview page if the suspend URL is visited directly and there are multiple products of the same type', () => {
		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				guardianWeeklyPaidByCard(),
			),
		}).as('mma_filtered');

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(
				guardianWeeklyPaidByCard(),
				guardianWeeklyPaidByCard(),
			),
		}).as('mma');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('single_contributions');

		cy.visit('/suspend/guardianweekly');

		cy.wait('@mma_filtered');
		cy.wait('@mma');
		cy.wait('@cancelled');

		cy.findByRole('heading', { name: 'Account overview' }).should('exist');
		cy.findAllByText(/A-S00/).should('have.length', 2);
	});

	it('does not allow you to create more holiday stops than the subscriptions annual suspension limit', () => {
		cy.intercept('GET', '/api/holidays/*/potential?*', {
			statusCode: 200,
			body: multiplePotentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		cy.findByRole('button', { name: 'Go forward a month' }).click();

		// Calendar has been advanced to the next month.
		// Selects 18/03/2022 - 22/04/2022
		cy.get('[data-cy="date-picker"] div').eq(53).click();
		cy.get('[data-cy="date-picker"] div').eq(95).click();
		cy.wait('@fetch_potential_holidays');

		cy.findByText(/Exceeded issue limit of 6/).should('exist');
	});

	it('allows you to create a holiday stop that begins and ends in different years and correctly calculates remaining issues', () => {
		cy.intercept('GET', '/api/holidays/*', {
			statusCode: 200,
			body: existingHolidaysFirstIssueDecember,
		}).as('fetch_existing_holidays');

		cy.intercept('GET', '/api/holidays/*/potential?*', {
			statusCode: 200,
			body: yearSpanningPotentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create-suspension-cta"] button').click();

		// Selects 23/12/2022 - 13/01/2023
		cy.get('[data-cy="date-picker"] div').eq(25).click();
		cy.get('[data-cy="date-picker"] div').eq(53).click();
		cy.wait('@fetch_potential_holidays');

		// Total issues suspended
		cy.get('[data-cy="suspension-issue-count"]').eq(0).contains('4 issues');

		// Issues remaining this year and next year
		cy.get('[data-cy="suspension-issue-count"]').eq(1).contains('5 issues');
		cy.get('[data-cy="suspension-issue-count"]').eq(2).contains('3 issues');
	});
});
