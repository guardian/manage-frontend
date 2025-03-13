import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	Radio,
	RadioGroup,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import * as Sentry from '@sentry/browser';
import type * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../../../shared/identity';
import type {
	MembersDataApiResponse,
	ProductDetail,
	Subscription,
	WithSubscription,
} from '../../../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	isProduct,
} from '../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { createProductDetailFetch } from '../../../utilities/productUtils';
import { getStripeKey } from '../../../utilities/stripe';
import { processResponse } from '../../../utilities/utils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { DirectDebitLogo } from '../shared/assets/DirectDebitLogo';
import { cardTypeToSVG } from '../shared/CardDisplay';
import { OverlayLoader } from '../shared/OverlayLoader';
import { augmentPaymentFailureAlertText } from '../shared/PaymentFailureAlertIfApplicable';
import { CardInputForm } from './card/CardInputForm';
import { StripeCheckoutSessionButton } from './card/StripeCheckoutSessionButton';
import { ContactUs } from './ContactUs';
import { CurrentPaymentDetails } from './CurrentPaymentDetail';
import { DirectDebitInputForm } from './dd/DirectDebitInputForm';
import type { NewPaymentMethodDetail } from './NewPaymentMethodDetail';
import type { PaymentUpdateContextInterface } from './PaymentDetailUpdateContainer';
import { PaymentUpdateContext } from './PaymentDetailUpdateContainer';

export enum PaymentMethod {
	Card = 'Credit card / debit card',
	PayPal = 'PayPal',
	DirectDebit = 'Direct debit',
	ResetRequired = 'ResetRequired',
	Free = 'FREE',
	Unknown = 'Unknown',
}

const subHeadingCss = css`
	border-top: 1px solid ${palette.neutral['86']};
	${headlineBold28};
	margin-top: 50px;
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	} ;
`;

interface PaymentMethodProps {
	value: PaymentMethod;
	updatePaymentMethod: (newPaymentMethod: PaymentMethod) => void;
	directDebitIsAllowed: boolean;
}

interface PaymentMethodRadioButtonProps extends PaymentMethodProps {
	paymentMethod: PaymentMethod;
}

export function getLogos(paymentMethod: PaymentMethod) {
	if (paymentMethod === PaymentMethod.Card) {
		return (
			<>
				{cardTypeToSVG('visa')}
				{cardTypeToSVG('mastercard')}
				{cardTypeToSVG('americanexpress')}
			</>
		);
	} else if (paymentMethod === PaymentMethod.DirectDebit) {
		return (
			<DirectDebitLogo
				fill={palette.brand[400]}
				additionalCss={css`
					width: 47px;
					height: 16px;
				`}
			/>
		);
	}
}

const PaymentMethodRadioButton = (props: PaymentMethodRadioButtonProps) => {
	const isChecked = props.value === props.paymentMethod;

	const defaultRadioStyles = css`
		display: flex;
		align-items: center;
		padding: ${space[4]}px;
		margin-bottom: ${space[4]}px;
		${textSans17};
		line-height: normal;
		font-weight: bold;
		color: ${palette.neutral[46]};
		border-radius: 4px;
		box-shadow: inset 0px 0px 0px 2px ${palette.neutral[46]};
		cursor: pointer;

		&:hover {
			box-shadow: inset 0px 0px 0px 4px ${palette.brand[500]};
		}
	`;

	const checkedRadioStyles = css`
		box-shadow: inset 0px 0px 0px 4px ${palette.brand[500]};
		background-color: #e3f6ff;
		color: ${palette.brand[400]};
	`;

	return (
		<label
			data-cy={props.paymentMethod}
			css={css`
				${defaultRadioStyles}
				${isChecked && checkedRadioStyles}
			`}
		>
			<Radio
				checked={isChecked}
				onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) =>
					props.updatePaymentMethod(
						changeEvent.target.value as PaymentMethod,
					)
				}
				value={props.paymentMethod}
			/>
			{props.paymentMethod}
			<div
				css={css`
					display: none;
					margin-left: auto;
					${from.mobileMedium} {
						display: flex;
					}
				`}
			>
				{getLogos(props.paymentMethod)}
			</div>
		</label>
	);
};

export const SelectPaymentMethod = (
	props: PaymentMethodProps & { currentPaymentMethod: string | undefined },
) => (
	<form>
		<RadioGroup label="Select payment method" hideLabel>
			<PaymentMethodRadioButton
				paymentMethod={PaymentMethod.Card}
				{...props}
			/>
			{props.directDebitIsAllowed ? (
				<PaymentMethodRadioButton
					paymentMethod={PaymentMethod.DirectDebit}
					{...props}
				/>
			) : (
				<></>
			)}
		</RadioGroup>
	</form>
);

const subscriptionToPaymentMethod = (productDetail: ProductDetail) => {
	if (!productDetail.subscription.safeToUpdatePaymentMethod) {
		return PaymentMethod.Unknown;
	} else if (
		productDetail.subscription.paymentMethod === 'Card' &&
		productDetail.subscription.card
	) {
		return PaymentMethod.Card;
	} else if (
		productDetail.subscription.paymentMethod === 'PayPal' &&
		productDetail.subscription.payPalEmail
	) {
		return PaymentMethod.PayPal;
	} else if (
		productDetail.subscription.paymentMethod === 'DirectDebit' &&
		productDetail.subscription.mandate
	) {
		return PaymentMethod.DirectDebit;
	} else if (productDetail.subscription.paymentMethod === 'ResetRequired') {
		return PaymentMethod.ResetRequired;
	} else if (!productDetail.isPaidTier) {
		return PaymentMethod.Free;
	}
	return PaymentMethod.Unknown;
};

export interface PaymentUpdaterStepState {
	newPaymentMethodDetail?: NewPaymentMethodDetail;
	newSubscriptionData?: WithSubscription[];
}

// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY
const STRIPE_CHECKOUT_SESSION_MODE = true;
// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY

export const PaymentDetailUpdate = (props: WithProductType<ProductType>) => {
	const { productDetail, isFromApp } = useContext(
		PaymentUpdateContext,
	) as PaymentUpdateContextInterface;

	const currentPaymentMethod = subscriptionToPaymentMethod(productDetail);

	const mainPlan = getMainPlan(productDetail.subscription);

	const directDebitIsAllowed =
		currentPaymentMethod === PaymentMethod.DirectDebit ||
		(isPaidSubscriptionPlan(mainPlan) &&
			mainPlan.currencyISO === 'GBP' &&
			(!productDetail.subscription.deliveryAddress ||
				!productDetail.subscription.deliveryAddress?.country ||
				productDetail.subscription.deliveryAddress.country ===
					'United Kingdom'));

	const [paymentUpdateState, setPaymentUpdateState] =
		useState<PaymentUpdaterStepState>({
			newPaymentMethodDetail: undefined,
			newSubscriptionData: undefined,
		});

	const [executingPaymentUpdate, setExecutingPaymentUpdate] =
		useState<boolean>(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>(
			currentPaymentMethod === PaymentMethod.DirectDebit
				? PaymentMethod.Unknown
				: PaymentMethod.Card,
		);

	const navigate = useNavigate();

	const executePaymentUpdate = async (
		newPaymentMethodDetail: NewPaymentMethodDetail,
	) => {
		setExecutingPaymentUpdate(true);

		try {
			const paymentUpdateFetch = await fetch(
				`/api/payment/${newPaymentMethodDetail.apiUrlPart}/${productDetail.subscription.subscriptionId}`,
				{
					credentials: 'include',
					method: 'POST',
					body: JSON.stringify(
						newPaymentMethodDetail.detailToPayloadObject(),
					),
					headers: {
						'Content-Type': 'application/json',
						[X_GU_ID_FORWARDED_SCOPE]:
							getScopeFromRequestPathOrEmptyString(
								window.location.href,
							),
					},
				},
			);

			const response = await processResponse<NewPaymentMethodDetail>(
				paymentUpdateFetch,
			);

			if (newPaymentMethodDetail.matchesResponse(response)) {
				const paymentMethodChangeType: string =
					productDetail.subscription.paymentMethod ===
					PaymentMethod.ResetRequired
						? 'reset'
						: 'update';

				trackEvent({
					eventCategory: 'payment',
					eventAction: `${newPaymentMethodDetail.name}_${paymentMethodChangeType}_success`,
					product: {
						productType: props.productType,
						productDetail: productDetail,
					},
					eventLabel: props.productType.urlPart,
				});

				// refetch subscription from members data api
				const mdapiResponse = (await createProductDetailFetch(
					props.productType.allProductsProductTypeFilterString,
					productDetail.subscription.subscriptionId,
				)) as MembersDataApiResponse;

				const newSubscriptionData =
					mdapiResponse.products.filter(isProduct);

				navigate('updated', {
					state: {
						paymentFailureRecoveryMessage:
							newPaymentMethodDetail.paymentFailureRecoveryMessage,
						subHasExpectedPaymentType:
							newPaymentMethodDetail.subHasExpectedPaymentType(
								newSubscriptionData[0].subscription,
							),
						newSubscriptionData,
						isFromApp: isFromApp,
					},
				});
			}
		} catch {
			navigate('failed', {
				state: {
					newPaymentMethodDetailFriendlyName:
						newPaymentMethodDetail.friendlyName,
				},
			});
		}
	};

	const newPaymentMethodDetailUpdater = (
		newPaymentMethodDetail: NewPaymentMethodDetail,
	) =>
		setPaymentUpdateState({
			...paymentUpdateState,
			newPaymentMethodDetail,
		});

	const updatePaymentMethod = (newPaymentMethod: PaymentMethod) =>
		setSelectedPaymentMethod(newPaymentMethod);

	const getInputForm = (subscription: Subscription, isTestUser: boolean) => {
		let stripePublicKey: string | undefined;

		if (subscription.card) {
			stripePublicKey = subscription.card.stripePublicKeyForUpdate;
		} else {
			stripePublicKey = getStripeKey(
				productDetail.billingCountry ||
					subscription.deliveryAddress?.country,
				isTestUser,
			);
		}

		switch (selectedPaymentMethod) {
			case PaymentMethod.ResetRequired:
				return stripePublicKey ? (
					<CardInputForm
						stripeApiKey={stripePublicKey}
						newPaymentMethodDetailUpdater={
							newPaymentMethodDetailUpdater
						}
						userEmail={
							subscription.card?.email ||
							window.guardian.identityDetails.email
						}
						executePaymentUpdate={executePaymentUpdate}
					/>
				) : (
					<GenericErrorScreen loggingMessage="No Stripe key provided to enable adding a payment method" />
				);
			case PaymentMethod.Card:
				// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY
				if (STRIPE_CHECKOUT_SESSION_MODE) {
					return stripePublicKey ? (
						<StripeCheckoutSessionButton
							stripeApiKey={stripePublicKey}
						/>
					) : (
						<GenericErrorScreen loggingMessage="No existing card information to update from" />
					);
				}
				// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY
				return stripePublicKey ? (
					<CardInputForm
						stripeApiKey={stripePublicKey}
						newPaymentMethodDetailUpdater={
							newPaymentMethodDetailUpdater
						}
						userEmail={
							subscription.card?.email ||
							window.guardian.identityDetails.email
						}
						executePaymentUpdate={executePaymentUpdate}
					/>
				) : (
					<GenericErrorScreen loggingMessage="No existing card information to update from" />
				);
			case PaymentMethod.Free:
				return (
					<div>
						<p>
							If you are interested in supporting our journalism
							in other ways, please consider either a contribution
							or a subscription.
						</p>
						<SupportTheGuardianButton
							supportReferer="payment_flow"
							theme="brand"
							size="small"
						/>
					</div>
				);
			case PaymentMethod.PayPal:
				return (
					<p>
						Updating your PayPal payment details is not possible
						here. Please login to PayPal to change your payment
						details.
					</p>
				);
			case PaymentMethod.DirectDebit:
				return (
					<DirectDebitInputForm
						newPaymentMethodDetailUpdater={
							newPaymentMethodDetailUpdater
						}
						testUser={isTestUser}
						executePaymentUpdate={executePaymentUpdate}
					/>
				);
			case PaymentMethod.Unknown:
				return null;
			default:
				Sentry.captureException(
					'user cannot update their payment online',
				);
				return (
					<span>
						It is not currently possible to update your payment
						method online.
					</span>
				);
		}
	};

	return (
		<>
			{executingPaymentUpdate && (
				<OverlayLoader message={`Updating payment details...`} />
			)}
			<div css={{ minWidth: '260px' }}>
				{productDetail.alertText && (
					<ErrorSummary
						cssOverrides={css`
							margin-top: ${space[9]}px;
						`}
						message={augmentPaymentFailureAlertText(
							productDetail.alertText,
						)}
					/>
				)}
				<h3
					css={css`
						${subHeadingCss}
						margin-top: ${space[9]}px;
					`}
				>
					Your current payment method
				</h3>
				<CurrentPaymentDetails {...productDetail} />
				{productDetail.subscription.payPalEmail && (
					<p
						css={css`
							${textSans17};
						`}
					>
						To update your payment details, please login to your
						PayPal account. Alternatively, you can switch to a card
						based payment method below.
					</p>
				)}
			</div>

			<h3
				css={css`
					${subHeadingCss}
					${productDetail.subscription.payPalEmail &&
					'margin-top: 36px'}
				`}
			>
				{selectedPaymentMethod === PaymentMethod.Unknown
					? 'Choose your payment method'
					: 'Update your payment method'}
			</h3>

			<SelectPaymentMethod
				updatePaymentMethod={updatePaymentMethod}
				value={selectedPaymentMethod}
				currentPaymentMethod={currentPaymentMethod}
				directDebitIsAllowed={directDebitIsAllowed}
			/>

			{getInputForm(productDetail.subscription, productDetail.isTestUser)}

			{
				/* Dummy button when user has not selected a payment method */
				selectedPaymentMethod === PaymentMethod.Unknown ? (
					<div
						css={css`
							margin-top: ${space[9]}px;
							margin-bottom: ${space[9]}px;
						`}
					>
						<Button
							disabled
							priority="secondary"
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							cssOverrides={css`
								background-color: ${palette.neutral[86]};
								color: ${palette.neutral[46]};

								:hover {
									background-color: ${palette.neutral[86]};
									color: ${palette.neutral[46]};
								}

								cursor: not-allowed;
							`}
						>
							Update payment method
						</Button>
					</div>
				) : null
			}
			<ContactUs />
		</>
	);
};
