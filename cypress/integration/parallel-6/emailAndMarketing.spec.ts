import { user as userResponse } from '../../../client/fixtures/user';
import { toMembersDataApiResponse } from '../../../client/fixtures/mdapiResponse';
import { singleContributionsAPIResponse } from '../../../client/fixtures/singleContribution';
import { newsletters } from '../../../client/fixtures/newsletters';
import { consents } from '../../../client/fixtures/consents';
import { newsletterSubscriptions } from '../../../client/fixtures/newsletterSubscriptions';
import { InAppPurchase } from '../../../client/fixtures/inAppPurchase';
import { featureSwitches } from '../../../shared/featureSwitches';

describe('feature switch dummy', () => {
	it('passes', () => {
		assert(true);
	});
});

if (featureSwitches.singleContributions) {
	describe('Email and Marketing page', () => {
		beforeEach(() => {
			cy.session('auth', () => {
				cy.setCookie('gu-cmp-disabled', 'true');
			});

			cy.intercept('GET', '/idapi/user', {
				body: userResponse,
			}).as('user');

			cy.intercept('GET', '/api/me/mma', {
				statusCode: 200,
				body: toMembersDataApiResponse(),
			}).as('product_detail');

			cy.intercept('GET', '/idapicodeproxy/newsletters', {
				statusCode: 200,
				body: newsletters,
			}).as('newsletters');

			cy.intercept('GET', '/idapicodeproxy/users/me/newsletters', {
				statusCode: 200,
				body: newsletterSubscriptions,
			}).as('newsletter_subscriptions');

			cy.intercept('GET', '/idapicodeproxy/consents?filter=all', {
				statusCode: 200,
				body: consents,
			}).as('consents');

			cy.intercept('GET', '/api/reminders/status', {
				statusCode: 200,
				body: { recurringStatus: 'NotSet' },
			}).as('reminders');
		});

		it("displays correct SOI's for single contributors", () => {
			cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
				statusCode: 200,
				body: { subscriptions: [] },
			}).as('mobile_subscriptions');

			cy.intercept('GET', '/api/me/one-off-contributions', {
				statusCode: 200,
				body: singleContributionsAPIResponse,
			}).as('single_contributions');

			cy.visit('/email-prefs');

			cy.wait('@user');
			cy.wait('@product_detail');
			cy.wait('@mobile_subscriptions');
			cy.wait('@single_contributions');
			cy.wait('@newsletters');
			cy.wait('@newsletter_subscriptions');
			cy.wait('@consents');
			cy.wait('@reminders');

			cy.findByText('Similar Guardian products');
			cy.findByText('Your subscription/support');
			cy.findByText('Supporter newsletter');
		});

		it("displays correct SOI's for IAP owners", () => {
			cy.intercept('GET', '/mpapi/user/mobile-subscriptions', {
				statusCode: 200,
				body: { subscriptions: [InAppPurchase] },
			}).as('mobile_subscriptions');

			cy.intercept('GET', '/api/me/one-off-contributions', {
				statusCode: 200,
				body: [],
			}).as('single_contributions');

			cy.visit('/email-prefs');

			cy.wait('@user');
			cy.wait('@product_detail');
			cy.wait('@mobile_subscriptions');
			cy.wait('@single_contributions');
			cy.wait('@newsletters');
			cy.wait('@newsletter_subscriptions');
			cy.wait('@consents');
			cy.wait('@reminders');

			cy.findByText('Similar Guardian products');
			cy.findByText('Your subscription/support');
			cy.findByText('Supporter newsletter');
		});
	});
}
