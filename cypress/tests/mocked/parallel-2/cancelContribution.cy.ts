import { toMembersDataApiResponse } from '../../../../client/fixtures/mdapiResponse';
import {
	annualContributionPaidByCardWithCurrency,
	monthlyContributionPaidByCard,
} from '../../../../client/fixtures/productBuilder/testProducts';
import type { DiscountPreviewResponse } from '../../../../client/utilities/discountPreview';
import { featureSwitches } from '../../../../shared/featureSwitches';
import { signInAndAcceptCookies } from '../../../lib/signInAndAcceptCookies';

describe('Cancel contribution', () => {
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

	const setupCancellation = () => {
		cy.visit('/');

		setSignInStatus();

		cy.findByText('Manage support').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel support',
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

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: toMembersDataApiResponse(monthlyContributionPaidByCard()),
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: toMembersDataApiResponse(monthlyContributionPaidByCard()),
		});

		cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
			statusCode: 200,
			body: { subscriptions: [] },
		});

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

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_contribution');
	});

	if (featureSwitches.contributionCancellationPause) {
		const discountPreviewResponse: DiscountPreviewResponse = {
			discountedPrice: 0,
			discountPercentage: 100,
			upToPeriods: 2,
			upToPeriodsType: 'month',
			firstDiscountedPaymentDate: '2024-05-30',
			nextNonDiscountedPaymentDate: '2024-07-30',
			nonDiscountedPayments: [{ date: '2024-07-30', amount: 7 }],
		};
		it('user accepts pause instead of cancelling', () => {
			setupCancellation();
			cy.intercept('POST', 'api/discounts/preview-discount', {
				statusCode: 200,
				body: discountPreviewResponse,
			}).as('preview_discount');

			cy.intercept('POST', 'api/discounts/apply-discount', {
				statusCode: 200,
			}).as('apply_discount');

			cy.findByRole('radio', {
				name: 'I am unhappy with some editorial decisions',
			}).click();
			cy.findByRole('button', { name: 'Continue' }).click();

			cy.wait('@get_case');
			cy.wait('@preview_discount');

			cy.findByRole('button', {
				name: 'Continue to cancellation',
			}).click();

			cy.findByRole('button', { name: 'Yes, pause my support' }).click();

			cy.findByRole('button', {
				name: 'Confirm pausing your support',
			}).click();

			cy.findByText('Thank you for choosing to stay with us');
			cy.wait('@apply_discount');
		});

		it("User see's pause offer but decides to cancel anyway", () => {
			setupCancellation();
			cy.intercept('POST', 'api/discounts/preview-discount', {
				statusCode: 200,
				body: discountPreviewResponse,
			}).as('preview_discount');

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

			cy.findByRole('button', { name: 'Confirm cancellation' }).click();

			cy.wait('@create_case_in_salesforce');
			cy.wait('@cancel_contribution');
			cy.wait('@new_product_detail');

			cy.findByRole('heading', {
				name: 'Your monthly support has been cancelled',
			});

			cy.get('@create_case_in_salesforce.all').should('have.length', 1);
			cy.get('@cancel_contribution.all').should('have.length', 1);
			cy.get('@get_cancellation_date.all').should('have.length', 0);
		});
	}

	it('cancels contribution (reason: I am unhappy with some editorial decisions)', () => {
		setupCancellation();
		cy.findByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Continue to cancellation' }).click();
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your monthly support has been cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('does not cancel contribution, case api call returns 500', () => {
		cy.intercept('POST', '/api/case', {
			statusCode: 500,
		}).as('get_case');

		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case').its('response.statusCode').should('equal', 500);

		cy.findByText('Oops!').should('exist');

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('cancels contribution with custom save body component (reason: I can no longer afford to support you)', () => {
		setupCancellation();
		cy.findByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).should('exist');

		cy.findByRole('button', { name: 'I still want to cancel' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your monthly support has been cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('cancels contribution with save body string (reason: I’m not fully satisfied with the product features or benefits)', () => {
		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I’m not fully satisfied with the product features or benefits',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByText(
			'Thank you for your ongoing support. Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
		).should('exist');
		cy.findByRole('button', { name: 'Continue to cancellation' }).click();
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your monthly support has been cancelled',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('save journey completed contribution not cancelled, amount reduced', () => {
		cy.intercept('POST', 'api/update/amount/contributions/**', {
			statusCode: 200,
			body: { status: 'success' },
		});

		setupCancellation();
		cy.findAllByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).click();

		cy.get('input[type="number"]').type('80');
		cy.findByRole('button', { name: 'Change amount' }).click();

		cy.findByText(
			'We have successfully updated the amount of your contribution. New amount, £80.00, will be taken on 5 Feb 2022. Thank you for supporting the Guardian.',
		).should('exist');

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('allows cancellation when visiting cancellation page directly', () => {
		cy.visit('/cancel/contributions');

		setSignInStatus();

		cy.findAllByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Continue to cancellation' }).click();
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your monthly support has been cancelled',
		});

		cy.get('@get_cancellation_date.all').should('have.length', 0);
	});

	it('user (annual) switches to supporter-plus at a discount instead of cancelling (choosing financial reasons)', () => {
		const productSwitchPreviewWithSwitchDiscount = {
			supporterPlusPurchaseAmount: 120,
			nextPaymentDate: '2026-03-20',
			amountPayableToday: 0,
			contributionRefundAmount: -60,
			discount: {
				discountedPrice: 60,
				discountPercentage: 50,
				upToPeriods: 1,
				upToPeriodsType: 'Years',
			},
		};
		const switchContribution = toMembersDataApiResponse(
			annualContributionPaidByCardWithCurrency(
				'GBP',
				'United Kingdom',
				1200,
			),
		);

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: switchContribution,
		});
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: switchContribution,
		});

		setupCancellation();

		cy.intercept(
			'POST',
			'/api/product-move/recurring-contribution-to-supporter-plus/**',
			(req) => {
				if (req.body.preview === true) {
					req.reply({
						statusCode: 200,
						body: productSwitchPreviewWithSwitchDiscount,
					});
				} else {
					req.reply({
						statusCode: 200,
					});
				}
			},
		).as('switch_discount');

		cy.findByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');
		cy.wait('@switch_discount');

		cy.findByRole('button', {
			name: 'I still want to cancel',
		}).click();

		cy.findByRole('button', { name: 'Redeem the offer' }).click();

		cy.findByRole('button', {
			name: 'Confirm your offer',
		}).click();

		cy.findByText('Thank you for choosing to stay with us');
		cy.wait('@switch_discount');
	});

	it('user (annual) switches to supporter-plus at a discount instead of cancelling', () => {
		const productSwitchPreviewWithSwitchDiscount = {
			supporterPlusPurchaseAmount: 120,
			nextPaymentDate: '2026-03-20',
			amountPayableToday: 0,
			contributionRefundAmount: -60,
			discount: {
				discountedPrice: 60,
				discountPercentage: 50,
				upToPeriods: 1,
				upToPeriodsType: 'Years',
			},
		};
		const switchContribution = toMembersDataApiResponse(
			annualContributionPaidByCardWithCurrency(
				'GBP',
				'United Kingdom',
				1200,
			),
		);

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: switchContribution,
		});
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: switchContribution,
		});

		setupCancellation();

		cy.intercept(
			'POST',
			'/api/product-move/recurring-contribution-to-supporter-plus/**',
			(req) => {
				if (req.body.preview === true) {
					req.reply({
						statusCode: 200,
						body: productSwitchPreviewWithSwitchDiscount,
					});
				} else {
					req.reply({
						statusCode: 200,
					});
				}
			},
		).as('switch_discount');

		cy.findByRole('radio', {
			name: 'I’m taking a break from news',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');
		cy.wait('@switch_discount');

		cy.findByRole('button', {
			name: 'Continue to cancellation',
		}).click();

		cy.findByRole('button', { name: 'Redeem the offer' }).click();

		cy.findByRole('button', {
			name: 'Confirm your offer',
		}).click();

		cy.findByText('Thank you for choosing to stay with us');
		cy.wait('@switch_discount');
	});

	it('user (annual) cannot take switch discount (ineligable reason selected)', () => {
		const switchContribution = toMembersDataApiResponse(
			annualContributionPaidByCardWithCurrency(
				'GBP',
				'United Kingdom',
				1200,
			),
		);

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: switchContribution,
		});
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: switchContribution,
		});

		setupCancellation();

		cy.findByRole('radio', {
			name: 'I am unhappy with some editorial decisions',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.findByRole('button', {
			name: 'Continue to cancellation',
		}).click();

		cy.findByText(
			"If you confirm your cancellation, you will no longer be supporting the Guardian's reader-funded journalism.",
		).should('exist');
	});

	it('user (annual) cannot take switch discount (billing country is not United Kingdom)', () => {
		const switchContribution = toMembersDataApiResponse(
			annualContributionPaidByCardWithCurrency('GBP', 'Germany', 1200),
		);

		cy.intercept(
			'POST',
			'/api/product-move/recurring-contribution-to-supporter-plus/**',
		).as('switch_discount');

		cy.intercept('GET', '/api/me/mma?productType=Contribution', {
			statusCode: 200,
			body: switchContribution,
		});
		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: switchContribution,
		});

		setupCancellation();

		cy.findByRole('radio', {
			name: 'I can no longer afford to support you',
		}).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.findByRole('button', {
			name: 'I still want to cancel',
		}).click();

		cy.findByText('Your yearly support has been cancelled').should('exist');

		cy.get('@switch_discount.all').then((interceptions) => {
			expect(interceptions).to.have.length(0);
		});
	});
});
