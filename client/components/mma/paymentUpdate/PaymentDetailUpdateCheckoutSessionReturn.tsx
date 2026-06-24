import * as Sentry from '@sentry/browser';
import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStripeKeyByProduct } from '@/client/utilities/stripe';
import { STRIPE_PUBLIC_KEY_HEADER } from '@/shared/stripeSetupIntent';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import {
	type StripeCheckoutSession,
	StripeCheckoutSessionPaymentMethodType,
} from './card/StripeCheckoutSessionButton';
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
	const paymentMethodType = queryParams.get('paymentMethodType'); // Read the 'paymentMethodType' query parameter

	const getNewPaymentMethodDetailFriendlyNameFromPaymentMethodType =
		useCallback((): string => {
			switch (paymentMethodType) {
				case StripeCheckoutSessionPaymentMethodType.Card:
					return 'Credit Card';
				default:
					// A default designation that fits the current copywriting
					return 'Payment Method';
			}
		}, [paymentMethodType]);

	const navigateToFailedPage = useCallback(() => {
		navigate('../failed', {
			state: {
				newPaymentMethodDetailFriendlyName:
					getNewPaymentMethodDetailFriendlyNameFromPaymentMethodType(),
				productDetail,
			},
		});
	}, [
		navigate,
		getNewPaymentMethodDetailFriendlyNameFromPaymentMethodType,
		productDetail,
	]);

	const obtainCheckoutSessionDetails = useCallback(
		async (id: string): Promise<StripeCheckoutSession> => {
			const checkoutSessionResponse = await fetch(
				`/api/payment/checkout-session/${id}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						[STRIPE_PUBLIC_KEY_HEADER]:
							getStripeKeyByProduct(productDetail) ?? '',
					},
				},
			);
			return checkoutSessionResponse.json();
		},
		[productDetail],
	);

	useEffect(() => {
		if (sessionId) {
			obtainCheckoutSessionDetails(sessionId)
				.then((checkoutSession: StripeCheckoutSession) => {
					// Validate Checkout Session Payment Method
					if (!checkoutSession.setup_intent?.payment_method) {
						Sentry.captureException(
							'Failed to load Payment Method Details',
							{
								extra: {
									sessionId,
								},
							},
						);
						navigateToFailedPage();
					}

					// Validate Payment Method Type
					if (
						!Object.values(
							StripeCheckoutSessionPaymentMethodType,
						).includes(
							paymentMethodType as StripeCheckoutSessionPaymentMethodType,
						)
					) {
						Sentry.captureException('Invalid Payment Method Type', {
							extra: {
								paymentMethodType,
							},
						});
						navigateToFailedPage();
					}

					// Execute Payment Update
					navigate('../', {
						state: {
							paymentMethodInfo:
								checkoutSession?.setup_intent?.payment_method,
							paymentMethodType,
							productDetail,
						},
					});
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
	}, [
		sessionId,
		paymentMethodType,
		productDetail,
		navigate,
		navigateToFailedPage,
		obtainCheckoutSessionDetails,
	]);

	return sessionId && paymentMethodType ? (
		<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
	) : null;
};
