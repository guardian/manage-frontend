import url from 'url';
import type express from 'express';
import fetch from 'node-fetch';
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
	res: express.Response,
	redirectURL: string,
	statusCode?: number,
) =>
	statusCode
		? res.status(statusCode).header('Location', redirectURL).send()
		: res.redirect(redirectURL);

export const getCookiesOrEmptyString = (req: express.Request) =>
	req.header('cookie') || '';

declare let CYPRESS: string;

export const withIdentity: (
	statusCodeOverride?: number,
) => express.RequestHandler =
	(statusCodeOverride?: number) =>
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		const errorHandler = (message: string, detail?: any) => {
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
