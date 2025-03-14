import * as Sentry from '@sentry/browser';
import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStripeKey } from '@/client/utilities/stripe';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import type { PaymentUpdateContextInterface } from './PaymentDetailUpdateContainer';
import { PaymentUpdateContext } from './PaymentDetailUpdateContainer';

export const PaymentDetailUpdateCheckoutSessionReturn = () => {
	const { productDetail } = useContext(
		PaymentUpdateContext,
	) as PaymentUpdateContextInterface;
	const navigate = useNavigate();
	const location = useLocation();

	// Parse the query parameters
	const queryParams = new URLSearchParams(location.search);
	const sessionId = queryParams.get('id'); // Read the 'session_id' query parameter

	const navigateToFailedPage = useCallback(() => {
		navigate('../failed', {
			state: {
				newPaymentMethodDetailFriendlyName: 'Payment Method',
			},
		});
	}, [navigate]);

	const obtainCheckoutSessionDetails = useCallback(
		async (id: string): Promise<void> => {
			// const checkoutSessionResponse = await fetch(
			// 	`/api/payment/checkout-session/${id}`,
			// 	{
			// 		method: 'GET',
			// 		credentials: 'include',
			// 		headers: {
			// 			[STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey,
			// 		},
			// 	},
			// );
			// #region Get Stripe Secret Key
			let stripePublicKey: string | undefined;
			if (productDetail.subscription.card) {
				stripePublicKey =
					productDetail.subscription.card.stripePublicKeyForUpdate;
			} else {
				stripePublicKey = getStripeKey(
					productDetail.billingCountry ||
						productDetail.subscription.deliveryAddress?.country,
					productDetail.isTestUser,
				);
			}
			// #endregion

			console.log('id', id);
			console.log('stripePublicKey', stripePublicKey);
			throw new Error('ola');
		},
		[productDetail],
	);

	useEffect(() => {
		if (sessionId) {
			obtainCheckoutSessionDetails(sessionId)
				.then(() => {
					console.log('Checkout Session Details Loaded');
				})
				.catch(() => {
					Sentry.captureException(
						'Failed to load Checkout Session Details',
						{
							extra: {
								sessionId,
							},
						},
					);
					navigateToFailedPage();
				});
		} else {
			navigateToFailedPage();
		}
	}, [sessionId, navigateToFailedPage, obtainCheckoutSessionDetails]);

	return sessionId ? (
		<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
	) : null;
};
