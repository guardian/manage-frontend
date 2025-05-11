import { captureMessage } from '@sentry/node';
import type { Request, Response } from 'express';
import { s3ConfigPromise } from './awsIntegration';

interface BrazeSdkConfig {
	apiKey: string;
	sdkEndpoint: string;
}

const brazeSdkConfigPromise = s3ConfigPromise<BrazeSdkConfig>()('braze-sdk');

export const brazeSdkDetailsHandler = async (_: Request, res: Response) => {
	brazeSdkConfigPromise
		.then((brazeSdkConfig) => {
			if (brazeSdkConfig?.apiKey && brazeSdkConfig.sdkEndpoint) {
				res.json(brazeSdkConfig);
			} else {
				captureMessage(
					'Braze sdk config file did not contain expected properties',
				);
				res.sendStatus(500);
			}
		})
		.catch((err) => {
			captureMessage(`Braze sdk config file load failed: ${err}`);
			res.sendStatus(500);
		});
};
