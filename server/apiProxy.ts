import { parse } from 'url';
import * as Sentry from '@sentry/node';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { LOGGING_CODE_SUFFIX_HEADER } from '../shared/globals';
import { X_GU_ID_FORWARDED_SCOPE } from '../shared/identity';
import { MDA_TEST_USER_HEADER } from '../shared/productResponse';
import { conf } from './config';
import { getCookiesOrEmptyString } from './idapiAuth';
import { log, putMetric } from './log';
import { augmentRedirectURL } from './middleware/requestMiddleware';
import { OAuthAccessTokenCookieName } from './oauthConfig';

type BodyHandler = (res: Response, body: Buffer) => void;
type JsonString = Buffer | string | undefined;

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

export const proxyApiHandler =
	(
		host: string,
		headers: Headers = {},
		additionalHeaderGenerator: AdditionalHeaderGenerator = () =>
			Promise.resolve({}),
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

		const authorizationOrCookieHeader = ({
			req,
			host,
		}: {
			req: Request;
			host: string;
		}): Headers => {
			switch (host) {
				case 'members-data-api.' + conf.DOMAIN:
					return {
						Authorization: `Bearer ${req.signedCookies[OAuthAccessTokenCookieName]}`,
					};
				default:
					// TODO: This is legacy code!
					// We don't want to send literally all cookies to APIs so when
					// we migrate to Okta tokens entirely we should remove this
					return {
						Cookie: getCookiesOrEmptyString(req),
					};
			}
		};

		fetch(outgoingURL, {
			method: httpMethod,
			body: requestBody,
			headers: {
				...authorizationOrCookieHeader({ req, host }),
				'Content-Type': 'application/json', // TODO: set this from the client req headers (would need to check all client calls actually specify content-type)
				[X_GU_ID_FORWARDED_SCOPE]:
					req.header(X_GU_ID_FORWARDED_SCOPE) || '',
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

export const customMembersDataApiHandler = proxyApiHandler(
	'members-data-api.' + conf.DOMAIN,
);
export const membersDataApiHandler = customMembersDataApiHandler(
	straightThroughBodyHandler,
);
