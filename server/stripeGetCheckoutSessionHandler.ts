import * as Sentry from '@sentry/node';
import type express from 'express';
import fetch from 'node-fetch';
import { STRIPE_PUBLIC_KEY_HEADER } from '../shared/stripeSetupIntent';
import { log, putMetric } from './log';
import { stripeSetupIntentConfigPromise } from './stripeSetupIntentConfig';

export const stripeGetCheckoutSessionHandler = async (
	request: express.Request,
	response: express.Response,
) => {
	// Read the 'id' path parameter
	const checkoutSessionId = request.params.id;
	if (!checkoutSessionId) {
		response.status(400).send('missing checkout session id');
		return;
	}

	// Get Stripe Secret Key
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
			const httpMethod = 'GET';
			const outgoingURL = `https://api.stripe.com/v1/checkout/sessions/${checkoutSessionId}?expand[]=setup_intent.payment_method`;

			// tslint:disable-next-line:no-object-mutation
			response.locals.loggingDetail = {
				loggingCode: 'STRIPE_CHECKOUT_SESSION',
				stripePublicKey, // this will indicate 'test mode' vs 'live'
				httpMethod,
				identityID:
					response.locals.identity && response.locals.identity.userId,
				incomingURL: request.originalUrl,
				checkoutSessionId,
				outgoingURL,
			};

			fetch(outgoingURL, {
				method: httpMethod,
				headers: {
					Authorization: `Bearer ${stripeSecretKey}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
				.then((stripeResponse) => {
					// tslint:disable-next-line:no-object-mutation
					response.locals.loggingDetail.status =
						stripeResponse.status;
					// tslint:disable-next-line:no-object-mutation
					response.locals.loggingDetail.isOK = stripeResponse.ok;

					if (stripeResponse.ok) {
						return stripeResponse.json();
					} else {
						throw new Error(
							`Failed to get CheckoutSession ${checkoutSessionId} : ${
								stripeResponse.status
							} ${
								stripeResponse.statusText
								// eslint-disable-next-line @typescript-eslint/no-base-to-string -- we believe this function will not evaluate to '[object Object'
							} : ${stripeResponse.text()}`,
						);
					}
				})
				.then((checkoutSession) => {
					const suitableLog = response.locals.loggingDetail.isOK
						? log.info
						: log.warning;
					suitableLog('fetching', response.locals.loggingDetail);
					putMetric(response.locals.loggingDetail);
					response.json(checkoutSession);
				})
				.catch(handleTerminalError(response));
		})
		.catch(handleTerminalError(response));
};

const handleTerminalError = (response: express.Response) => (error: Error) => {
	Sentry.captureException(error);
	log.error('Failed to create CheckoutSession', {
		...response.locals.loggingDetail,
		exception: error || 'undefined',
	});
	putMetric(response.locals.loggingDetail);
	response.status(500).send();
};
