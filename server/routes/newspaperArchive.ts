import { Router } from 'express';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { z } from 'zod';
import { authorizationOrCookieHeader } from '../apiProxy';
import { s3ConfigPromise } from '../awsIntegration';
import { conf } from '../config';
import { log, putMetric } from '../log';
import { withIdentity } from '../middleware/identityMiddleware';

type NewspapersRequestBody = {
	expires?: number; // defaults to 24 hours
	'query-string'?: string;
};

// { url: "https://<subdomain>.newspapers.com/…?tpa=<token>" }
const NewspapersResponseSchema = z.object({
	url: z.string(),
});

const userBenefitsSchema = z.object({
	benefits: z.array(z.string()),
});

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

router.use(withIdentity(401, true));

router.get('/auth', async (req: Request, res: Response) => {
	try {
		const config = await newspaperArchiveConfigPromise;
		const authString = config?.authString;
		if (authString === undefined) {
			log.error(`Missing newspaper archive auth key`);
			return res.sendStatus(500);
		}

		console.log('Checking supporter entitlement');
		const hasCorrectEntitlement = await checkSupporterEntitlement(req);

		if (!hasCorrectEntitlement) {
			// ToDo: show the user an error/info page
			console.log('User does not have the newspaper archive entitlement');
			return res.redirect('/');
		}

		console.log('User has the newspaper archive entitlement');
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

		const responseJson = NewspapersResponseSchema.parse(
			await response.json(),
		);

		const archiveReturnUrlString = req.query['ncom-return-url'];
		if (
			archiveReturnUrlString &&
			typeof archiveReturnUrlString === 'string'
		) {
			putMetric({
				loggingCode: 'REDIRECT_FROM_NEWSPAPERS_COM',
				isOK: true,
			});
			const tpaToken = new URL(responseJson.url).searchParams.get('tpa');

			const archiveReturnUrl = new URL(archiveReturnUrlString);

			if (archiveReturnUrl.hostname !== 'theguardian.newspapers.com') {
				log.error('Invalid ncom return URL hostname');
				return res.redirect(responseJson.url);
			}

			archiveReturnUrl.searchParams.set('tpa', tpaToken ?? '');
			return res.redirect(archiveReturnUrl.toString());
		}

		return res.redirect(responseJson.url);
	} catch (e) {
		log.error(
			`Something went wrong authenticating with newspapers.com. ${e}`,
		);
		return res.sendStatus(500);
	}
});

export { router };

async function checkSupporterEntitlement(req: Request): Promise<boolean> {
	const json = await getSupporterStatus(req).then((res) => res.json());
	const supporterAttributes = userBenefitsSchema.parse(json);
	return supporterAttributes.benefits.includes('newspaperArchive');
}

async function getSupporterStatus(req: Request) {
	const host = 'user-benefits.' + conf.API_DOMAIN;

	return fetch(`https://${host}/benefits/me`, {
		method: 'GET',
		headers: {
			...(await authorizationOrCookieHeader({ req, host })),
		},
	});
}
