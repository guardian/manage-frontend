import url from 'url';
import { Router } from 'express';
import type { Request, Response } from 'express';
import type express from 'express';
import fetch from 'node-fetch';
import { DEFAULT_PAGE_TITLE } from '../../shared/helpCentreConfig';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../shared/identity';
import { conf } from '../config';
import { html } from '../html';
import { idapiConfigPromise } from '../idapiConfig';
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

router.use('/diagnostic-information', async (req, res, next) => {
	try {
		const idapiConfig = await idapiConfigPromise;
		if (
			idapiConfig &&
			res.locals?.identity?.signInStatus === 'signedInRecently'
		) {
			const response = await fetch(
				url.format({
					protocol: 'https',
					host: 'members-data-api.' + conf.DOMAIN,
					pathname: 'user-attributes/me',
				}),
				{
					headers: {
						'X-GU-ID-Client-Access-Token':
							'Bearer ' + idapiConfig.accessToken,
						[X_GU_ID_FORWARDED_SCOPE]:
							req.header(X_GU_ID_FORWARDED_SCOPE) ||
							getScopeFromRequestPathOrEmptyString(req.path),
						Cookie: getCookiesOrEmptyString(req),
					},
				},
			);

			if (response.ok) {
				const data = await response.json();
				res.locals.userAttributes = data;
			}

			next();
		}
	} catch (err) {
		console.error('Failed to fetch user attributes', err);
		next();
	}
});

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
				userAttributes: res.locals.userAttributes,
				recaptchaPublicKey: await getRecaptchaPublicKey(),
				...(await getStripePublicKeys()),
			},
		}),
	);
});

export { router };
