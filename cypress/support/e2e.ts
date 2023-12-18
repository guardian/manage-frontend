// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-plugin-stripe-elements';
import { createTestUser } from './commands';
import type { Globals } from '../../shared/globals';
// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
	namespace Cypress {
		interface Window {
			guardian: Globals;
			embedded_svc: any;
		}

		interface Chainable {
			createTestUser: typeof createTestUser;
			resolve(name: string): Chainable<Element>;
			getIframeBody(selector: string): Chainable<Element>;
			findByText(text: string): Chainable<Element>;
			solveGoogleReCAPTCHA(): Chainable<Element>;
		}
	}
}

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on('uncaught:exception', () => {
	return false;
});
