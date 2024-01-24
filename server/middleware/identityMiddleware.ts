import url from 'url';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import fetch from 'node-fetch';
import { handleAwsRelatedError } from '@/server/awsIntegration';
import { conf } from '@/server/config';
import type { RedirectResponseBody } from '@/server/idapiAuth';
import {
	containsSignInTokenQueryParameters,
	getCookiesOrEmptyString,
	redirectOrCustomStatusCode,
} from '@/server/idapiAuth';
import { idapiConfigPromise } from '@/server/idapiConfig';
import { log } from '@/server/log';
import {
	augmentRedirectURL,
	updateManageUrl,
} from '@/server/middleware/requestMiddleware';
import {
	allIdapiCookiesSet,
	performAuthorizationCodeFlow,
	sanitizeReturnPath,
	setLocalStateFromIdTokenOrUserCookie,
	verifyOAuthCookiesLocally,
} from '@/server/oauth';
import {
	OAuthAccessTokenCookieName,
	oauthCookieOptions,
	OAuthIdTokenCookieName,
	scopes,
} from '@/server/oauthConfig';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '@/shared/identity';
import { requiresSignin } from '@/shared/requiresSignin';

declare const CYPRESS: string;

const handleIdentityMiddlewareError = (err: Error, res: Response) => {
	log.error('OAuth / Middleware / Error', err);
	res.redirect('/maintenance');
};

const clearOAuthCookies = (res: Response) => {
	res.clearCookie(OAuthAccessTokenCookieName, oauthCookieOptions);
	res.clearCookie(OAuthIdTokenCookieName, oauthCookieOptions);
};

export const withIdentity: (statusCodeOverride?: number) => RequestHandler =
	(statusCodeOverride?: number) =>
	async (req: Request, res: Response, next: NextFunction) => {
		if (CYPRESS === 'SKIP_IDAPI') {
			return next();
		}

		try {
			const { useOkta } = await getOktaConfig();
			if (useOkta) {
				return authenticateWithOAuth(req, res, next);
			} else {
				return authenticateWithIdapi(statusCodeOverride)(
					req,
					res,
					next,
				);
			}
		} catch (err) {
			handleIdentityMiddlewareError(err, res);
		}
	};

export const authenticateWithOAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get the path of the current page and use it as our returnPath after the OAuth callback.
	const returnPath = sanitizeReturnPath(req.originalUrl);

	try {
		const verifiedTokens = await verifyOAuthCookiesLocally(req);
		const guSoTimestamp = parseInt(req.cookies['GU_SO']);
		if (requiresSignin(req.originalUrl)) {
			// The route requires signin
			/////////////////////////////////////////////////////////////////////////////////////
			if (verifiedTokens?.accessToken && verifiedTokens?.idToken) {
				// Check GU_SO cookie timestamp (we want to know if the user has signed out _after_ these tokens were issued,
				// so we can redirect them to the OAuth flow to get new tokens for the currently signed-in user (if any).
				if (
					guSoTimestamp &&
					typeof verifiedTokens.accessToken.claims.iat === 'number' &&
					guSoTimestamp > verifiedTokens.accessToken.claims.iat &&
					// Check that the GU_SO cookie value is not set into the future to avoid a redirect loop
					// where the middleware will continually keep running performAuthorizationCodeFlow().
					guSoTimestamp <= Math.floor(Date.now() / 1000)
				) {
					clearOAuthCookies(res);
					return performAuthorizationCodeFlow(req, res, {
						redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
						scopes,
						returnPath,
					});
				}
				// At this point, the GU_SO cookie is either not set, or it's older than the tokens,
				// so we know the tokens belong to the currently signed-in user.
				if (allIdapiCookiesSet(req)) {
					// The user has valid access and ID tokens, and the full set of IDAPI cookies,
					// so they're signed in. We set req.locals.identity so that the frontend can
					// correctly show the user as signed in and continue to the route.
					setLocalStateFromIdTokenOrUserCookie(
						req,
						res,
						verifiedTokens.idToken,
					);
					return next();
				}
			}

			// We don't have the tokens, or they're invalid, or we're missing IDAPI cookies,
			// so we need to get them.
			return performAuthorizationCodeFlow(req, res, {
				redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
				scopes,
				returnPath,
			});
		} else {
			// The route does not require signin (but the user _may_ be signed in)
			/////////////////////////////////////////////////////////////////////////////////////
			if (verifiedTokens?.accessToken && verifiedTokens?.idToken) {
				// Check GU_SO cookie timestamp
				if (
					guSoTimestamp &&
					typeof verifiedTokens.accessToken.claims.iat === 'number' &&
					guSoTimestamp > verifiedTokens.accessToken.claims.iat &&
					// Check that the GU_SO cookie value is not set into the future to avoid clearing
					// the OAuth cookies when the GU_SO cookie has an invalid value.
					guSoTimestamp <= Math.floor(Date.now() / 1000)
				) {
					clearOAuthCookies(res);
					return next();
				}
			}

			// Set as much as possible of the local state from the available combination of
			// GU_U and the ID token.
			setLocalStateFromIdTokenOrUserCookie(
				req,
				res,
				verifiedTokens?.idToken,
			);
			return next();
		}
	} catch (err) {
		return handleIdentityMiddlewareError(err, res);
	}
};

const authenticateWithIdapi: (statusCodeOverride?: number) => RequestHandler =
	(statusCodeOverride?: number) =>
	(req: Request, res: Response, next: NextFunction) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume we don't know the range of possible types for the detail argument?
		const errorHandler = (message: string, detail?: any) => {
			handleAwsRelatedError(message, detail);
			res.redirect('/maintenance');
		};

		const useRefererHeaderForManageUrl = !!statusCodeOverride;

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
								// This ensures the sensitive query parameters will not be recorded by Ophan,
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
