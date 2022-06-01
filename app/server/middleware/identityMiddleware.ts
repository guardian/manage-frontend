import express from 'express';
import fetch from 'node-fetch';
import url, { UrlWithParsedQuery } from 'url';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import { requiresSignin } from '../../shared/requiresSignin';
import { handleAwsRelatedError } from '../awsIntegration';
import { conf } from '../config';
import { idapiConfigPromise } from '../idapiConfig';
import { log } from '../log';

interface RedirectResponseBody extends IdentityDetails {
	signInStatus: string;
	redirect?: {
		url: string;
	};
}

interface MockableExpressRequest {
	baseUrl: string;
	path: string;
	get: (name: string) => string | undefined;
	header: (name: string) => string | undefined;
	query: any;
}

interface QueryParameters {
	[name: string]: string;
}

// Filter query parameters to include only those whose name satisfies the predicate p.
const filterQueryParametersByName = (
	params: QueryParameters,
	p: (name: string) => boolean,
): QueryParameters => {
	return Object.entries(params)
		.filter(([name, _]) => p(name))
		.reduce(
			(params2, [name, value]) => ({ ...params2, [name]: value }),
			{},
		);
};

// Names of query parameters to that facilitate sign-in on profile.
const signInTokenQueryParameterNames = ['encryptedEmail', 'autoSignInToken'];

const containsSignInTokenQueryParameters = (
	req: MockableExpressRequest,
): boolean =>
	signInTokenQueryParameterNames.some(
		(name) => req.query[name] !== undefined,
	);

// Adds the redirect url (if defined) as query parameter profileReferer,
// and removes the sign-in token query parameters since they are not required by manage
// (only used by profile if the user is redirected their to sign-in).
const updateManageUrl = (
	req: MockableExpressRequest,
	useRefererHeader: boolean,
	redirectUrl?: UrlWithParsedQuery,
): string => {
	// It is vital that the sign-in query parameters are removed.
	// See the implementation of withIdentity() for more context.
	const queryParameters = filterQueryParametersByName(
		req.query,
		(name) => !signInTokenQueryParameterNames.includes(name),
	);

	const profileReferrer =
		redirectUrl && redirectUrl.path
			? redirectUrl.path.substring(1)
			: undefined;

	const refererHeader = req.header('referer');

	return useRefererHeader && refererHeader
		? refererHeader
		: url.format({
				protocol: 'https',
				host: req.get('host'),
				pathname: req.baseUrl + req.path,
				query: {
					...queryParameters,
					profileReferrer,
				},
		  });
};

export const augmentRedirectURL = (
	req: MockableExpressRequest,
	simpleRedirectURL: string,
	currentDomain: string,
	useRefererHeaderForReturnURL: boolean,
) => {
	const parsedSimpleURL = url.parse(
		// the replace below essentially allows DEV to use CODE IDAPI but still redirect to profile.thegulocal.com
		simpleRedirectURL.replace('code.dev-theguardian.com', currentDomain),
		true,
	);

	const returnUrl = updateManageUrl(
		req,
		useRefererHeaderForReturnURL,
		parsedSimpleURL,
	);

	// To avoid potential clashes with query parameters that have a special meaning on profile (e.g. error),
	// only forward specific query parameters to profile.
	const profileQueryParameterNames = [
		'INTCMP',
		// By passing these to profile, can measure the sign in rates across test segments.
		'abName',
		'abVariant',
		'journey',
		...signInTokenQueryParameterNames,
	];

	const profileQueryParameters = filterQueryParametersByName(
		req.query,
		(name) => profileQueryParameterNames.includes(name),
	);

	return url.format({
		protocol: parsedSimpleURL.protocol,
		host: parsedSimpleURL.host,
		pathname: parsedSimpleURL.pathname,
		query: {
			...parsedSimpleURL.query,
			...profileQueryParameters,
			returnUrl, // this is automatically URL encoded
		},
	});
};

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

		if (CYPRESS === 'true') {
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
