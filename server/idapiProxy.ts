import type { NextFunction, Request, Response } from 'express';
import type { HTTPMethod } from '../shared/apiTypes';
import { conf as mmaConfig } from './config';
import type { IdapiConfig } from './idapiConfig';
import { getConfig } from './idapiConfig';
import { OAuthAccessTokenCookieName } from './oauthConfig';
import { getConfig as getOktaConfig } from './oktaConfig';
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
	SC_GU_U?: string;
	[key: string]: string | undefined;
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

const securityCookieToHeader = (
	cookies: CookiesWithToken,
): Record<string, string> =>
	cookies[SECURITY_COOKIE_NAME]
		? { [SECURITY_HEADER_NAME]: cookies[SECURITY_COOKIE_NAME] }
		: {};

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
	sendAuthHeader,
	config,
	useOkta,
	cookies,
	signedCookies,
	subdomain,
}: {
	sendAuthHeader: boolean;
	config: IdapiConfig;
	useOkta: boolean;
	cookies: CookiesWithToken;
	signedCookies: CookiesWithToken;
	subdomain: string;
}): HeadersInit => {
	if (!sendAuthHeader) {
		return {};
	}
	if (useOkta) {
		return {
			'X-GU-IS-OAUTH': 'true',
			Authorization: `Bearer ${signedCookies[OAuthAccessTokenCookieName]}`,
		};
	} else {
		return {
			'X-GU-ID-Client-Access-Token': `Bearer ${config.accessToken}`,
			...securityCookieToHeader(cookies),
			// Avatar API expects a Cookie header with the SC_GU_U cookie.
			Cookie:
				subdomain === 'avatar' && cookies.SC_GU_U
					? `SC_GU_U=${cookies.SC_GU_U};`
					: '',
		};
	}
};

/**
 * Prepares the options object for a fetch request to IDAPI
 * or Avatar API (AAPI).
 *
 * @param options - The options object to prepare
 * @param options.sendAuthHeader - Whether to send the access token or IDAPI cookies
 * in the request
 * @param options.useOkta - Whether to use Okta for authentication
 * @param options.path - The path to the IDAPI endpoint (e.g. '/user/me')
 * @param options.subdomain - The subdomain of the IDAPI endpoint
 * (e.g. 'idapi' or 'avatar')
 * @param options.method - The HTTP method to use
 * @param options.cookies - The cookies coming from the client. These are used to
 * build the security and cookie headers in the request
 * @param options.signedCookies - The signed cookies coming from the client, also
 * used to build the security and cookie headers in the request
 * @param options.config - The IDAPI configuration object
 * @returns The options object for the fetch request
 */
export const setOptions = ({
	sendAuthHeader,
	useOkta,
	path,
	subdomain,
	method,
	cookies,
	signedCookies,
	config,
}: {
	sendAuthHeader: boolean;
	useOkta: boolean;
	path: string;
	subdomain: string;
	method: HTTPMethod;
	cookies: CookiesWithToken;
	signedCookies: CookiesWithToken;
	config: IdapiConfig;
}): IdapiFetchOptions => {
	const hostname = `${subdomain}.${getBaseDomain()}`;
	const headers = {
		...idapiOrOAuthHeaders({
			sendAuthHeader,
			config,
			useOkta,
			cookies,
			signedCookies,
			subdomain,
		}),
		'Content-Type': 'application/json',
		Origin: `https://manage.${getBaseDomain()}`,
		Referer: `https://manage.${getBaseDomain()}`,
	};

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
 * @param sendAuthHeader Whether to send the access token or IDAPI cookies
 * in the request (default: false)
 * @returns An Express route handler
 */
export const idapiProxyHandler =
	<T>({
		url,
		method = 'GET',
		processData,
		sendAuthHeader = false,
	}: {
		url: string;
		method?: HTTPMethod;
		processData?: (json: T, res: Response) => Response | void;
		useOAuth?: boolean;
		sendAuthHeader?: boolean;
	}) =>
	async (req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			return handleError(e, res, next);
		}
		const { useOkta } = await getOktaConfig();
		const options = setOptions({
			sendAuthHeader,
			useOkta,
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
