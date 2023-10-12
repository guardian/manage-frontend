import type { Request, Response } from 'express';
import { Router } from 'express';
import { conf } from '../config';
import { html } from '../html';
import { withOAuth } from '../middleware/identityMiddleware';
import { csrfValidateMiddleware } from '../util';
import {
	clientDSN,
	getRecaptchaPublicKey,
	getStripePublicKeys,
} from './frontendCommon';

const router = Router();

router.use(csrfValidateMiddleware);

router.use(withOAuth, async (req: Request, res: Response) => {
	const title = 'My Account | The Guardian';
	const src = '/static/mma.js';

	res.cookie('XSRF-TOKEN', req.csrfToken(), {
		secure: true,
		sameSite: 'strict',
	});

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
