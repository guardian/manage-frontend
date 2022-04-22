import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';
import {
	noDeliveryRecords,
	dispatchedDeliveryRecords,
} from '../../../client/fixtures/deliveryRecords';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Delivery records', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: dispatchedDeliveryRecords,
		}).as('delivery_records');
	});

	it('does not show delivery history when there are no delivery records', () => {
		cy.intercept('GET', '/api/delivery-records/A-S00293857', {
			statusCode: 200,
			body: noDeliveryRecords,
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

		cy.findByText('Dispatched').should('exist');
	});
});
