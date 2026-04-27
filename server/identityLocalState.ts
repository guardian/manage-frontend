import * as Sentry from '@sentry/node';
import type { Response } from 'express';
import type { IdentityDetails } from '@/shared/globals';

const bindSentryUser = (identityLocalState: IdentityDetails | undefined) => {
	if (
		!identityLocalState ||
		(identityLocalState.signInStatus !== 'signedInRecently' &&
			identityLocalState.signInStatus !== 'signedInNotRecently')
	) {
		Sentry.setUser(null);
		return;
	}

	if (!identityLocalState.userId && !identityLocalState.email) {
		Sentry.setUser(null);
		return;
	}

	Sentry.setUser({
		id: identityLocalState.userId,
		email: identityLocalState.email,
	});
};

export const setIdentityLocalState = (
	res: Response,
	identityLocalState: IdentityDetails,
) => {
	res.locals.identity = identityLocalState;
	bindSentryUser(identityLocalState);
};
export const getIdentityLocalState = (
	res: Response,
): IdentityDetails | undefined => {
	return res.locals?.identity;
};
export const clearIdentityLocalState = (res: Response) => {
	delete res.locals.identity;
	bindSentryUser(undefined);
};
