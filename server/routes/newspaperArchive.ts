import { Router } from 'express';
import type { Request, Response } from 'express';
import fetch from 'node-fetch';
import { withIdentity } from '../middleware/identityMiddleware';

function base64(input: string) {
	return Buffer.from(input).toString('base64');
}

const router = Router();
router.use(withIdentity(401));

router.get('/auth', async (_req: Request, res: Response) => {
	const subdomain = 'theguardian';
	const authKey = process.env.newspaperArchive;
	const authHeader = base64(`${subdomain}:${authKey}`);
	const requestBody = {
		expires: 86400, // optional, defaults to 24 hours,
		'query-string':
			'xid=1234&utm_campaign=awesome-campaign&utm_medium=referral&utm_source=editorial&utm_content=&utm_term=',
	};

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
	); // { url: "https://<subdomain>.newspapers.com/…?tpa=<token>" }

	const responseJson = await response.json();
	res.redirect(responseJson.url);
});

export { router };
