import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';
import {
	deliveryRecordsWithNoDeliveries,
	deliveryRecordsWithDelivery,
	deliveryRecordsWithReportedProblem
} from '../../../client/fixtures/deliveryRecords';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';
import { potentialDeliveries } from '../../../client/fixtures/holidays';

describe('Delivery records', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: deliveryRecordsWithDelivery,
		}).as('delivery_records');

		cy.intercept('GET', '/api/holidays/A-S00293857/potential?*', {
			statusCode: 200,
			body: potentialDeliveries,
		}).as('fetch_potential_holidays');

		cy.intercept('POST', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: deliveryRecordsWithReportedProblem,
		}).as('fetch_potential_holidays');
	});

	it('does not show delivery history when there have been no deliveries', () => {
		cy.intercept('GET', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: deliveryRecordsWithNoDeliveries,
		}).as('delivery_records');

		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByText(
			"You haven't had a delivery for this subscription yet. In the future, details of your deliveries will appear here.",
		).should('exist');
	});

	it('shows delivery details for dispatched deliveries', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.get('[data-cy="delivery-status"').contains("Dispatched");
	});

	it('allows you to report a problem with a delivery', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', {name: 'Report a problem'}).click();

		cy.findByText('Step 1. What type of problem are you experiencing?').should('exist');
		cy.findByRole('radio', {name: 'Damaged paper'}).click();
		cy.findByRole('textbox', {name: 'Please specify'}).type('Pages torn');
		cy.findByRole('button', {name: 'Continue to Step 2 & 3'}).click();

		cy.findByText('Step 2. Select the date you have experienced the problem').should('exist');
		cy.findByText('Step 3. Check your current delivery address').should('exist');
		cy.findByRole('checkbox').click();
		cy.findByRole('button', {name: 'Review your report'}).click();

		cy.wait('@fetch_potential_holidays');

		cy.findByText('Delivery report review').should('exist');
		cy.findByText('Step 4. Please review your report details').should('exist');
		cy.findByRole('button', {name: 'Submit your report'}).click();

		cy.findByText('Delivery report confirmation').should('exist');
		cy.findByText('Your delivery problem report has been successfully submitted.').should('exist');
		cy.findByText('Problem reported (Damaged paper)').should('exist');
	});

	it('displays an error message if a delivery problem is not selected', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', {name: 'Report a problem'}).click();

		cy.findByText('Step 1. What type of problem are you experiencing?').should('exist');
		cy.findByRole('button', {name: 'Continue to Step 2 & 3'}).click();

		cy.findByText('Please select the type of problem').should('exist');
	});

	it('returns you to the delivery history page if the cancel button is clicked', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', {name: 'Report a problem'}).click();

		cy.findByText('Step 1. What type of problem are you experiencing?').should('exist');
		cy.findByRole('button', {name: 'Cancel'}).click();

		cy.findByText('Step 1. What type of problem are you experiencing?').should('not.exist');
		cy.findByRole('button', {name: 'Report a problem'}).should('exist');
	});
});
