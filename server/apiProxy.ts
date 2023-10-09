import { parse } from 'url';
import * as Sentry from '@sentry/node';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { LOGGING_CODE_SUFFIX_HEADER } from '../shared/globals';
import { X_GU_ID_FORWARDED_SCOPE } from '../shared/identity';
import { MDA_TEST_USER_HEADER } from '../shared/productResponse';
import { conf } from './config';
import { log, putMetric } from './log';
import { augmentRedirectURL } from './middleware/requestMiddleware';

type BodyHandler = (res: Response, body: Buffer) => void;
type JsonString = Buffer | string | undefined;

const getCookiesOrEmptyString = (req: Request) => req.header('cookie') || '';

export const straightThroughBodyHandler: BodyHandler = (res, body) =>
	res.send(body);

function safeJsonParse(jsonStr: JsonString): object | JsonString {
	try {
		if (jsonStr) {
			return JSON.parse(jsonStr.toString());
		}
		return jsonStr;
	} catch (e) {
		return jsonStr;
	}
}

export type Headers = Record<string, string>;
export type AdditionalHeaderGenerator = (
	method: string,
	host: string,
	path: string,
	body: string,
) => Promise<Headers>;

export const newApiProxyHandler = (p: {
	host: string;
	headers?: Headers;
	additionalHeaderGenerator?: AdditionalHeaderGenerator;
	forwardPersonalCredentials: boolean;
}) =>
	proxyApiHandler(
		p.host,
		p.headers,
		p.additionalHeaderGenerator,
		p.forwardPersonalCredentials,
		false,
	);

export const proxyApiHandler =
	(
		host: string,
		headers: Headers = {},
		additionalHeaderGenerator: AdditionalHeaderGenerator = () =>
			Promise.resolve({}),
		forwardPersonalCredentials: boolean = true, // whether the downstream api needs the authenticated user credentials
		//just a flag to preserve endpoints that have not been migrated yet unchanged
		legacyBehaviour: boolean = true,
	) =>
	(bodyHandler: BodyHandler) =>
	(
		path: string,
		mainLoggingCode: string,
		urlParamNamesToReplace: string[] = [],
		forwardQueryArgs?: boolean, // TODO could we eliminate this and always forward query params
		shouldNotLogBody?: boolean,
	) =>
	async (req: Request, res: Response) => {
		const parameterisedPath = urlParamNamesToReplace
			.reduce(
				(evolvingPath: string, urlParamName: string) =>
					evolvingPath.replace(
						':' + urlParamName,
						req.params[urlParamName] || '',
					),
				path,
			)
			.replace(/\/$/, ''); // strips any trailing slashes

		const queryString =
			forwardQueryArgs && req.query && Object.keys(req.query).length > 0
				? `?${parse(req.url).query}`
				: '';

		const isTestUser = req.header(MDA_TEST_USER_HEADER) === 'true';
		const requestBody = Buffer.isBuffer(req.body) ? req.body : undefined;
		const httpMethod = req.method;
		const finalPath = `/${parameterisedPath}${queryString}`;
		const outgoingURL = `https://${host}${finalPath}`;
		const loggingCode = `${mainLoggingCode}${
			req.header(LOGGING_CODE_SUFFIX_HEADER) || ''
		}`;

		// tslint:disable-next-line:no-object-mutation
		res.locals.loggingDetail = {
			loggingCode,
			httpMethod,
			isTestUser,
			identityID: res.locals.identity && res.locals.identity.userId,
			incomingURL: req.originalUrl,
			requestBody: safeJsonParse(requestBody),
			outgoingURL,
		};

		let apiCookies = '';
		let maybeOktaAuthHeader = {};
		//TODO remove this debug logging
		const logWithRef = (msg: string): void => {
			console.log(`==>> For ${host} :${msg}`);
		};

		if (forwardPersonalCredentials) {
			if (legacyBehaviour) {
				logWithRef(`legacy behaviour, forwarding all cookies`);
				apiCookies = getCookiesOrEmptyString(req);
			} else {
				logWithRef('forwarding okta credentials in header!');
				maybeOktaAuthHeader = {
					Authorization: `Bearer ${req.signedCookies['GU_ACCESS_TOKEN']}`,
				};
			}
		} else {
			logWithRef('forwarding credentials is disabled!');
		}
		//logWithRef(`forwarding cookies to api: [${apiCookies}]`);

		fetch(outgoingURL, {
			method: httpMethod,
			body: requestBody,
			headers: {
				'Content-Type': 'application/json', // TODO: set this from the client req headers (would need to check all client calls actually specify content-type)
				Cookie: apiCookies,
				[X_GU_ID_FORWARDED_SCOPE]:
					req.header(X_GU_ID_FORWARDED_SCOPE) || '',
				...maybeOktaAuthHeader,
				...headers,
				...(await additionalHeaderGenerator(
					httpMethod,
					host,
					finalPath,
					requestBody?.toString() || '',
				)),
			},
		})
			.then((intermediateResponse) => {
				// tslint:disable-next-line:no-object-mutation
				res.locals.loggingDetail.status = intermediateResponse.status;
				// tslint:disable-next-line:no-object-mutation
				res.locals.loggingDetail.isOK = intermediateResponse.ok;

				res.status(intermediateResponse.status);

				// Forward certain headers in the response to the client
				[
					'Content-Type',
					'Content-Length',
					MDA_TEST_USER_HEADER,
				].forEach((headerName) =>
					res.header(
						headerName,
						intermediateResponse.headers.get(headerName) ||
							undefined,
					),
				);

				const idapiRedirect = intermediateResponse.headers.get(
					'X-GU-IDAPI-Redirect',
				);
				if (intermediateResponse.status === 401 && idapiRedirect) {
					res.header(
						'Location',
						augmentRedirectURL(
							req,
							idapiRedirect,
							conf.DOMAIN,
							true,
						),
					);
				}
				return intermediateResponse.buffer();
			})
			.then((body) => {
				const suitableLog = res.locals.loggingDetail.isOK
					? log.info
					: log.warn;
				suitableLog(
					'proxying',
					shouldNotLogBody
						? res.locals.loggingDetail
						: {
								...res.locals.loggingDetail,
								responseBody: safeJsonParse(body),
						  },
				);
				putMetric(res.locals.loggingDetail);
				bodyHandler(res, body);
			})
			.catch((error) => {
				log.error('ERROR proxying', {
					...res.locals.loggingDetail,
					exception: error ? error.toString() : 'undefined',
				});
				Sentry.captureException(error);
				putMetric(res.locals.loggingDetail);
				res.status(500).send('Something broke!');
			});
	};

export const customMembersDataApiHandler = newApiProxyHandler({
	host: 'members-data-api.' + conf.DOMAIN,
	forwardPersonalCredentials: true,
});
export const membersDataApiHandler = customMembersDataApiHandler(
	straightThroughBodyHandler,
);
