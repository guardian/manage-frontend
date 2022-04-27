import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';
import {
	potentialDeliveries,
	noPotentialDeliveries,
	existingHolidays,
	existingHolidaysWithDeletion,
} from '../../../client/fixtures/holidays';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Holiday stops', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

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

	it('can add a new holiday stop', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create_suspension_cta"] button').click();

		cy.findByText('Choose the dates you will be away');
		cy.get('[data-cy="date_picker"] div').eq(9).click();
		cy.get('[data-cy="date_picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');
		cy.get('[data-cy="suspended-issues"]')
			.contains('Suspending')
			.contains('1 issue');

		cy.findByText('Review details').click();

		cy.get('table').contains('9 February - 11 February 2022');
		cy.get('table').contains('1 issue');
		cy.get('table').contains('$8.13 off your 1 February 2023 payment');

		cy.findByText('Confirm').click();

		cy.wait('@create_holiday_stop');
		cy.findByText('Your schedule has been set').should('exist');

		cy.get('@create_holiday_stop.all').should('have.length', 1);
	});

	it('can amend a non-confirmed holiday stop', () => {
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
		cy.findByText('Please select your new dates...').should('exist');
		cy.get('[aria-label="day"]').eq(0).should('have.value', '9');
		cy.get('[aria-label="month"]').eq(0).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(0).should('have.value', '2022');
		cy.get('[aria-label="day"]').eq(1).should('have.value', '11');
		cy.get('[aria-label="month"]').eq(1).should('have.value', '2');
		cy.get('[aria-label="year"]').eq(1).should('have.value', '2022');

		cy.get('[data-cy="date_picker"] div').eq(16).click();
		cy.get('[data-cy="date_picker"] div').eq(18).click();
		cy.wait('@fetch_potential_holidays');

		cy.get('[aria-label="day"]').eq(0).should('have.value', '16');
		cy.get('[aria-label="day"]').eq(1).should('have.value', '18');
		cy.get('[data-cy="suspended-issues"]')
			.contains('Suspending')
			.contains('1 issue');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
		cy.get('@fetch_potential_holidays.all').should('have.length', 2);
	});

	it('can not create a holiday stop for date range when there are no deliveries', () => {
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

		cy.get('@product_detail.all').should('have.length', 1);
		cy.get('@fetch_potential_holidays.all').should('have.length', 1);
	});

	it('shows existing holidays stops on landing page', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');

		cy.get('table').contains('11 March - 12 March 2022');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
	});

	it('can amend an existing holiday stop', () => {
		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');

		cy.get('table').findByText('Amend').click();
		cy.findByText('Please select your new dates...').should('exist');

		cy.get('[data-cy="date_picker"] div').eq(9).click();
		cy.get('[data-cy="date_picker"] div').eq(11).click();
		cy.wait('@fetch_potential_holidays');

		cy.findByText('Review details').click();
		cy.get('table').contains('9 February - 11 February 2022');

		cy.get('@fetch_existing_holidays.all').should('have.length', 1);
		cy.get('@product_detail.all').should('have.length', 1);
	});

	it('can delete an existing holiday stop', () => {
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

		cy.intercept('GET', '/api/holidays/A-S00293857', {
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
});
