// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';
import { v4 as uuidv4 } from 'uuid';

Cypress.Commands.add('getIframeBody', (selector = '') => {
	// get the iframe > document > body
	// and retry until the body element is not empty
	return (
		cy
			.get(`iframe${selector}`)
			.its('0.contentDocument.body')
			.should('not.be.empty')
			// wraps "body" DOM element to allow
			// chaining more Cypress commands, like ".find(...)"
			// https://on.cypress.io/wrap
			.then(cy.wrap)
	);
});

Cypress.Commands.add('iframeLoaded', { prevSubject: 'element' }, ($iframe) => {
	const contentWindow = $iframe.prop('contentWindow');
	return new Promise((resolve) => {
		if (contentWindow && contentWindow.document.readyState === 'complete') {
			resolve(contentWindow);
		} else {
			$iframe.on('load', () => {
				resolve(contentWindow);
			});
		}
	});
});

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
	cy.get('#recaptcha *> iframe').then(($iframe) => {
		const $body = $iframe.contents().find('body');
		cy.wrap($body)
			.find('.recaptcha-checkbox-border')
			.should('be.visible')
			.click();
	});
});

Cypress.Commands.add('resolve', (name, options = {}) => {
	const getValue = () => {
		// @ts-ignore
		const win = cy.state('window');
		return win[name];
	};
	const resolveValue = () => {
		return Cypress.Promise.try(getValue).then((value) => {
			// @ts-ignore
			return cy.verifyUpcomingAssertions(value, options, {
				onRetry: resolveValue,
			});
		});
	};

	return resolveValue();
});

type Networks = 'facebook' | 'apple' | 'google';

type SocialLink = {
	socialId: number;
	network: Networks;
};

type IDAPITestUserOptions = {
	primaryEmailAddress?: `${string}@${string}.mailosaur.net`;
	isUserEmailValidated?: boolean;
	socialLinks?: SocialLink[];
	password?: string;
	deleteAfterMinute?: boolean;
	isGuestUser?: boolean;
};
type IDAPITestUserResponse = [
	{
		key: 'GU_U';
		value: string;
	},
	{
		key: 'SC_GU_LA';
		sessionCookie: boolean;
		value: string;
	},
	{
		key: 'SC_GU_U';
		value: string;
	},
];
export const randomMailosaurEmail = () => {
	return (
		uuidv4() + '@' + Cypress.env('MAILOSAUR_SERVER_ID') + '.mailosaur.net'
	);
};

export const randomPassword = () => uuidv4();

export const createTestUser = ({
	primaryEmailAddress,
	password,
	socialLinks = [],
	isUserEmailValidated = false,
	deleteAfterMinute = true,
	isGuestUser = false,
}: IDAPITestUserOptions) => {
	// Generate a random email address if none is provided.
	const finalEmail = primaryEmailAddress || randomMailosaurEmail();
	// Generate a random password if none is provided.
	const finalPassword = password || uuidv4();
	try {
		return cy
			.request({
				url: 'https://idapi.code.dev-theguardian.com/user/test',
				method: 'POST',
				headers: {
					'X-GU-ID-Client-Access-Token': `Bearer ${Cypress.env(
						'IDAPI_CLIENT_ACCESS_TOKEN',
					)}`,
				},
				body: {
					primaryEmailAddress: finalEmail,
					isUserEmailValidated,
					socialLinks,
					password: finalPassword,
					deleteAfterMinute,
					isGuestUser,
				} as IDAPITestUserOptions,
			})
			.then((res) => {
				return cy.wrap({
					emailAddress: finalEmail,
					cookies: res.body.values as IDAPITestUserResponse,
					finalPassword,
				});
			});
	} catch (error) {
		throw new Error('Failed to create IDAPI test user: ' + error);
	}
};

Cypress.Commands.add('createTestUser', createTestUser);
