import type { NextFunction, Request, Response } from 'express';
import {
	clearIdentityLocalState,
	getIdentityLocalState,
	setIdentityLocalState,
} from '@/server/identityLocalState';
import { OAuthAccessTokenCookieName } from '@/server/oauthConfig';
import { validateWithOkta } from '@/server/okta';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';
import { requiresSignin } from '@/shared/requiresSignin';
import { log } from '../log';

declare const CYPRESS: string;

export interface OktaValidationResponse {
	ok: boolean;
	valid: boolean;
	userId?: string;
	displayName?: string;
	email?: string;
}

export const withOktaServerSideValidation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (CYPRESS === 'SKIP_IDAPI') {
		return next();
	}
	const oktaConfig = await getOktaConfig();
	if (!oktaConfig.useOkta) {
		/**
		 * OKTA NOT ENABLED
		 *
		 * If Okta is disabled, we will still run this middleware, but
		 * it won't be able to do anything so we just pass through.
		 */
		return next();
	}

	const signinRequired = requiresSignin(req.originalUrl);

	const locallyValidatedIdentityData = getIdentityLocalState(res);
	const accessToken = req.signedCookies[OAuthAccessTokenCookieName];
	if (!accessToken || !locallyValidatedIdentityData?.userId) {
		if (signinRequired) {
			/**
			 * NO TOKEN OR USER - SIGN IN REQUIRED
			 *
			 * This is unexpected and should be impossible because the withIdentity
			 * middleware should have run first and not allowed the request to get
			 * here. Return a 500.
			 */
			log.error(
				`OAuth / Serverside Validation Middleware / Error: no access token or user in request for a sign-in required endpoint! This should have failed local validation.`,
			);
			return res.sendStatus(500);
		} else {
			/**
			 * NO TOKEN OR USER - SIGN IN NOT REQUIRED
			 *
			 * This is expected - continue.
			 */
			return next();
		}
	}

	const oktaValidationResponse = await validateWithOkta({
		oktaConfig,
		accessToken,
	});

	if (!oktaValidationResponse.ok) {
		/**
		 * UNEXPECTED ERROR
		 */
		return res.sendStatus(500);
	}

	if (!oktaValidationResponse.valid) {
		/**
		 * INVALID TOKEN
		 *
		 * Clear the local state. If the endpoint requires sign-in,
		 * return a 401 which can be handled down the line. Otherwise
		 * continue (the user will see the page as if they are not
		 * signed in).
		 */
		clearIdentityLocalState(res);
		if (signinRequired) {
			return res.sendStatus(401);
		}
		return next();
	}

	/**
	 * VALID TOKEN
	 *
	 * Update the local state with the latest user info from Okta.
	 */
	setIdentityLocalState(res, {
		// This is always 'signedInRecently' because we've just checked
		// the token is valid with Okta, and it's only valid for 30 minutes.
		signInStatus: 'signedInRecently',
		userId: oktaValidationResponse.userId,
		displayName: oktaValidationResponse.displayName,
		email: oktaValidationResponse.email,
	});

	return next();
};
