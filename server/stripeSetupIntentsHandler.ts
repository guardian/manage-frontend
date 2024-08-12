import * as Sentry from '@sentry/node';
import type express from 'express';
import fetch from 'node-fetch';
import type { StripeSetupIntent } from '../shared/stripeSetupIntent';
import { STRIPE_PUBLIC_KEY_HEADER } from '../shared/stripeSetupIntent';
import { log, putMetric } from './log';
import { recaptchaConfigPromise } from './recaptchaConfig';
import { stripeSetupIntentConfigPromise } from './stripeSetupIntentConfig';

export const stripeSetupIntentHandler = async (
	request: express.Request,
	response: express.Response,
) => {
	const recaptchaOneTimeToken = request.body.toString();
	const recaptchaSecret = (await recaptchaConfigPromise)?.secretKey;
	const recaptchaResult = await (
		await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `secret=${recaptchaSecret}&response=${recaptchaOneTimeToken}`,
		})
	).json();

	if (!recaptchaResult?.success) {
		const loggingDetail = {
			loggingCode: 'RECAPTURE_FAILURE',
			recaptchaResult,
		};
		log.error('failed server-side reCaptcha verification', loggingDetail);
		putMetric({
			...loggingDetail,
			isOK: false,
		});
		response.status(400).send('reCaptcha missing/failed');
		return;
	}

	stripeSetupIntentConfigPromise
		.then((stripePublicToSecretKeyMapping) => {
			if (!stripePublicToSecretKeyMapping) {
				throw new Error('missing Stripe SetupIntent config');
			}
			const stripePublicKey = request.header(STRIPE_PUBLIC_KEY_HEADER);
			if (!stripePublicKey) {
				response
					.status(400)
					.send(`missing header '${STRIPE_PUBLIC_KEY_HEADER}'`);
				return;
			}
			const stripeSecretKey =
				stripePublicToSecretKeyMapping[stripePublicKey];
			if (!stripeSecretKey) {
				throw new Error(
					`no secret key mapping for Stripe public key '${stripePublicKey}'`,
				);
			}

			const httpMethod = request.method;
			const outgoingURL = 'https://api.stripe.com/v1/setup_intents'; // using URL rather than stripe library due to missing type defs
			const requestBody = 'usage=off_session';

			// tslint:disable-next-line:no-object-mutation
			response.locals.loggingDetail = {
				loggingCode: 'STRIPE_SETUP_INTENT',
				stripePublicKey, // this will indicate 'test mode' vs 'live'
				httpMethod,
				identityID:
					response.locals.identity && response.locals.identity.userId,
				incomingURL: request.originalUrl,
				requestBody,
				outgoingURL,
			};

			fetch(outgoingURL, {
				method: httpMethod,
				headers: {
					Authorization: `Bearer ${stripeSecretKey}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: requestBody,
			})
				.then((stripeResponse) => {
					// tslint:disable-next-line:no-object-mutation
					response.locals.loggingDetail.status =
						stripeResponse.status;
					// tslint:disable-next-line:no-object-mutation
					console.log('stripeSetuoIntents');
					console.log(JSON.stringify(response));
					response.locals.loggingDetail.isOK = stripeResponse.ok;

					if (stripeResponse.ok) {
						return stripeResponse.json();
					} else {
						throw new Error(
							`Failed to load SetupIntent : ${
								stripeResponse.status
							} ${
								stripeResponse.statusText
								// eslint-disable-next-line @typescript-eslint/no-base-to-string -- we believe this function will not evaluate to '[object Object'
							} : ${stripeResponse.text()}`,
						);
					}
				})
				.then((setupIntent: StripeSetupIntent) => {
					console.log('setupIntent');
					console.log(JSON.stringify(response));
					const suitableLog = response.locals.loggingDetail.isOK
						? log.info
						: log.warning;
					suitableLog('fetching', response.locals.loggingDetail);
					putMetric(response.locals.loggingDetail);
					response.json({
						id: setupIntent.id,
						client_secret: setupIntent.client_secret,
					});
				})
				.catch(handleTerminalError(response));
		})
		.catch(handleTerminalError(response));
};

const handleTerminalError = (response: express.Response) => (error: Error) => {
	Sentry.captureException(error);
	log.error('Failed to create SetupIntent', {
		...response.locals.loggingDetail,
		exception: error || 'undefined',
	});
	putMetric(response.locals.loggingDetail);
	response.status(500).send();
};
