import * as Sentry from '@sentry/browser';
import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStripeKey } from '@/client/utilities/stripe';
import { STRIPE_PUBLIC_KEY_HEADER } from '@/shared/stripeSetupIntent';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { NewCardPaymentMethodDetail } from './card/NewCardPaymentMethodDetail';
import type { StripePaymentMethod as StripeCardPaymentMethod } from './card/NewCardPaymentMethodDetail';
import {
	type StripeCheckoutSession,
	StripeCheckoutSessionPaymentMethodType,
} from './card/StripeCheckoutSessionButton';
import type { NewPaymentMethodDetail } from './NewPaymentMethodDetail';
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

	const navigateToFailedPage = useCallback(
		(newPaymentMethodDetailFriendlyName?: string) => {
			navigate('../failed', {
				state: {
					newPaymentMethodDetailFriendlyName:
						newPaymentMethodDetailFriendlyName || 'Payment Method',
				},
			});
		},
		[navigate],
	);

	const obtainStripeApiKey = useCallback((): string => {
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
		return stripePublicKey || '';
	}, [productDetail]);

	const obtainCheckoutSessionDetails = useCallback(
		async (id: string): Promise<StripeCheckoutSession> => {
			const checkoutSessionResponse = await fetch(
				`/api/payment/checkout-session/${id}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						[STRIPE_PUBLIC_KEY_HEADER]: obtainStripeApiKey() ?? '',
					},
				},
			);
			return checkoutSessionResponse.json();
		},
		[obtainStripeApiKey],
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

					// Build detail
					let detail: NewPaymentMethodDetail | null = null;
					switch (paymentMethodType) {
						case StripeCheckoutSessionPaymentMethodType.Card:
							detail = new NewCardPaymentMethodDetail(
								checkoutSession?.setup_intent
									?.payment_method as StripeCardPaymentMethod,
								obtainStripeApiKey(),
							);
							break;
						default:
							Sentry.captureException(
								'Payment Method Type processing not implemented',
								{
									extra: {
										paymentMethodType,
									},
								},
							);
							navigateToFailedPage();
					}

					// Validate detail
					if (!detail) {
						Sentry.captureException(
							'Failed to build Payment Method Details',
							{
								extra: {
									sessionId,
								},
							},
						);
						navigateToFailedPage();
					}

					// Execute Payment Update
					navigate('../', {
						state: {
							newPaymentMethodDetail: detail,
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
		navigate,
		navigateToFailedPage,
		obtainCheckoutSessionDetails,
		obtainStripeApiKey,
	]);

	return sessionId && paymentMethodType ? (
		<DefaultLoadingView loadingMessage="Obtaining payment method information..." />
	) : null;
};
