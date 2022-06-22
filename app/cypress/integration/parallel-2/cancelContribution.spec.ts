import { contribution } from '../../../client/fixtures/productDetail';
import { signInAndAcceptCookies } from '../../lib/signInAndAcceptCookies';

describe('Cancel contribution', () => {
	beforeEach(() => {
		signInAndAcceptCookies();

		cy.setCookie('GU_mvt_id', '0');

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
			body: [contribution],
		});

		cy.intercept('GET', '/api/me/mma', {
			statusCode: 200,
			body: [contribution],
		});

		cy.intercept('GET', '/api/me/mma/**', {
			statusCode: 200,
			body: { subscription: {} },
		}).as('new_product_detail');

		cy.intercept('GET', '/api/cancelled/', {
			statusCode: 200,
			body: [],
		}).as('cancelled');

		cy.intercept('GET', 'api/cancellation-date/**', {
			statusCode: 200,
			body: { cancellationEffectiveDate: '2022-02-05' },
		});

		cy.intercept('POST', 'api/cancel/**', {
			statusCode: 200,
		}).as('cancel_contribution');
	});

	it('cancels contribution (reason: As a result of a specific article I read)', () => {
		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(0).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled.',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
	});

	it('does not cancel contribution, case api call returns 500', () => {
		cy.intercept('POST', '/api/case', {
			statusCode: 500,
		}).as('get_case');

		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(0).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case').its('response.statusCode').should('equal', 500);

		cy.findByText('Oops!').should('exist');
	});

	it('cancels contribution with custom save body component (reason: I can no longer afford it)', () => {
		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(4).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).should('exist');

		cy.findByRole('button', { name: 'I still want to cancel' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled.',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
	});

	it('cancels contribution with custom save body component (reason: A payment issue)', () => {
		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(6).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.contains('a', 'Manage payment method').should('exist');
		cy.findByText(
			'Please share any further thoughts you have about cancelling – you can help us improve. Thank you.',
		).should('exist');
		cy.findByRole('button', { name: 'Submit the form' }).should('exist');
		cy.findByRole('button', { name: 'Reduce amount' }).should('exist');

		cy.findByRole('button', { name: 'I still want to cancel' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled.',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
	});

	it('cancels contribution with save body string (reason: I would rather make a single contribution)', () => {
		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(8).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByText(
			'After cancelling your monthly or annual contribution, we will show you how to make a single contribution quickly and easily.',
		).should('exist');
		cy.findByRole('button', { name: 'Confirm cancellation' }).click();

		cy.wait('@create_case_in_salesforce');
		cy.wait('@cancel_contribution');
		cy.wait('@new_product_detail');

		cy.findByRole('heading', {
			name: 'Your recurring contribution is cancelled.',
		});

		cy.get('@create_case_in_salesforce.all').should('have.length', 1);
		cy.get('@cancel_contribution.all').should('have.length', 1);
	});

	it('save journey completed contribution not cancelled, amount reduced', () => {
		cy.intercept('POST', 'api/update/amount/contributions/**', {
			statusCode: 200,
			body: { status: 'success' },
		});

		cy.visit('/');

		cy.window().then((window) => {
			// @ts-ignore
			window.guardian.identityDetails = {
				signInStatus: 'signedInRecently',
				userId: '200006712',
				displayName: 'user',
				email: 'example@example.com',
			};
		});

		cy.findByText('Manage recurring contribution').click();
		cy.wait('@cancelled');

		cy.findByRole('link', {
			name: 'Cancel recurring contribution',
		}).click();
		cy.findAllByRole('radio').eq(4).click();
		cy.findByRole('button', { name: 'Continue' }).click();

		cy.wait('@get_case');

		cy.findByRole('button', { name: 'Reduce amount' }).click();

		cy.get('input[type="number"]').type('80');
		cy.findByRole('button', { name: 'Change amount' }).click();

		cy.findByText(
			'We have successfully updated the amount of your contribution. New amount, £80.00, will be taken on 5 Feb 2022. Thank you for supporting the Guardian.',
		).should('exist');
	});
});
