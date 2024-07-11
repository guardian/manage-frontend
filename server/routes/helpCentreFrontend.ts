import { Router } from 'express';
import type { Request, Response } from 'express';
import { DEFAULT_PAGE_TITLE } from '../../shared/helpCentreConfig';
import { conf } from '../config';
import { htmlAndScriptHashes } from '../html';
import { withIdentity } from '../middleware/identityMiddleware';
import { createCsp } from '../server';
import {
	clientDSN,
	getRecaptchaPublicKey,
	getStripePublicKeys,
} from './frontendCommon';

const router = Router();

router.use(withIdentity());

router.use(async (_: Request, res: Response) => {
	const title = DEFAULT_PAGE_TITLE;
	const src = '/static/help-centre.js';

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
