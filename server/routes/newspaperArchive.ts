import { Router } from 'express';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { X_GU_ID_FORWARDED_SCOPE } from '@/shared/identity';
import { authorizationOrCookieHeader } from '../apiProxy';
import { s3ConfigPromise } from '../awsIntegration';
import { log } from '../log';
import { withIdentity } from '../middleware/identityMiddleware';

type NewspapersRequestBody = {
	expires?: number; // defaults to 24 hours
	'query-string'?: string;
};

// { url: "https://<subdomain>.newspapers.com/…?tpa=<token>" }
type NewspapersResponseBody = {
	url: string;
};

type NewspaperArchiveConfig = {
	authString: string;
};

function base64(input: string) {
	return Buffer.from(input).toString('base64');
}

const newspaperArchiveConfigPromise: Promise<
	NewspaperArchiveConfig | undefined
> = s3ConfigPromise<NewspaperArchiveConfig>('authString')('newspaper-archive');

const router = Router();

router.use(withIdentity(401));

router.get('/auth', async (req: Request, res: Response) => {
	const config = await newspaperArchiveConfigPromise;
	const authString = config?.authString;
	if (authString === undefined) {
		log.error(`Missing newspaper archive auth key`);
		res.status(500).send();
	}

	console.log('start', new Date().toTimeString());
	const hasCorrectProduct = await checkSupporterStatus(req);

	console.log(hasCorrectProduct);
	if (!hasCorrectProduct) {
		return res.redirect('/');
	}

	const authHeader = base64(`${authString}`);
	const requestBody: NewspapersRequestBody = {};

	const response = await fetch(
		'https://www.newspapers.com/api/userauth/public/get-tpa-token',
		{
			headers: {
				Authorization: `Basic ${authHeader}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(requestBody),
		},
	);

	const responseJson = (await response.json()) as NewspapersResponseBody;

	const archiveReturnUrlString = req.query['ncom-return-url'];
	if (archiveReturnUrlString && typeof archiveReturnUrlString === 'string') {
		const tpaToken = new URL(responseJson.url).searchParams.get('tpa');

		const archiveReturnUrl = new URL(archiveReturnUrlString);
		archiveReturnUrl.searchParams.set('tpa', tpaToken ?? '');
		return res.redirect(archiveReturnUrl.toString());
	}

	return res.redirect(responseJson.url);
});

export { router };

async function checkSupporterStatus(req: Request): Promise<boolean> {
	console.log('checking');
	const supporterAttributesResponse = await getSupporterStatus(req);
	console.log('supporterAttributesResponse', supporterAttributesResponse);
	// const supporterAttributes = await supporterAttributesResponse.json();
	// console.log('supporterAttributes', supporterAttributes);
	return true;
	// return (
	// 	supporterAttributes.contentAccess['guardianWeeklySubscriber'] &&
	// 	supporterAttributes.contentAccess['supporterPlus']
	// );
}

async function getSupporterStatus(req: Request) {
	const host = 'members-data-api.';
	const domain = 'code.dev-theguardian.com';

	return fetch(`https://${host}${domain}/user-attributes/me`, {
		method: 'GET',
		headers: {
			...(await authorizationOrCookieHeader({ req, host })),
			'Content-Type': 'application/json',
			[X_GU_ID_FORWARDED_SCOPE]:
				req.header(X_GU_ID_FORWARDED_SCOPE) || '',
		},
	});
}
