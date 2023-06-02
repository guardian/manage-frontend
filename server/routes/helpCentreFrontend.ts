import { Router } from 'express';
import type { Request, Response } from 'express';
import type express from 'express';
import { DEFAULT_PAGE_TITLE } from '../../shared/helpCentreConfig';
import { conf } from '../config';
import { html } from '../html';
import { withIdentity } from '../middleware/identityMiddleware';
import {
	clientDSN,
	getRecaptchaPublicKey,
	getStripePublicKeys,
} from './frontendCommon';

const router = Router();

export const getCookiesOrEmptyString = (req: express.Request) =>
	req.header('cookie') || '';

router.use(withIdentity());

router.use(async (_: Request, res: Response) => {
	const title = DEFAULT_PAGE_TITLE;
	const src = '/static/help-centre.js';

	res.send(
		html({
			title,
			src,
			globals: {
				domain: conf.DOMAIN,
				dsn: clientDSN,
				identityDetails: res.locals.identity,
				recaptchaPublicKey: await getRecaptchaPublicKey(),
				...(await getStripePublicKeys()),
			},
		}),
	);
});

export { router };
