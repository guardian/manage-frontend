import type OktaJwtVerifier from '@okta/jwt-verifier';
import type { NextFunction, Request, Response } from 'express';
import type { Scopes } from '@/server/oauth';
import {
	OAuthAccessTokenCookieName,
	OAuthIdTokenCookieName,
	performAuthorizationCodeFlow,
	scopes,
	verifyAccessToken,
	verifyIdToken,
} from '@/server/oauth';
import { requiresSignin } from '../../shared/requiresSignin';
import { conf } from '../config';

const handleOAuthMiddlewareError = (err: Error, res: Response) => {
	console.log('OAuth / Middleware error: ', err);
	res.redirect('/maintenance');
};

interface VerifiedOAuthCookies {
	accessToken?: OktaJwtVerifier.Jwt;
	idToken?: OktaJwtVerifier.Jwt;
}

// Returns either an object with the verified access and ID tokens, or an empty object.
export const verifyOAuthCookies = async (
	req: Request,
): Promise<VerifiedOAuthCookies> => {
	const accessTokenCookie = req.signedCookies['GU_ACCESS_TOKEN'];
	const idTokenCookie = req.signedCookies['GU_ID_TOKEN'];

	if (accessTokenCookie && idTokenCookie) {
		const accessToken = await verifyAccessToken(accessTokenCookie);
		const idToken = await verifyIdToken(idTokenCookie);
		if (
			// check access token is valid
			accessToken &&
			// check that the id token is valid
			idToken &&
			// check that the access token is not expired
			!accessToken.isExpired() &&
			// check that the scopes are all the ones we expect
			accessToken.claims.scp?.every((scope) =>
				scopes.includes(scope as Scopes),
			)
		) {
			return {
				accessToken,
				idToken,
			};
		} else {
			// Access or ID token invalid, return empty object
			return {};
		}
	} else {
		// No access token or ID token cookie found, return empty object
		return {};
	}
};

const setLocalStateFromIdToken = (
	res: Response,
	idToken: OktaJwtVerifier.Jwt,
) => {
	res.locals.identity = {
		// Mirror the response we got previously from the auth/redirect endpoint
		// in IDAPI. Store the user's ID, name and email on the identity object
		// of res.locals so that it can be used by the rest of the app.
		// signInStatus is always 'signedInRecently' because we only get here
		// if the access and ID tokens are valid, and they're only valid for 30 minutes.
		signInStatus: 'signedInRecently',
		userId: idToken.claims.legacy_identity_id,
		name: idToken.claims.name,
		email: idToken.claims.email,
	};
};

// Sanitize the return path to prevent open redirects.
// Allows relative paths starting with '/' and strips trailing slashes and query params.
export const sanitizeReturnPath = (returnPath: string) => {
	try {
		const url = new URL(`https://example.com${returnPath}`);
		if (url.pathname.endsWith('/')) {
			return url.pathname.slice(0, -1);
		} else {
			return url.pathname;
		}
	} catch (err) {
		return '/';
	}
};

export const withOAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (CYPRESS === 'SKIP_IDAPI') {
		return next();
	}
	// Is this a public route?
	if (!requiresSignin(req.originalUrl)) {
		// If we do have access and ID token cookies, we can attempt to verify them
		// and add the result to res.locals (which will get passed to the frontend
		// and correctly show if the user is signed in). If we don't have the cookies,
		// we can just return next() and the frontend will show the user as signed out.
		try {
			const { accessToken, idToken } = await verifyOAuthCookies(req);
			if (accessToken && idToken) {
				setLocalStateFromIdToken(res, idToken);
			}
			return next();
		} catch (err) {
			return handleOAuthMiddlewareError(err, res);
		}
	}

	// Get the path of the current page and use it as our returnPath after the OAuth callback.
	const returnPath = sanitizeReturnPath(req.originalUrl);

	// If we have a GU_SO cookie, we've signed out recently, so we need to delete
	// the access and ID tokens from the browser and redirect to the sign in page.
	if (req.cookies['GU_SO']) {
		res.clearCookie(OAuthAccessTokenCookieName, {
			signed: true,
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		res.clearCookie(OAuthIdTokenCookieName, {
			signed: true,
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		return performAuthorizationCodeFlow(req, res, {
			redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
			scopes,
			returnPath,
		});
	}

	try {
		const { accessToken, idToken } = await verifyOAuthCookies(req);

		const idapiCookies = ['GU_U', 'SC_GU_U', 'SC_GU_LA'];
		const allIdapiCookiesSet = idapiCookies.every(
			(cookie) => req.cookies[cookie],
		);

		if (allIdapiCookiesSet && accessToken && idToken) {
			setLocalStateFromIdToken(res, idToken);
			return next();
		}

		console.log(
			'  OAUTH FLOW: No access token or ID token found, performing auth code flow',
		);
		// We don't have the tokens, so we need to get them.
		return performAuthorizationCodeFlow(req, res, {
			redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
			scopes,
			returnPath,
		});
	} catch (err) {
		return handleOAuthMiddlewareError(err, res);
	}
};
