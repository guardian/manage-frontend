import type { EventPayload } from '@guardian/ophan-tracker-js';
import type { StripePublicKeySet } from '../server/stripeSetupIntentConfig';
import type { AbTest } from './ophanTypes';

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
	abTest?: AbTest;
	identityDetails: IdentityDetails;
	recaptchaPublicKey?: string;
	stripeKeyAustralia?: StripePublicKeySet;
	stripeKeyDefaultCurrencies?: StripePublicKeySet;
	stripeKeyTortoiseMedia?: StripePublicKeySet;
	ophan?: {
		sendInitialEvent: (url?: string, referrer?: string) => void;
		record: (event: EventPayload) => void;
		viewId: string;
	};
}
interface QuantumMetricAPIPartial {
	sendEvent: (
		eventId: number | string,
		conversion?: number | boolean,
		eventValue?: number | string,
		attributes?: Record<string, string | boolean | number | undefined>,
	) => void;
}
declare global {
	interface Window {
		guardian: Globals;
		QuantumMetricAPI: QuantumMetricAPIPartial;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the embedded_svc attribute?
		embedded_svc: any;
	}
}

export const LOGGING_CODE_SUFFIX_HEADER = 'x-logging-code-suffix';
