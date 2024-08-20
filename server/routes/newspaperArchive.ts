import { Router } from 'express';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
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
	authKey: string;
};

function base64(input: string) {
	return Buffer.from(input).toString('base64');
}

export const newspaperArchiveConfigPromise: Promise<
	NewspaperArchiveConfig | undefined
> = s3ConfigPromise<NewspaperArchiveConfig>('authKey')('newspaper-archive');

let authKey: string;

const router = Router();

router.use(withIdentity(401));

router.get('/auth', async (_req: Request, res: Response) => {
	const subdomain = 'theguardian';

	if (authKey === undefined) {
		const config = await newspaperArchiveConfigPromise;

		if (config?.authKey !== undefined) {
			authKey = config?.authKey;
		} else {
			log.error(`Missing newspaper archive auth key`);
			res.status(500).send();
		}
	}

	const authHeader = base64(`${subdomain}:${authKey}`);
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
	res.redirect(responseJson.url);
});

export { router };
