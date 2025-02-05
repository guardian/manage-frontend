import type { Request, Response } from 'express';
import { Router } from 'express';
import { conf } from '../config';
import { htmlAndScriptHashes } from '../html';
import { withIdentity } from '../middleware/identityMiddleware';
import { createCsp } from '../server';
import { csrfValidateMiddleware } from '../util';
import {
	clientDSN,
	getRecaptchaPublicKey,
	getStripePublicKeys,
} from './frontendCommon';

const router = Router();

router.use(csrfValidateMiddleware);

router.use(withIdentity(), async (req: Request, res: Response) => {
	const title = 'My Account | The Guardian';
	const src = '/static/mma.js';

	res.cookie('XSRF-TOKEN', req.csrfToken(), {
		secure: true,
		sameSite: 'strict',
	});

	const htmlStrAndScriptHashes = htmlAndScriptHashes({
		title,
		src,
		globals: {
			domain: conf.DOMAIN,
			dsn: clientDSN,
			identityDetails: res.locals.identity,
			recaptchaPublicKey: await getRecaptchaPublicKey(),
			...(await getStripePublicKeys()),
		},
	});

	res.set({
		'Report-To':
			'{ "group": "csp-endpoint", "endpoints": [ { "url": "/api/csp-audit-report-endpoint" } ] }',
		'Content-Security-Policy-Report-Only': createCsp(
			htmlStrAndScriptHashes.hashes,
		),
	});

	res.send(htmlStrAndScriptHashes.body);
});

export { router };
