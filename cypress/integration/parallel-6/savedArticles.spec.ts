describe('Saved Articles', () => {
	beforeEach(() => {
		cy.session('auth', () => {
			cy.setCookie('gu-cmp-disabled', 'true');
		});
	});

	// TODO - add an explicit mechanism for overriding the switch to false, for when we turn this on by default?
	describe('Feature Switch OFF', () => {
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
	describe('Feature Switch ON:', () => {
		it('displays Saved Article page', () => {
			cy.visit('/saved-articles?withFeature=savedArticles');
			// We should see this text in the nav on the LH side
			// and as a title on the page
			cy.findAllByText('Saved articles').should('have.length', 2);
		});
	});
});
