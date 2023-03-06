import type { RequestOptions } from 'http';
import https from 'https';
import cookieParser from 'cookie-parser';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import type { IdapiConfig } from '../idapiConfig';
import { idapiConfigPromise } from '../idapiConfig';
import { crsfMiddleware, handleError, mimicResponse } from '../util';

const SECURITY_COOKIE_NAME = 'SC_GU_U';
const SECURITY_HEADER_NAME = 'X-GU-ID-FOWARDED-SC-GU-U';

const router = Router();

interface CookiesWithToken {
	[SECURITY_COOKIE_NAME]: string;
	[key: string]: string;
}

interface SCGUHeader {
	[SECURITY_HEADER_NAME]: string;
}

const securityCookieToHeader = (cookies: CookiesWithToken): SCGUHeader => ({
	[SECURITY_HEADER_NAME]: cookies[SECURITY_COOKIE_NAME],
});

const isValidConfig = (config: any): config is IdapiConfig =>
	config.host && config.accessToken;

const isValid = (req: Request): boolean => {
	const token: boolean = !!req.cookies[SECURITY_COOKIE_NAME];
	return token;
};

const makeIdapiRequest = (
	options: RequestOptions,
	res: Response,
	body?: Buffer,
) => {
	const idapiRequest = https.request(options, (idapiResponse) => {
		mimicResponse(idapiResponse, res);
		idapiResponse.pipe(res);
	});
	idapiRequest.on('error', handleError);
	if (body) {
		idapiRequest.write(body);
	}
	idapiRequest.end();
};

const getConfig = async (): Promise<IdapiConfig> => {
	const config = await idapiConfigPromise;
	if (!isValidConfig(config)) {
		throw new Error('Error loading a valid config');
	}
	return config;
};

const getOptions = (
	method: string,
	cookies: CookiesWithToken,
	config: IdapiConfig,
) => {
	const path = '/user/me';
	const hostname = config.host;

	const headers = {
		'X-GU-ID-Client-Access-Token': `Bearer ${config.accessToken}`,
		...securityCookieToHeader(cookies),
		'Content-Type': 'application/json',
	};

	const options = {
		headers,
		method,
		hostname,
		path,
	};

	return options;
};

router.use(cookieParser());

router.use((req: Request, res: Response, next: NextFunction) => {
	if (!isValid(req)) {
		res.sendStatus(401);
		return;
	} else {
		next();
	}
});

router.get(
	'/user',
	crsfMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			handleError(e, res, next);
			return;
		}
		res.cookie('XSRF-TOKEN', req.csrfToken(), {
			secure: true,
			sameSite: 'strict',
		});
		const options = getOptions('GET', req.cookies, config);
		makeIdapiRequest(options, res);
	},
);

router.put(
	'/user',
	crsfMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			handleError(e, res, next);
			return;
		}
		const options = getOptions('POST', req.cookies, config);
		const { body } = req;
		makeIdapiRequest(options, res, body);
	},
);

router.use((err: any, _: Request, res: Response, next: NextFunction) => {
	if (err.code && err.code === 'EBADCSRFTOKEN') {
		res.sendStatus(403);
	}
	next(err);
});

export { router };
