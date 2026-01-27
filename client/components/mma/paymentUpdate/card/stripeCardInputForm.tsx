import { css } from '@emotion/react';
import { space, until } from '@guardian/source/foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import * as Sentry from '@sentry/browser';
import {
	CardNumberElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import type { StripeElementBase } from '@stripe/stripe-js';
import { useState } from 'react';
import type { StripeSetupIntent } from '../../../../../shared/stripeSetupIntent';
import { STRIPE_PUBLIC_KEY_HEADER } from '../../../../../shared/stripeSetupIntent';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { LoadingCircleIcon } from '../../shared/assets/LoadingCircleIcon';
import type { CardInputFormProps } from './CardInputForm';
import { FlexCardElement } from './FlexCardElement';
import type { StripePaymentMethod } from './NewCardPaymentMethodDetail';
import { NewCardPaymentMethodDetail } from './NewCardPaymentMethodDetail';
import { Recaptcha } from './Recaptcha';

interface StripeSetupIntentDetails {
	stripeSetupIntent?: StripeSetupIntent;
	stripeSetupIntentError?: Error;
}

interface StripeCardInputFormProps
	extends CardInputFormProps,
		StripeSetupIntentDetails {}

interface StripeInputFormError {
	code?: string;
	message?: string;
	type?: string;
}

export const StripeCardInputForm = (props: StripeCardInputFormProps) => {
	const [isValidating, setIsValidating] = useState<boolean>(false);
	const [stripeSetupIntent, setStripeSetupIntent] =
		useState<StripeSetupIntent | null>();
	const [stripeSetupIntentError, setStripeSetupIntentError] =
		useState<Error>();

	const [cardNumberElement, setCardNumberElement] = useState<
		undefined | StripeElementBase
	>();
	const [cardExpiryElement, setCardExpiryElement] = useState<
		undefined | StripeElementBase
	>();
	const [cardCVCElement, setCardCVCElement] = useState<
		undefined | StripeElementBase
	>();

	const [error, setError] = useState<StripeInputFormError>({});
	const elements = useElements();
	const stripe = useStripe();

	const [recaptchaToken, setRecaptchaToken] = useState<string | undefined>(
		undefined,
	);

	const cardFormIsLoaded = () => {
		return (
			stripe && cardNumberElement && cardExpiryElement && cardCVCElement
		);
	};

	const renderError = () => {
		if (error && error.message) {
			return error.message
				.split('.')
				.filter((_) => _.trim().length)
				.map((sentence, index) => {
					const sentenceEnd = sentence.includes('.') ? '' : '.';

					return (
						<div
							key={index}
							css={css`
								margin-top: ${space[4]}px;

								:first-of-type {
									margin-top: 0;
								}
							`}
						>
							<ErrorSummary message={sentence + sentenceEnd} />
						</div>
					);
				});
		} else {
			return null;
		}
	};

	const loadSetupIntent = (): Promise<StripeSetupIntent | null> =>
		fetch('/api/payment/card', {
			method: 'POST',
			credentials: 'include',
			headers: {
				[STRIPE_PUBLIC_KEY_HEADER]: props.stripeApiKey,
			},
			body: recaptchaToken,
		})
			.then(async (response) => {
				if (response.ok) {
					return await response.json();
				}

				const locationHeaderValue = response.headers.get('Location');
				if (response.status === 401 && locationHeaderValue) {
					window.location.replace(locationHeaderValue);
					return null;
				} else {
					throw new Error(
						`Failed to load SetupIntent : ${response.status} ${
							response.statusText
						} : ${await response.text()}`,
					);
				}
			})
			.then((setupIntent: StripeSetupIntent) => setupIntent)
			.catch((error) => {
				Sentry.captureException(error);
				setStripeSetupIntentError(error);
				return null;
			});

	async function startCardUpdate() {
		setIsValidating(true);

		const cardElement = elements?.getElement(CardNumberElement);

		if (!cardElement) {
			Sentry.captureException('StripeElements returning null');
			setError({
				message:
					'Something went wrong, please check the details and try again.',
			});
			setIsValidating(false);
			return;
		}

		if (!recaptchaToken) {
			setIsValidating(false);
			setError({ message: 'Recaptcha has not been completed' });
			return;
		}

		// new recaptcha token needed with each call to create a setup intent
		let setupIntent;

		if (!stripeSetupIntent) {
			setupIntent = await loadSetupIntent();
			setStripeSetupIntent(setupIntent);
		} else {
			setupIntent = stripeSetupIntent;
		}

		if (stripe && setupIntent) {
			const createPaymentMethodResult = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement,
				billing_details: {
					name: props.userEmail,
					email: props.userEmail,
				},
			});

			if (
				!(
					createPaymentMethodResult &&
					createPaymentMethodResult.paymentMethod &&
					createPaymentMethodResult.paymentMethod.id &&
					createPaymentMethodResult.paymentMethod.card &&
					createPaymentMethodResult.paymentMethod.card.brand &&
					createPaymentMethodResult.paymentMethod.card.last4
				)
			) {
				const stripeError = createPaymentMethodResult.error;
				if (stripeError) {
					Sentry.captureException(
						new Error(
							`Stripe createPaymentMethod failed: ${stripeError.message}`,
						),
						{
							extra: {
								code: stripeError.code,
								decline_code: stripeError.decline_code,
								type: stripeError.type,
								doc_url: stripeError.doc_url,
							},
						},
					);
				} else {
					Sentry.captureException(
						new Error(
							'Something missing from the createPaymentMethod response',
						),
					);
				}
				setError(
					createPaymentMethodResult.error || {
						message:
							'Something went wrong, please check the details and try again.',
					},
				);
				setIsValidating(false);
				return;
			}

			const intentResult = await stripe.confirmCardSetup(
				setupIntent.client_secret,
				{ payment_method: createPaymentMethodResult.paymentMethod.id },
			);

			if (
				intentResult.setupIntent &&
				intentResult.setupIntent.status &&
				intentResult.setupIntent.status === 'succeeded'
			) {
				setIsValidating(false);

				const newPaymentMethodDetail = new NewCardPaymentMethodDetail(
					createPaymentMethodResult.paymentMethod as StripePaymentMethod,
					props.stripeApiKey,
				);

				props.newPaymentMethodDetailUpdater(newPaymentMethodDetail);
				props.executePaymentUpdate(newPaymentMethodDetail);
			} else {
				const stripeError = intentResult.error;
				if (stripeError) {
					Sentry.captureException(
						new Error(
							`Stripe confirmCardSetup failed: ${stripeError.message}`,
						),
						{
							extra: {
								code: stripeError.code,
								decline_code: stripeError.decline_code,
								type: stripeError.type,
								doc_url: stripeError.doc_url,
							},
						},
					);
				} else {
					Sentry.captureException(
						new Error(
							'Something missing from the SetupIntent response',
						),
					);
				}
				setError(
					intentResult.error || {
						message:
							'Something went wrong, please check the details and try again.',
					},
				);
				setIsValidating(false);
			}
		}
	}

	return stripeSetupIntentError ? (
		<GenericErrorScreen loggingMessage={'error loading SetupIntent'} />
	) : (
		<>
			<FlexCardElement
				setCardNumberElement={setCardNumberElement}
				setCardExpiryElement={setCardExpiryElement}
				setCardCVCElement={setCardCVCElement}
			/>

			<Recaptcha
				setRecaptchaToken={setRecaptchaToken}
				setStripeSetupIntent={setStripeSetupIntent}
			/>

			<div
				css={{
					marginBottom: `${space[12]}px`,
					width: '500px',
					maxWidth: '100%',
				}}
			>
				<div
					css={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}
				>
					<div
						css={{
							[until.mobileLandscape]: {
								width: '100%',
							},
						}}
					>
						<Button
							disabled={isValidating || !cardFormIsLoaded}
							priority="primary"
							onClick={startCardUpdate}
							icon={
								isValidating ? (
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
						>
							Update payment method
						</Button>
					</div>
				</div>
			</div>

			<div
				css={css`
					margin-top: ${space[9]}px;
					margin-bottom: ${space[9]}px;
				`}
			>
				{renderError()}
			</div>
		</>
	);
};
