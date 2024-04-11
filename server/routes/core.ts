import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import { Router } from 'express';
import { middlewareFailIfAnyAPIGatewayCredsAreMissing } from '../apiGatewayDiscovery';
import { s3TextFilePromise } from '../awsIntegration';
import { conf, Environments } from '../config';
import { log } from '../log';

const router = Router();

router.get('/csp-audit-report-endpoint', (req: Request, res: Response) => {
	log.info(`CSP_AUDIT: ${req.body}`);
	res.status(204).send();
});

router.get(
	'/_healthcheck',
	/**
	 * Fails riff-raff deployment (because ASG/ELB healthcheck fails)
	 * if the box fails to get host and API key for all the API Gateways
	 */
	middlewareFailIfAnyAPIGatewayCredsAreMissing(
		`Failed to fetch auth credentials for at least one service layer API Gateway. Healthcheck failed!`,
	),
	(_: Request, res: Response) => {
		res.send('OK - signed in');
	},
	/*
	 * NOTE: PROD currently requires access to CODE lambdas see here:
	 * https://github.com/guardian/manage-frontend/wiki/test-users
	 * and here:
	 * https://github.com/guardian/manage-frontend/wiki/Proxying-API-Gateway-Lambdas
	 * Without them this health check will fail on PROD
	 * TODO: Does this provide us with any real benefit (testing code resources in prod)?
	 */
);

router.get('/_prout', (_, res: Response) => {
	res.send(`<pre>${GIT_COMMIT_HASH}</pre>`);
});

router.get('/robots.txt', (_, res: Response) => {
	const disallowAll = 'User-agent: *\n' + 'Disallow: /\n\n';
	const allowHelpCentre =
		'User-agent: *\n' +
		'Allow: /sitemap.txt\n' +
		'Allow: /static/\n' +
		'Allow: /api/\n' +
		'Allow: /help-centre\n' +
		'Allow: /help-centre/\n' +
		'Disallow: /\n\n';
	const disallowGoogleAdsBots =
		'User-agent: AdsBot-Google\n' +
		'User-agent: AdsBot-Google-Mobile\n' +
		'Disallow: /\n\n';
	const helpCentreSitemap =
		'Sitemap: https://manage.theguardian.com/sitemap.txt\n\n';
	const prodAccessList =
		allowHelpCentre + disallowGoogleAdsBots + helpCentreSitemap;
	const preProdAccessList = disallowAll;
	const accessList =
		conf.ENVIRONMENT === Environments.AWS
			? prodAccessList
			: preProdAccessList;
	res.contentType('text/plain').send(accessList);
});

router.get('/sitemap.txt', async (_, res: Response) => {
	const bucketName = 'manage-help-content';
	const filePath = `${conf.STAGE}/sitemap.txt`;
	s3TextFilePromise(bucketName, filePath)
		.then((data) => {
			if (!data) {
				const errorMessage = `File ${filePath} was empty`;
				log.error(errorMessage);
				captureMessage(errorMessage);
			}
			const statusCode = data ? 200 : 404;
			res.status(statusCode)
				.contentType('text/plain')
				.send(data ?? []);
		})
		.catch((error) => {
			const errorMessage = `File ${filePath} not found`;
			log.error(errorMessage, error);
			captureMessage(errorMessage);
			res.status(404).send();
		});
});

/*
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Google Search Console ownership verification files.
 *
 * The current owners are listed below.
 * For each owner, please add github name and verification file.
 */

// kelvin-chappell
router.get('/google6e3510e8603d6b4c.html', (_, res: Response) => {
	res.contentType('text/html').send(
		'google-site-verification: google6e3510e8603d6b4c.html',
	);
});

/*
 * end of Google Search Console verification files
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

export { router };
