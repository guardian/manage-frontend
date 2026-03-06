/**
 * Braze publishable API keys (not secrets -- designed to be client-side).
 * Same keys used by frontend/DCR, sourced from the Scala frontend config.
 */
const BRAZE_API_KEY_PROD = '7f28c639-8bda-48ff-a3f6-24345abfc07c';
const BRAZE_API_KEY_CODE = '9d722c47-c889-49e7-b5d6-17e0a5956185';

export const MANAGE_PLACEMENT_ID = 'manage-frontend_account-overview';

export const getBrazeApiKey = (): string | null => {
	const domain = window.guardian?.domain;
	switch (domain) {
		case 'theguardian.com':
			return BRAZE_API_KEY_PROD;
		default:
			return BRAZE_API_KEY_CODE;
	}
};

const DEVELOPMENT_DOMAINS = [
	'localhost',
	'manage.thegulocal.com',
	'manage.code.dev-theguardian.com',
];

export const isDevelopmentDomain = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}
	return DEVELOPMENT_DOMAINS.includes(window.location.hostname);
};

const LOG_PREFIX = '[BrazeBannersSystem]';

export const brazeBannersSystemLogger = {
	log: (...args: unknown[]): void => {
		if (isDevelopmentDomain()) {
			console.log(LOG_PREFIX, ...args);
		}
	},
	info: (...args: unknown[]): void => {
		if (isDevelopmentDomain()) {
			console.info(LOG_PREFIX, ...args);
		}
	},
	warn: (...args: unknown[]): void => {
		if (isDevelopmentDomain()) {
			console.warn(LOG_PREFIX, ...args);
		}
	},
	error: (...args: unknown[]): void => {
		console.error(LOG_PREFIX, ...args);
	},
};
