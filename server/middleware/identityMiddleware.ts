import url from 'url';
import type OktaJwtVerifier from '@okta/jwt-verifier';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import fetch from 'node-fetch';
import type { Scopes } from '@/server/oauth';
import {
	OAuthAccessTokenCookieName,
	OAuthIdTokenCookieName,
	performAuthorizationCodeFlow,
	scopes,
	verifyAccessToken,
	verifyIdToken,
} from '@/server/oauth';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import { requiresSignin } from '../../shared/requiresSignin';
import { handleAwsRelatedError } from '../awsIntegration';
import { conf } from '../config';
import { idapiConfigPromise } from '../idapiConfig';
import { log } from '../log';
import type { MockableExpressRequest } from './requestMiddleware';
import {
	augmentRedirectURL,
	signInTokenQueryParameterNames,
	updateManageUrl,
} from './requestMiddleware';

interface RedirectResponseBody extends IdentityDetails {
	signInStatus: string;
	redirect?: {
		url: string;
	};
}

const containsSignInTokenQueryParameters = (
	req: MockableExpressRequest,
): boolean =>
	signInTokenQueryParameterNames.some(
		(name) => req.query[name] !== undefined,
	);

const redirectOrCustomStatusCode = (
	res: Response,
	redirectURL: string,
	statusCode?: number,
) =>
	statusCode
		? res.status(statusCode).header('Location', redirectURL).send()
		: res.redirect(redirectURL);

export const getCookiesOrEmptyString = (req: Request) =>
	req.header('cookie') || '';

declare let CYPRESS: string;

export const withIdentity: (statusCodeOverride?: number) => RequestHandler =
	(statusCodeOverride?: number) =>
	(req: Request, res: Response, next: NextFunction) => {
		const errorHandler = (message: string, detail?: unknown) => {
			handleAwsRelatedError(message, detail);
			res.redirect('/maintenance');
		};

		const useRefererHeaderForManageUrl = !!statusCodeOverride;

		if (CYPRESS === 'SKIP_IDAPI') {
			return next();
		}

		idapiConfigPromise
			.then((idapiConfig) => {
				if (idapiConfig) {
					fetch(
						url.format({
							protocol: 'https',
							host: idapiConfig.host,
							pathname: 'auth/redirect',
						}),
						{
							headers: {
								'X-GU-ID-Client-Access-Token':
									'Bearer ' + idapiConfig.accessToken,
								[X_GU_ID_FORWARDED_SCOPE]:
									req.header(X_GU_ID_FORWARDED_SCOPE) ||
									getScopeFromRequestPathOrEmptyString(
										req.path,
									),
								Cookie: getCookiesOrEmptyString(req),
							},
						},
					)
						.then(
							(redirectResponse) =>
								redirectResponse.json() as Promise<RedirectResponseBody>,
						)
						.then((redirectResponseBody) => {
							// tslint:disable-next-line:no-object-mutation
							Object.assign(res.locals, {
								identity: redirectResponseBody,
							});

							if (!requiresSignin(req.originalUrl)) {
								next();
							} else if (redirectResponseBody.redirect) {
								redirectOrCustomStatusCode(
									res,
									augmentRedirectURL(
										req,
										redirectResponseBody.redirect.url,
										conf.DOMAIN,
										useRefererHeaderForManageUrl,
									),
									statusCodeOverride,
								);
							} else if (
								redirectResponseBody.signInStatus ===
								'signedInRecently'
							) {
								// If the request to manage contains sign-in token query parameters,
								// but they are not needed because the user is already signed in,
								// redirect them to the same url, but with the sign-in token query parameters removed.
								// This ensures the sensitive query parameters will not be recorded by GA or Ophan,
								// in addition to the url the user sees in the browser being simpler.
								if (containsSignInTokenQueryParameters(req)) {
									// Note it is vital that updateManageUrl() removes the auto sign-in query parameters,
									// otherwise, on redirect this branch of code would get executed again, causing a redirect loop to occur!
									res.redirect(
										updateManageUrl(
											req,
											useRefererHeaderForManageUrl,
										),
									);
								} else {
									next();
								}
							} else {
								errorHandler(
									'unexpected response from IDAPI redirect service',
									redirectResponseBody,
								);
							}
						})
						.catch((err) => {
							const message =
								'error back from IDAPI redirect service';
							if (requiresSignin(req.originalUrl)) {
								errorHandler(message, err);
							} else {
								log.error(message, err);
								next();
							}
						});
				} else {
					errorHandler('IDAPI config is undefined');
				}
			})
			.catch((err) => errorHandler('error fetching IDAPI config', err));
	};

const handleOAuthMiddlewareError = (err: Error, res: Response) => {
	console.log('OAuth / Middleware error: ', err);
	res.redirect('/maintenance');
};

interface VerifiedOAuthCookies {
	accessToken?: OktaJwtVerifier.Jwt;
	idToken?: OktaJwtVerifier.Jwt;
}

// Returns either an object with the verified access and ID tokens, or an empty object
const verifyOAuthCookies = async (
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

const sanitizeReturnPath = (returnPath: string) => {
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
	console.log("OAUTH FLOW: 1. Hit 'withOAuth' middleware");

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
		console.log(
			'  OAUTH FLOW: GU_SO cookie found, redirecting to sign in page',
		);
		console.log('  ', req.cookies['GU_SO']);
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

		if (accessToken && idToken) {
			setLocalStateFromIdToken(res, idToken);
			console.log(
				'  OAUTH FLOW: Access and ID tokens found, redirecting',
			);
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
