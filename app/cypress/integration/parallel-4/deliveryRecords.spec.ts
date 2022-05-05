import {
	guardianWeeklyCurrentSubscription,
	homeDeliverySubscription,
} from '../../../client/fixtures/productDetail';
import {
	deliveryRecordsWithNoDeliveries,
	deliveryRecordsWithDelivery,
	deliveryRecordsWithReportedProblem,
} from '../../../client/fixtures/deliveryRecords';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';
import { potentialDeliveries } from '../../../client/fixtures/holidays';
import {
	dateAddDays,
	dateString,
	DATE_FNS_INPUT_FORMAT,
} from '../../../shared/dates';

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

	it('shows delivery history when multiple products of the same type exist. Navigating from account overview', () => {
		const secondaryGWSubscription = JSON.parse(
			JSON.stringify(guardianWeeklyCurrentSubscription),
		);
		const secondarySubscriptionId = 'A-S00000002';
		secondaryGWSubscription.subscription.subscriptionId =
			secondarySubscriptionId;
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription, secondaryGWSubscription],
		}).as('mma');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept(
			'GET',
			`/api/delivery-records/${secondarySubscriptionId}`,
			{
				statusCode: 200,
				body: deliveryRecordsWithDelivery,
			},
		).as('fetch_potential_holidays_for_secondary_sub');

		cy.visit('/');
		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.findAllByText('Manage subscription').eq(1).click();
		cy.findByText(secondarySubscriptionId).should('exist');
		cy.findByText('Manage delivery history').click();
		cy.wait('@fetch_potential_holidays_for_secondary_sub');
		cy.findByText(secondarySubscriptionId).should('exist');
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

		cy.get('[data-cy="delivery-status"').contains('Dispatched');
	});

	it('cancelled subscription delivery reporting - not auto credited', () => {
		const cancelledGWSubscription = JSON.parse(
			JSON.stringify(guardianWeeklyCurrentSubscription),
		);
		cancelledGWSubscription.subscription.cancelledAt = true;
		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [cancelledGWSubscription],
		}).as('mma');

		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@mma');
		cy.wait('@delivery_records');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');
		cy.findByRole('radio', { name: 'Damaged paper' }).click();
		cy.findByRole('textbox', { name: 'Please specify' }).type('Pages torn');
		cy.findByRole('button', { name: 'Continue to Step 2 & 3' }).click();

		cy.findByText(
			'Step 2. Select the date you have experienced the problem',
		).should('exist');
		cy.findByText('Step 3. Check your current delivery address').should(
			'exist',
		);
		cy.findByRole('checkbox').click();
		cy.findByRole('button', { name: 'Review your report' }).click();

		cy.findByText(
			'Once you submit your report, your case will be marked as high priority. Our customer service team will try their best to contact you as soon as possible to resolve the issue.',
		).should('exist');
	});

	it('home delivery with existing delivery problem (within 14 dayes) reporting issue - not auto credited', () => {
		cy.intercept('GET', '/api/me/mma?productType=HomeDelivery', {
			statusCode: 200,
			body: [homeDeliverySubscription],
		}).as('product_detail_home_delivery');

		const deliveryRecordsWithDeliveryProblem = JSON.parse(
			JSON.stringify(deliveryRecordsWithReportedProblem),
		);

		const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
		const fourteenDaysAgoDate = dateString(
			dateAddDays(startOfToday, -14),
			DATE_FNS_INPUT_FORMAT,
		);

		deliveryRecordsWithDeliveryProblem.results[0].deliveryDate =
			fourteenDaysAgoDate;

		deliveryRecordsWithDeliveryProblem.results = [
			...deliveryRecordsWithDeliveryProblem.results,
			...deliveryRecordsWithDelivery.results,
		];

		cy.intercept('GET', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: deliveryRecordsWithDeliveryProblem,
		}).as('delivery_records_with_existing_problem');

		cy.visit('/delivery/homedelivery/records');
		cy.wait('@product_detail_home_delivery');
		cy.wait('@delivery_records_with_existing_problem');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');

		cy.findByRole('radio', { name: 'Damaged paper' }).click();
		cy.findByRole('textbox', { name: 'Please specify' }).type('Pages torn');
		cy.findByRole('button', { name: 'Continue to Step 2 & 3' }).click();

		cy.findByText(
			'Step 2. Select the date you have experienced the problem',
		).should('exist');
		cy.findByText(
			'Step 3. Check your current delivery address and instructions',
		).should('exist');
		cy.findByRole('checkbox').click();
		cy.findByRole('button', { name: 'Review your report' }).click();

		cy.findByText(
			'Once you submit your report, your case will be marked as high priority. Our customer service team will try their best to contact you as soon as possible to resolve the issue.',
		).should('exist');
	});

	it('allows you to report a problem with a delivery with a non auto renewable subscription - not auto credited', () => {
		const gWSubscriptionNonAutoRenew = JSON.parse(
			JSON.stringify(guardianWeeklyCurrentSubscription),
		);
		gWSubscriptionNonAutoRenew.subscription.autoRenew = false;

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [gWSubscriptionNonAutoRenew],
		}).as('product_detail_non_auto_renew');

		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail_non_auto_renew');
		cy.wait('@delivery_records');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');
		cy.findByRole('radio', { name: 'Damaged paper' }).click();
		cy.findByRole('textbox', { name: 'Please specify' }).type('Pages torn');
		cy.findByRole('button', { name: 'Continue to Step 2 & 3' }).click();

		cy.findByText(
			'Step 2. Select the date you have experienced the problem',
		).should('exist');
		cy.findByText('Step 3. Check your current delivery address').should(
			'exist',
		);
		cy.findByRole('checkbox').click();
		cy.findByRole('button', { name: 'Review your report' }).click();

		cy.findByText('Delivery report review').should('exist');
		cy.findByText('Step 4. Please review your report details').should(
			'exist',
		);
		cy.findByRole('button', { name: 'Submit your report' }).click();

		cy.findByText('Delivery report confirmation').should('exist');
		cy.findByText(
			'Your delivery problem report has been successfully submitted.',
		).should('exist');
		cy.findByText('Problem reported (Damaged paper)').should('exist');
	});

	it('allows you to report a problem with a delivery', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');
		cy.findByRole('radio', { name: 'Damaged paper' }).click();
		cy.findByRole('textbox', { name: 'Please specify' }).type('Pages torn');
		cy.findByRole('button', { name: 'Continue to Step 2 & 3' }).click();

		cy.findByText(
			'Step 2. Select the date you have experienced the problem',
		).should('exist');
		cy.findByText('Step 3. Check your current delivery address').should(
			'exist',
		);
		cy.findByRole('checkbox').click();
		cy.findByRole('button', { name: 'Review your report' }).click();

		cy.wait('@fetch_potential_holidays');

		cy.findByText('Delivery report review').should('exist');
		cy.findByText('Step 4. Please review your report details').should(
			'exist',
		);
		cy.findByRole('button', { name: 'Submit your report' }).click();

		cy.findByText('Delivery report confirmation').should('exist');
		cy.findByText(
			'Your delivery problem report has been successfully submitted.',
		).should('exist');
		cy.findByText('Problem reported (Damaged paper)').should('exist');
	});

	it('displays an error message if a delivery problem is not selected', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');
		cy.findByRole('button', { name: 'Continue to Step 2 & 3' }).click();

		cy.findByText('Please select the type of problem').should('exist');
	});

	it('returns you to the delivery history page if the cancel button is clicked', () => {
		cy.visit('/delivery/guardianweekly/records');
		cy.wait('@product_detail');
		cy.wait('@delivery_records');

		cy.findByRole('button', { name: 'Report a problem' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('exist');
		cy.findByRole('button', { name: 'Cancel' }).click();

		cy.findByText(
			'Step 1. What type of problem are you experiencing?',
		).should('not.exist');
		cy.findByRole('button', { name: 'Report a problem' }).should('exist');
	});
});
