import { featureSwitches } from '../../../shared/featureSwitches';

if (!featureSwitches.savedArticles) {
	describe('Feature Switch OFF: Saved Articles', () => {
		beforeEach(() => {
			cy.session('auth', () => {
				cy.setCookie('gu-cmp-disabled', 'true');
			});
		});

		it('redirects to account overview homepage from /saved-articles route ', () => {
			cy.visit('/saved-articles');

			cy.url().should('not.contain', '/saved-articles');

			// check Navigation/Page Title
			cy.findAllByText('Account overview').should(
				'have.length.at.least',
				1,
			);
			cy.findAllByText('Saved articles').should('have.length', 0);
		});
	});
}

if (featureSwitches.savedArticles) {
	describe('Feature Switch ON: Saved Article', () => {
		beforeEach(() => {
			cy.session('auth', () => {
				cy.setCookie('gu-cmp-disabled', 'true');
			});
		});

		it('displays Saved Article page', () => {
			cy.visit('/saved-articles');

			cy.findAllByText('Saved articles').should('have.length', 2);
		});
	});
}
