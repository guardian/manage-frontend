import * as Sentry from '@sentry/node';
import { conf, Environments } from '../config';
import { log } from '../log';
import { recaptchaConfigPromise } from '../recaptchaConfig';
import { stripePublicKeysPromise } from '../stripeSetupIntentConfig';

export const clientDSN =
	conf.ENVIRONMENT === Environments.AWS && conf.CLIENT_DSN
		? conf.CLIENT_DSN
		: null;
if (conf.ENVIRONMENT === Environments.AWS && !conf.CLIENT_DSN) {
	log.error('NO SENTRY IN CLIENT PROD!');
}

export const getRecaptchaPublicKey = async () => {
	try {
		let recaptchaPublicKey: string | undefined;

		if (conf.ENVIRONMENT === Environments.DEVELOPMENT) {
			recaptchaPublicKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
		} else {
			const recaptchaConfig = await recaptchaConfigPromise;
			recaptchaPublicKey = recaptchaConfig?.publicKey;
		}

		//
		// const recaptchaConfig = await recaptchaConfigPromise;
		// const recaptchaPublicKey: string | undefined = recaptchaConfig?.publicKey;
		//

		if (!recaptchaPublicKey) {
			throw new Error(`recaptcha public key is '${recaptchaPublicKey}'`);
		}

		return recaptchaPublicKey;
	} catch (err) {
		log.error(
			'could not provide recaptcha public key to client, client-side errors will ensue',
			err,
		);
		Sentry.captureException(err);
		return;
	}
};

export const getStripePublicKeys = async () => {
	try {
		const stripePublicKeys = await stripePublicKeysPromise;

		if (!stripePublicKeys) {
			throw new Error(`stripe public key is '${stripePublicKeys}'`);
		}

		return stripePublicKeys;
	} catch (err) {
		log.error(
			'could not provide stripe public key to client, client-side errors may ensue when attempting to switch to card payment method',
			err,
		);
		Sentry.captureException(err);
		return;
	}
};
