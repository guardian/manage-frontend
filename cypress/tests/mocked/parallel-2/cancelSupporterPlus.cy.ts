import {
	supporterPlus,
	supporterPlusCancelled,
} from '../../../../client/fixtures/productBuilder/testProducts';
import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';
import { featureSwitches } from '../../../../shared/featureSwitches';
import { DiscountPreviewResponse } from '../../../../client/utilities/discountPreview';

describe('Cancel Supporter Plus', () => {
	const setupCancellation = () => {
		cy.visit('/');

		cy.wait('@mma');
		cy.wait('@cancelled');
		cy.wait('@mobile_subscriptions');
		cy.wait('@single_contributions');

		cy.findByText('Manage subscription').click();

		cy.findByRole('link', {
			name: 'Cancel subscription',
		}).click();
	};

	beforeEach(() => {
		cy.setCookie('GU_mvt_id', '0');

		signInAndAcceptCookies();

		cy.intercept('POST', '/api/case', {
			statusCode: 200,
			body: {
				id: 'caseId',
			},
		}).as('get_case');

		cy.intercept('PATCH', '/api/case/**', {
			statusCode: 200,
			body: { message: 'success' },
		}).as('create_case_in_salesforce');

		cy.intercept('GET', '/api/me/mma?productType=SupporterPlus', {
			statusCode: 200,
			body: toMembersDataApiResponse(supporterPlus()),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(supporterPlus()),
		}).as('mma');

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		}).as('mobile_subscriptions');

		cy.intercept('GET', '/api/me/one-off-contributions', {
			statusCode: 200,
			body: [],
		}).as('single_contributions');

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(),
		}).as('new_product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		}).as('get_cancellation_date');

		cy.intercept('POST', '/api/supporter-plus-cancel/**', {
			statusCode: 200,
		}).as('cancel_supporter_plus');
	});

	it('shows error message when cancellation fails', () => {
		setupCancellation();

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(supporterPlus()),
		}).as('get_failed_cancellation');

		cy.findByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Continue to cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_supporter_plus');
		cy.wait('@get_failed_cancellation');

		cy.findByRole('heading', {
			name: 'Oops!',
		});
	});

	it('allows self-service cancellation of Supporter Plus', () => {
		setupCancellation();

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: toMembersDataApiResponse(),
		}).as('get_cancelled_product');

		cy.findByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Continue to cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_supporter_plus');
		cy.wait('@get_cancelled_product');

		cy.findByRole('heading', {
			name: 'Your all-access digital subscription is cancelled',
		});

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	if (featureSwitches.supporterplusCancellationOffer) {
		const discountPreviewResponse: DiscountPreviewResponse = {
			discountedPrice: 0,
			upToPeriods: 2,
			upToPeriodsType: 'Months',
		};
		it('allows user to accept offer instead of cancelling', () => {
			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(supporterPlus()),
			}).as('mma');

			cy.intercept('GET', '/api/me/mma?productType=SupporterPlus', {
				statusCode: 200,
				body: toMembersDataApiResponse(supporterPlus()),
			});

			cy.intercept('POST', 'api/discounts/preview-discount', {
				statusCode: 200,
				body: discountPreviewResponse,
			}).as('preview_discount');

			cy.intercept('POST', 'api/discounts/apply-discount', {
				statusCode: 200,
			}).as('apply_discount');

			setupCancellation();

			cy.findByRole('radio', {
				name: 'I am unhappy with some editorial decisions',
			}).click();
			cy.findByRole('button', { name: 'Continue' }).click();

			cy.wait('@get_case');
			cy.wait('@preview_discount');

			cy.findByRole('button', {
				name: 'Continue to cancellation',
			}).click();

			cy.findByRole('button', { name: 'Redeem the offer' }).click();

			cy.findByRole('button', {
				name: 'Confirm your 2 months free offer',
			}).click();

			cy.findByText('Headline for the offer confirmation page');
			cy.wait('@apply_discount');
		});

		it("user see's offer but still decides to cancel", () => {
			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(supporterPlus()),
			}).as('mma');

			cy.intercept('GET', '/api/me/mma/**', {
				statusCode: 200,
				body: toMembersDataApiResponse(supporterPlusCancelled()),
			}).as('get_cancelled_product');

			cy.intercept('GET', '/api/me/mma?productType=SupporterPlus', {
				statusCode: 200,
				body: toMembersDataApiResponse(supporterPlus()),
			});

			cy.intercept('POST', 'api/discounts/preview-discount', {
				statusCode: 200,
				body: discountPreviewResponse,
			}).as('preview_discount');

			cy.intercept('POST', 'api/discounts/apply-discount', {
				statusCode: 200,
			}).as('apply_discount');

			setupCancellation();

			cy.findByRole('radio', {
				name: 'I am unhappy with some editorial decisions',
			}).click();
			cy.findByRole('button', { name: 'Continue' }).click();

			cy.wait('@get_case');
			cy.wait('@preview_discount');

			cy.findByRole('button', {
				name: 'Continue to cancellation',
			}).click();

			cy.findByRole('button', {
				name: 'No thanks, continue to cancel',
			}).click();

			cy.findByRole('button', {
				name: 'Confirm cancellation',
			}).click();

			cy.wait('@create_case_in_salesforce');
			cy.wait('@cancel_supporter_plus');
			cy.wait('@get_cancelled_product');

			cy.findByRole('heading', {
				name: 'Monthly support + extras cancelled',
			});

			cy.get('@get_cancellation_date.all').should('have.length', 0);
		});
	}
});
