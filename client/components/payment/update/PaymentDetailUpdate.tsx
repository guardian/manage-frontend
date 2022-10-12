import { css } from '@emotion/react';
import {
	brand,
	from,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	Radio,
	RadioGroup,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import * as Sentry from '@sentry/browser';
import type * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../../../shared/identity';
import type {
	ProductDetail,
	Subscription,
	WithSubscription,
} from '../../../../shared/productResponse';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../shared/productTypes';
import { createProductDetailFetch } from '../../../productUtils';
import { trackEvent } from '../../../services/analytics';
import { getStripeKey } from '../../../stripe';
import { processResponse } from '../../../utils';
import { GenericErrorScreen } from '../../genericErrorScreen';
import OverlayLoader from '../../OverlayLoader';
import { SupportTheGuardianButton } from '../../supportTheGuardianButton';
import { cardTypeToSVG } from '../cardDisplay';
import { DirectDebitLogo } from '../directDebitLogo';
import { augmentPaymentFailureAlertText } from '../paymentFailureAlertIfApplicable';
import { CardInputForm } from './card/cardInputForm';
import ContactUs from './ContactUs';
import CurrentPaymentDetails from './CurrentPaymentDetail';
import { DirectDebitInputForm } from './dd/directDebitInputForm';
import type { NewPaymentMethodDetail } from './newPaymentMethodDetail';
import { PaymentUpdateProductDetailContext } from './PaymentDetailUpdateContainer';
import { ErrorSummary } from './Summary';

export enum PaymentMethod {
	card = 'Credit card / debit card',
	payPal = 'PayPal',
	dd = 'Direct debit',
	resetRequired = 'ResetRequired',
	free = 'FREE',
	unknown = 'Unknown',
}

const subHeadingCss = css`
	border-top: 1px solid ${neutral['86']};
	${headline.small()};
	font-weight: bold;
	margin-top: 50px;
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	} ;
`;

interface PaymentMethodProps {
	value: PaymentMethod;
	updatePaymentMethod: (newPaymentMethod: PaymentMethod) => void;
	directDebitIsAllowed: Boolean;
}

interface PaymentMethodRadioButtonProps extends PaymentMethodProps {
	paymentMethod: PaymentMethod;
}

export function getLogos(paymentMethod: PaymentMethod) {
	if (paymentMethod === PaymentMethod.card) {
		return (
			<>
				{cardTypeToSVG('visa')}
				{cardTypeToSVG('mastercard')}
				{cardTypeToSVG('americanexpress')}
			</>
		);
	} else if (paymentMethod === PaymentMethod.dd) {
		return (
			<DirectDebitLogo
				fill={brand[400]}
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
		${textSans.medium({ lineHeight: 'regular' })};
		font-weight: bold;
		color: ${neutral[46]};
		border-radius: 4px;
		box-shadow: inset 0px 0px 0px 2px ${neutral[46]};
		cursor: pointer;

		&:hover {
			box-shadow: inset 0px 0px 0px 4px ${brand[500]};
		}
	`;

	const checkedRadioStyles = css`
		box-shadow: inset 0px 0px 0px 4px ${brand[500]};
		background-color: #e3f6ff;
		color: ${brand[400]};
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
				paymentMethod={PaymentMethod.card}
				{...props}
			/>
			{props.directDebitIsAllowed ? (
				<PaymentMethodRadioButton
					paymentMethod={PaymentMethod.dd}
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
		return PaymentMethod.unknown;
	} else if (
		productDetail.subscription.paymentMethod === 'Card' &&
		productDetail.subscription.card
	) {
		return PaymentMethod.card;
	} else if (
		productDetail.subscription.paymentMethod === 'PayPal' &&
		productDetail.subscription.payPalEmail
	) {
		return PaymentMethod.payPal;
	} else if (
		productDetail.subscription.paymentMethod === 'DirectDebit' &&
		productDetail.subscription.mandate
	) {
		return PaymentMethod.dd;
	} else if (productDetail.subscription.paymentMethod === 'ResetRequired') {
		return PaymentMethod.resetRequired;
	} else if (!productDetail.isPaidTier) {
		return PaymentMethod.free;
	}
	return PaymentMethod.unknown;
};

export interface PaymentUpdaterStepState {
	newPaymentMethodDetail?: NewPaymentMethodDetail;
	newSubscriptionData?: WithSubscription[];
}

const PaymentDetailUpdate = (props: WithProductType<ProductType>) => {
	const productDetail = useContext(
		PaymentUpdateProductDetailContext,
	) as ProductDetail;

	const currentPaymentMethod = subscriptionToPaymentMethod(productDetail);

	const mainPlan = getMainPlan(productDetail.subscription);

	const directDebitIsAllowed =
		currentPaymentMethod === PaymentMethod.dd ||
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
			currentPaymentMethod === PaymentMethod.dd
				? PaymentMethod.unknown
				: PaymentMethod.card,
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
					PaymentMethod.resetRequired
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
				const newSubscriptionData = await createProductDetailFetch(
					props.productType,
					productDetail.subscription.subscriptionId,
				);
				navigate('updated', {
					state: {
						paymentFailureRecoveryMessage:
							newPaymentMethodDetail.paymentFailureRecoveryMessage,
						subHasExpectedPaymentType:
							newPaymentMethodDetail.subHasExpectedPaymentType(
								newSubscriptionData[0].subscription,
							),
						newSubscriptionData,
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
			case PaymentMethod.resetRequired:
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
			case PaymentMethod.card:
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
			case PaymentMethod.free:
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
			case PaymentMethod.payPal:
				return (
					<p>
						Updating your PayPal payment details is not possible
						here. Please login to PayPal to change your payment
						details.
					</p>
				);
			case PaymentMethod.dd:
				return (
					<DirectDebitInputForm
						newPaymentMethodDetailUpdater={
							newPaymentMethodDetailUpdater
						}
						testUser={isTestUser}
						executePaymentUpdate={executePaymentUpdate}
					/>
				);
			case PaymentMethod.unknown:
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
							${textSans.medium()}
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
				{selectedPaymentMethod === PaymentMethod.unknown
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
				selectedPaymentMethod === PaymentMethod.unknown ? (
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
								background-color: ${neutral[86]};
								color: ${neutral[46]};

								:hover {
									background-color: ${neutral[86]};
									color: ${neutral[46]};
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

export default PaymentDetailUpdate;
