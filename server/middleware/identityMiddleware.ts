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
	OAuthAccessTokenCookieName,
	oauthCookieOptions,
	OAuthIdTokenCookieName,
	performAuthorizationCodeFlow,
	sanitizeReturnPath,
	scopes,
	setLocalStateFromIdTokenOrUserCookie,
	verifyOAuthCookiesLocally,
} from '@/server/oauth';
import { getConfig as getOktaConfig } from '@/server/oktaConfig';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '@/shared/identity';
import { requiresSignin } from '@/shared/requiresSignin';

declare const CYPRESS: string;

const handleIdentityMiddlewareError = (err: Error, res: Response) => {
	console.log('OAuth / Middleware / Error', err);
	res.redirect('/maintenance');
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
		if (requiresSignin(req.originalUrl)) {
			// The route requires signin
			/////////////////////////////////////////////////////////////////////////////////////
			// If we have a GU_SO cookie, we've signed out recently, so we need to delete
			// the access and ID tokens from the browser and perform the OAuth flow again.
			if (req.cookies['GU_SO']) {
				res.clearCookie(OAuthAccessTokenCookieName, oauthCookieOptions);
				res.clearCookie(OAuthIdTokenCookieName, oauthCookieOptions);
				return performAuthorizationCodeFlow(req, res, {
					redirectUri: `https://manage.${conf.DOMAIN}/oauth/callback`,
					scopes,
					returnPath,
				});
			}

			const { accessToken, idToken } = await verifyOAuthCookiesLocally(
				req,
			);
			if (allIdapiCookiesSet(req) && accessToken && idToken) {
				// The user has valid access and ID tokens, and the full set of IDAPI cookies,
				// so they're signed in. We set req.locals.identity so that the frontend can
				// correctly show the user as signed in and continue to the route.
				setLocalStateFromIdTokenOrUserCookie(req, res, idToken);
				return next();
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
			// If we have a GU_SO cookie, we've signed out recently, so we need to delete
			// the access and ID tokens from the browser and continue to the route.
			if (req.cookies['GU_SO']) {
				res.clearCookie(OAuthAccessTokenCookieName, oauthCookieOptions);
				res.clearCookie(OAuthIdTokenCookieName, oauthCookieOptions);
				// The user is totally signed out.
				return next();
			}

			// If we do have access and ID token cookies, we can attempt to verify them
			// and add the result to res.locals (which will get passed to the frontend
			// and correctly show if the user is signed in).
			const { accessToken, idToken } = await verifyOAuthCookiesLocally(
				req,
			);
			if (allIdapiCookiesSet(req) && accessToken && idToken) {
				setLocalStateFromIdTokenOrUserCookie(req, res, idToken);
				// The user is signed in.
				return next();
			}

			// If they do _not_ have valid access/ID tokens, but _do_ have a GU_U cookie,
			// they are 'maybe signed in', and we can at least show the signed in header
			// on the frontend by setting local state. This is because the GU_U cookie is
			// set by Gateway during the OAuth flow.
			if (req.cookies['GU_U']) {
				setLocalStateFromIdTokenOrUserCookie(req, res);
				// The user is maybe signed in.
				return next();
			}

			// They have neither tokens nor the GU_U cookie, so they're completely signed out.
			return next();
		}
	} catch (err) {
		console.error(err);
		return handleIdentityMiddlewareError(err, res);
	}
};

const authenticateWithIdapi: (statusCodeOverride?: number) => RequestHandler =
	(statusCodeOverride?: number) =>
	(req: Request, res: Response, next: NextFunction) => {
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
