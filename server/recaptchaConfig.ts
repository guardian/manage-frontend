import { s3FilePromise } from './awsIntegration';
import { conf } from './config';

interface ReCaptchaKeys {
	publicKey: string;
	secretKey: string;
}

export const recaptchaConfigPromise = s3FilePromise<ReCaptchaKeys>(
	'gu-reader-revenue-private',
	`manage-frontend/${conf.STAGE}/recaptcha-${conf.STAGE}.json`,
);
