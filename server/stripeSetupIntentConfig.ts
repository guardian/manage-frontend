import { s3ConfigPromise } from './awsIntegration';

type StripePublicToSecretKeyMapping = Record<string, string>;
export interface StripePublicKeySet {
	test: string;
	default: string;
}
export interface StripePublicKeys {
	stripeKeyAustralia: StripePublicKeySet;
	stripeKeyDefaultCurrencies: StripePublicKeySet;
}

// The first key from this object is the Australian/AUD one, the second key is for rest of the world
export const stripeSetupIntentConfigPromise: Promise<
	StripePublicToSecretKeyMapping | undefined
> = s3ConfigPromise<StripePublicToSecretKeyMapping>()(
	'stripe-public-to-private-key-mapping',
);

export const stripePublicKeysPromise: Promise<StripePublicKeys | undefined> =
	s3ConfigPromise<StripePublicKeys>()('stripe-public-keys');
