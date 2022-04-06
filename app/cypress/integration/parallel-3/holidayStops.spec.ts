import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl';
import { guardianWeeklyCurrentSubscription } from '../../../client/fixtures/productDetail';

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on('uncaught:exception', () => {
	return false;
});

const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = 'Yes, I’m happy';

describe('E2E Page rendering', function () {
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
	});

	it('Completes adding holiday stop', function () {
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('mma');

		cy.intercept('GET', '/api/me/mma?productType=Weekly', {
			statusCode: 200,
			body: [guardianWeeklyCurrentSubscription],
		}).as('product_detail');

		cy.intercept('GET', '/api/holidays/A-S00293857/potential?*', {
			statusCode: 200,
			body: {
				nextInvoiceDateAfterToday: '2022-02-24',
				potentials: [
					{
						publicationDate: '2022-03-25',
						credit: -8.13,
						invoiceDate: '2022-04-24',
					},
				],
			},
		}).as('fetch_potential_holidays');

		cy.intercept('GET', '/api/holidays/A-S00293857', {
			statusCode: 200,
			body: {
				existing: [
					{
						id: 'a2k9E000005NnbrQAC',
						startDate: '2022-03-11',
						endDate: '2022-03-12',
						subscriptionName: 'A-S00293857',
						publicationsImpacted: [
							{
								publicationDate: '2022-03-11',
								estimatedPrice: -8.13,
								invoiceDate: '2022-03-24',
								isActioned: false,
							},
						],
						mutabilityFlags: {
							isFullyMutable: true,
							isEndDateEditable: true,
						},
					},
				],
				issueSpecifics: [
					{
						firstAvailableDate: '2022-02-05',
						issueDayOfWeek: 5,
					},
				],
				annualIssueLimit: 6,
				firstAvailableDate: '2022-02-05',
			},
		}).as('fetch_existing_holidays');

		cy.intercept('POST', '/api/holidays', {
			statusCode: 200,
			body: {
				message: 'success',
			},
		}).as('create_holiday_stop');

		cy.visit('/suspend/guardianweekly');
		cy.wait('@fetch_existing_holidays');
		cy.wait('@product_detail');
		cy.get('[data-cy="create_suspension_cta"] button').click();

		cy.findByText('Choose the dates you will be away');
		cy.get('[data-cy="date_picker"] div').eq(8).click();
		cy.get('[data-cy="date_picker"] div').eq(10).click();
		cy.wait('@fetch_potential_holidays');
		cy.findByText('Review details').click();

		cy.findByText('Confirm').click();

		cy.wait('@create_holiday_stop');
		cy.findByText('Your schedule has been set');
	});
});
