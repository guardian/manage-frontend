import * as Sentry from '@sentry/node';
import type express from 'express';
import fetch from 'node-fetch';
import { STRIPE_PUBLIC_KEY_HEADER } from '../shared/stripeSetupIntent';
import { conf } from './config';
import { log, putMetric } from './log';
import { stripeSetupIntentConfigPromise } from './stripeSetupIntentConfig';

export const stripeCreateCheckoutSessionHandler = async (
	request: express.Request,
	response: express.Response,
) => {
	// Read Request JSON Body
	const clientRequestBodyData = request.body.toString();
	if (!clientRequestBodyData) {
		response.status(400).send('missing request body');
		return;
	}

	// Map request
	const clientRequestBody: {
		paymentMethodType: 'card';
		productTypeUrlPart: string;
	} = JSON.parse(clientRequestBodyData);

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

			const httpMethod = 'POST';
			const outgoingURL = 'https://api.stripe.com/v1/checkout/sessions';
			const requestBody = new URLSearchParams({
				mode: 'setup',
				success_url: `https://manage.${conf.DOMAIN}/payment/${clientRequestBody.productTypeUrlPart}/checkout-session-return?id={CHECKOUT_SESSION_ID}&paymentMethodType=${clientRequestBody.paymentMethodType}`,
				cancel_url: `https://manage.${conf.DOMAIN}/payment/${clientRequestBody.productTypeUrlPart}`,
				'payment_method_types[0]': clientRequestBody.paymentMethodType,
				/**
				 * https://docs.stripe.com/api/checkout/sessions/create?lang=php#create_checkout_session-customer_email
				 */
				customer_email: response.locals.identity?.email || '',
			}).toString();

			// tslint:disable-next-line:no-object-mutation
			response.locals.loggingDetail = {
				loggingCode: 'STRIPE_CHECKOUT_SESSION',
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
					response.locals.loggingDetail.isOK = stripeResponse.ok;

					if (stripeResponse.ok) {
						return stripeResponse.json();
					} else {
						throw new Error(
							`Failed to create CheckoutSession : ${
								stripeResponse.status
							} ${
								stripeResponse.statusText
								// eslint-disable-next-line @typescript-eslint/no-base-to-string -- we believe this function will not evaluate to '[object Object'
							} : ${stripeResponse.text()}`,
						);
					}
				})
				.then((checkoutSession: { id: string; url: string }) => {
					const suitableLog = response.locals.loggingDetail.isOK
						? log.info
						: log.warning;
					suitableLog('fetching', response.locals.loggingDetail);
					putMetric(response.locals.loggingDetail);
					response.json({
						id: checkoutSession.id,
						url: checkoutSession.url,
					});
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
