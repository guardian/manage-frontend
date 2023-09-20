import type { NextFunction, Request, Response } from 'express';
import type { HTTPMethod } from '../shared/apiTypes';
import { conf as mmaConfig } from './config';
import type { IdapiConfig } from './idapiConfig';
import { getConfig } from './idapiConfig';
import { OAuthAccessTokenCookieName } from './oauth';
import { handleError } from './util';

export type NewsletterPatchRequest = {
	id: string;
	subscribed: boolean;
};

export type ConsentPatchRequest = NewsletterPatchRequest;

interface IdapiFetchOptions {
	route: string;
	method: string;
	headers: {
		'X-GU-ID-Client-Access-Token'?: string;
		'X-GU-ID-FOWARDED-SC-GU-U'?: string;
		Authorization?: string;
		'Content-Type'?: string;
		Origin?: string;
		Referer?: string;
	};
}

interface CookiesWithToken {
	SC_GU_U: string;
	[key: string]: string;
}

const getBaseDomain = (): string => {
	const { STAGE } = mmaConfig;
	switch (STAGE) {
		case 'PROD':
			return 'theguardian.com';
		default:
			return 'code.dev-theguardian.com';
	}
};

const SECURITY_HEADER_NAME = 'X-GU-ID-FOWARDED-SC-GU-U';
const SECURITY_COOKIE_NAME = 'SC_GU_U';

const securityCookieToHeader = (cookies: CookiesWithToken) => ({
	[SECURITY_HEADER_NAME]: cookies[SECURITY_COOKIE_NAME],
});

const prepareBody = <T>(body: T | undefined) => {
	if (!body) {
		return undefined;
	}
	if (typeof body === 'string') {
		return body;
	}
	if (Buffer.isBuffer(body)) {
		return body;
	}
	// Body might be a JSON object, so we need to stringify it
	try {
		return JSON.stringify(body);
	} catch (e) {
		throw new Error(`Error stringifying request body: ${e}`);
	}
};

const idapiOrOAuthHeaders = ({
	config,
	useOAuth,
	cookies,
	signedCookies,
	subdomain,
}: {
	config: IdapiConfig;
	useOAuth: boolean;
	cookies: CookiesWithToken;
	signedCookies: CookiesWithToken;
	subdomain: string;
}) => ({
	...(useOAuth
		? {
				'X-GU-IS-OAUTH': 'true',
				Authorization: `Bearer ${signedCookies[OAuthAccessTokenCookieName]}`,
		  }
		: {
				'X-GU-ID-Client-Access-Token': `Bearer ${config.accessToken}`,
				...securityCookieToHeader(cookies),
				// Avatar API expects a Cookie header with the SC_GU_U cookie.
				Cookie:
					subdomain === 'avatar' ? `SC_GU_U=${cookies.SC_GU_U};` : '',
		  }),
});

export const setOptions = ({
	useOAuth,
	path,
	subdomain,
	method,
	cookies,
	signedCookies,
	config,
}: {
	useOAuth: boolean;
	path: string;
	subdomain: string;
	method: HTTPMethod;
	cookies: CookiesWithToken;
	signedCookies: CookiesWithToken;
	config: IdapiConfig;
}): IdapiFetchOptions => {
	const hostname = `${subdomain}.${getBaseDomain()}`;
	console.log('Using OAuth?', useOAuth);

	const headers = {
		...idapiOrOAuthHeaders({
			config,
			useOAuth,
			cookies,
			signedCookies,
			subdomain,
		}),
		'Content-Type': 'application/json',
		Origin: `https://manage.${getBaseDomain()}`,
		Referer: `https://manage.${getBaseDomain()}`,
	};

	console.log('HEADERS', headers);

	const options = {
		headers,
		method,
		route: `https://${hostname}${path}`,
	};

	return options;
};

/**
 * Performs a fetch request to IDAPI.

 * @template T - The type of the JSON payload sent to IDAPI
 */
export const idapiFetch = async <T>({
	options,
	body,
}: {
	options: IdapiFetchOptions;
	body?: T;
}) => {
	const response = await fetch(options.route, {
		method: options.method,
		headers: options.headers,
		body: prepareBody<T>(body),
	});
	return response;
};

/**
 * Route handler which proxies a request made from the MMA client to IDAPI.
 *
 * @template T The type of the JSON response from IDAPI
 * @param url The IDAPI endpoint to hit
 * @param method The HTTP method to use (default: 'GET')
 * @param processData A function to process the JSON response (optional)
 * @returns An Express route handler
 */
export const idapiProxyHandler =
	<T>({
		url,
		method = 'GET',
		processData,
		useOAuth = false,
	}: {
		url: string;
		method?: HTTPMethod;
		processData?: (json: T, res: Response) => Response | void;
		useOAuth?: boolean;
	}) =>
	async (req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			return handleError(e, res, next);
		}
		const options = setOptions({
			useOAuth: useOAuth && !!res.locals.identity.accessToken,
			path: url,
			subdomain: 'idapi',
			method,
			cookies: req.cookies,
			signedCookies: req.signedCookies,
			config,
		});
		try {
			const response = await idapiFetch<T>({
				options,
				// The body will come in as a Buffer because we're not parsing JSON
				// so we simply pass it through as is. We don't care what's inside it.
				body: ['POST', 'PUT', 'PATCH'].includes(method)
					? req.body
					: undefined,
			});
			if (response.ok) {
				const json = await response.json();
				console.log(json);
			}
			if (response.status === 204) {
				return res.sendStatus(204);
			} else {
				try {
					const json = await response.json();
					if (processData) {
						return processData(json, res);
					} else {
						// Just send the JSON response as is
						return res.status(response.status).json(json);
					}
				} catch (e) {
					// Swallow JSON parse errors
					if (e instanceof SyntaxError) {
						return res.sendStatus(response.status);
					} else {
						return handleError(e, res, next);
					}
				}
			}
		} catch (error) {
			handleError(error, res, next);
		}
	};
