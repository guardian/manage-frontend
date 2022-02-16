import { requiresSignin } from '../../shared/requiresSignin';

export type SignInStatus = 'init' | 'signedIn' | 'signedOut';

export const isSignedIn = () =>
	typeof window !== 'undefined' &&
	window.guardian?.identityDetails?.signInStatus === 'signedInRecently';

export const pageRequiresSignIn = () =>
	requiresSignin(
		typeof window !== 'undefined' ? window.location.pathname : '',
	);
