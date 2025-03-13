import { css } from '@emotion/react';
import { Button, SvgExternal } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import { STRIPE_PUBLIC_KEY_HEADER } from '../../../../../shared/stripeSetupIntent';
import { LoadingCircleIcon } from '../../shared/assets/LoadingCircleIcon';

export interface StripeCheckoutSessionButtonProps {
	stripeApiKey: string;
	productTypeUrlPart: string;
}

interface StripeCheckoutSession {
	id: string;
	url: string;
}

export const StripeCheckoutSessionButton = (
	props: StripeCheckoutSessionButtonProps,
) => {
	const [preparingCheckout, setPreparingCheckout] = useState<boolean>(false);
	const [, setPreparingCheckoutError] = useState<Error | null>(null);

	const loadSetupIntent = () => {
		// Start loading
		setPreparingCheckout(true);
		setPreparingCheckoutError(null);

		// Create Checkout Session on the server
		fetch('/api/payment/checkout-session', {
			method: 'POST',
			credentials: 'include',
			headers: {
				[STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey,
			},
			body: JSON.stringify({
				paymentMethodTypes: ['card'],
				productTypeUrlPart: props.productTypeUrlPart,
			}),
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
				window.location.href = checkoutSession.url;
			})
			.catch((error) => {
				Sentry.captureException(error);
				setPreparingCheckoutError(error);
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
					<SvgExternal />
				)
			}
			iconSide="right"
			cssOverrides={css`
				margin-top: 16px;
				margin-bottom: 36px;
			`}
		>
			Update payment method
		</Button>
	);
};
