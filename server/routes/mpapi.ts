import type { RequestOptions } from 'http';
import https from 'https';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { log } from '../log';
import { withIdentity } from '../middleware/identityMiddleware';
import { getConfig, getOptions } from '../mpapiConfig';
import { handleError, mimicResponse } from '../util';

const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
	next();
});

const makeMpapiRequest = (options: RequestOptions, res: Response) => {
	const mpapiRequest = https.request(options, (mpapiResponse) => {
		mimicResponse(mpapiResponse, res);
		mpapiResponse.pipe(res);
	});

	mpapiRequest.on('error', handleError);

	mpapiRequest.end();
};

router.get(
	'/user/mobile-subscriptions',
	withIdentity(),
	async (_req: Request, res: Response, next: NextFunction) => {
		let config;
		try {
			config = await getConfig();
		} catch (e) {
			handleError(e, res, next);
			return;
		}

		if (!res.locals.identity && !res.locals.identity.userId) {
			log.error(
				`Missing identity ID on the request object when fetching mobile subscriptions`,
			);
			res.status(500).send();
		}

		const options = getOptions('GET', config, res.locals.identity.userId);

		makeMpapiRequest(options, res);
	},
);

export { router };
