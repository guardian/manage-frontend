import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import type { PaymentMethod } from '@stripe/stripe-js';
import { useState } from 'react';
import type { StripeCreateCheckoutSessionRequest } from '@/shared/requests/stripe-create-checkout-session';
import { STRIPE_PUBLIC_KEY_HEADER } from '../../../../../shared/stripeSetupIntent';
import { LoadingCircleIcon } from '../../shared/assets/LoadingCircleIcon';

export enum StripeCheckoutSessionPaymentMethodType {
	Card = 'card',
}

export interface StripeCheckoutSessionButtonProps {
	stripeApiKey: string;
	productTypeUrlPart: string;
	paymentMethodType: StripeCheckoutSessionPaymentMethodType;
	subscriptionId: string;
}

/**
 * https://docs.stripe.com/api/checkout/sessions/object
 */
export interface StripeCheckoutSession {
	id: string;
	url?: string;

	/**
	 * https://docs.stripe.com/api/setup_intents/object
	 */
	setup_intent?: {
		/**
		 * https://docs.stripe.com/api/payment_methods/object
		 */
		payment_method?: PaymentMethod;
	};
}

export const StripeCheckoutSessionButton = (
	props: StripeCheckoutSessionButtonProps,
) => {
	const [preparingCheckout, setPreparingCheckout] = useState<boolean>(false);

	const loadSetupIntent = () => {
		// Start loading
		setPreparingCheckout(true);

		// Create Checkout Session on the server
		const body: StripeCreateCheckoutSessionRequest = {
			paymentMethodType: props.paymentMethodType,
			productTypeUrlPart: props.productTypeUrlPart,
			subscriptionId: props.subscriptionId,
		};
		fetch('/api/payment/checkout-session', {
			method: 'POST',
			credentials: 'include',
			headers: {
				[STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey,
			},
			body: JSON.stringify(body),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(
						`Failed to create CheckoutSession : ${
							response.status
						} ${
							response.statusText
							// eslint-disable-next-line @typescript-eslint/no-base-to-string -- we believe this function will not evaluate to '[object Object'
						} : ${response.text()}`,
					);
				}
			})
			.then((checkoutSession: StripeCheckoutSession) => {
				// Redirect to Checkout
				window.location.href = checkoutSession.url ?? '/';
			})
			.catch((error) => {
				Sentry.captureException(error);
				setPreparingCheckout(false);
			});
	};

	return (
		<Button
			disabled={preparingCheckout}
			priority="primary"
			onClick={() => {
				// Load the setup intent
				loadSetupIntent();
			}}
			icon={
				preparingCheckout ? (
					<LoadingCircleIcon
						additionalCss={css`
							padding: 3px;
						`}
					/>
				) : (
					<SvgArrowRightStraight />
				)
			}
			iconSide="right"
			cssOverrides={css`
				margin-top: ${space[4]}px;
				margin-bottom: ${space[9]}px;
			`}
		>
			Update payment method
		</Button>
	);
};
