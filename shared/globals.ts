import type { StripePublicKeySet } from '../server/stripeSetupIntentConfig';
import type { AbTest, OphanComponentEvent } from './ophanTypes';

interface CommonGlobals {
	domain: string;
	dsn: string | null;
}

export interface IdentityDetails {
	userId?: string;
	email?: string;
	displayName?: string;
	signInStatus?: 'signedInRecently' | 'signedInNotRecently' | 'notSignedIn';
}

export interface Globals extends CommonGlobals {
	spaTransition?: true;
	INTCMP?: string;
	ophan?: {
		viewId: string;
		record: (payload: { componentEvent: OphanComponentEvent }) => void;
		sendInitialEvent: (url?: string, referer?: string) => void;
	};
	abTest?: AbTest;
	identityDetails: IdentityDetails;
	recaptchaPublicKey?: string;
	stripeKeyAustralia?: StripePublicKeySet;
	stripeKeyDefaultCurrencies?: StripePublicKeySet;
}
declare global {
	interface Window {
		guardian: Globals;
		embedded_svc: any;
	}
}

export const LOGGING_CODE_SUFFIX_HEADER = 'x-logging-code-suffix';
