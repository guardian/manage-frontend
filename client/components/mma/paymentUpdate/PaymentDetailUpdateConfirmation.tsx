import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { buttonCentredCss } from '@/client/styles/ButtonStyles';
import type {
	ProductDetail,
	Subscription,
	WithSubscription,
} from '../../../../shared/productResponse';
import {
	formatDate,
	getMainPlan,
	getSpecificProductTypeFromTier,
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { ArrowIcon } from '../shared/assets/ArrowIcon';
import { LinkButton as MMALinkButton } from '../shared/Buttons';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import type { IsFromAppProps } from '../shared/IsFromAppProps';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import type { PaymentUpdateContextInterface } from './PaymentDetailUpdateContainer';
import { PaymentUpdateContext } from './PaymentDetailUpdateContainer';

interface ConfirmedNewPaymentDetailsRendererProps {
	subscription: Subscription;
	subHasExpectedPaymentType: boolean;
	previousProductDetail: ProductDetail;
}

const keyValuePairCss = css`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const keyCss = css`
	${textSansBold17};
	padding: 0 ${space[2]}px 0 0;
	display: inline-block;
	vertical-align: top;
	width: 50%;

	${from.tablet} {
		width: 14ch;
	}
`;

const valueCss = css`
	${textSans17};
	padding: 0;
	display: inline-block;
	vertical-align: top;
	width: 50%;

	${from.tablet} {
		width: calc(100% - 15ch);
	}
`;

const subHeadingCss = `
      border-top: 1px solid ${palette.neutral['86']};
	  ${headlineBold28};
      margin-top: ${space[9]}px;

      ${until.tablet} {
        font-size: 1.25rem;
        line-height: 1.6;
      };
    `;

function getPaymentInterval(interval: string) {
	if (interval === 'year') {
		return 'annual';
	} else if (interval === 'month') {
		return 'monthly';
	} else if (interval === 'quarter') {
		return 'quarterly';
	}
}

export const ConfirmedNewPaymentDetailsRenderer = ({
	subscription,
	subHasExpectedPaymentType,
	previousProductDetail,
}: ConfirmedNewPaymentDetailsRendererProps) => {
	const mainPlan = getMainPlan(subscription);
	const specificProductType = getSpecificProductTypeFromTier(
		previousProductDetail.tier,
	);
	if (subHasExpectedPaymentType && isPaidSubscriptionPlan(mainPlan)) {
		return (
			<div
				css={css`
					border: 1px solid ${palette.neutral[86]};
					margin-bottom: ${space[6]}px;
				`}
			>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: start;
						background-color: ${palette.brand[400]};
						${from.mobileLandscape} {
							align-items: center;
						}
					`}
				>
					<h2
						css={css`
							font-size: 17px;
							font-weight: bold;
							margin: 0;
							padding: ${space[3]}px;
							color: ${palette.neutral[100]};
							${until.mobileLandscape} {
								padding: ${space[3]}px;
							}
							${from.tablet} {
								font-size: 20px;
								padding: ${space[3]}px ${space[5]}px;
							}
						`}
					>
						{specificProductType.productTitle(mainPlan)}
					</h2>
				</div>
				<div
					css={css`
						padding: ${space[3]}px;
						${from.tablet} {
							padding: ${space[5]}px;
							display: flex;
						}
					`}
				>
					<div
						css={css`
							${from.tablet} {
								flex: 1;
								display: flex;
								flex-flow: column nowrap;
							}
						`}
					>
						{previousProductDetail.isPaidTier && (
							<>
								<ul css={keyValuePairCss}>
									<li css={keyCss}>Payment method</li>
									<li css={valueCss}>
										{subscription.card && (
											<CardDisplay
												inErrorState={false}
												cssOverrides={css`
													margin: 0;
												`}
												{...subscription.card}
											/>
										)}
										{subscription.payPalEmail && (
											<PaypalDisplay
												payPalId={
													subscription.payPalEmail
												}
											/>
										)}
										{subscription.sepaMandate && (
											<SepaDisplay
												accountName={
													subscription.sepaMandate
														.accountName
												}
												iban={
													subscription.sepaMandate
														.iban
												}
											/>
										)}
										{subscription.mandate && (
											<DirectDebitDisplay
												inErrorState={false}
												{...subscription.mandate}
											/>
										)}
										{subscription.stripePublicKeyForCardAddition && (
											<span>No Payment Method</span>
										)}
									</li>
								</ul>
							</>
						)}
					</div>
					{subscription.card && (
						<div
							css={css`
								padding: ${space[3]}px 0 0 0;
								${from.tablet} {
									flex: 1;
									display: inline-block;
									flex-flow: column nowrap;
									margin: 0;
									padding: 0 0 0 ${space[5]}px;
								}
								ul:last-of-type {
									margin-bottom: ${space[5]}px;
								}
							`}
						>
							{subscription.card.expiry && (
								<>
									<span
										css={css`
											${keyCss};
											${from.tablet} {
												text-align: right;
											}
										`}
									>
										Expiry
									</span>
									<span
										css={css`
											${valueCss};
											color: ${palette.neutral[7]};
										`}
									>
										{subscription.card.expiry.month} /{' '}
										{subscription.card.expiry.year}
									</span>
								</>
							)}
						</div>
					)}
				</div>

				{subscription.nextPaymentPrice && subscription.nextPaymentDate && (
					<div
						css={css`
							padding: ${space[3]}px;
							border-top: 1px solid ${palette.neutral[86]};
							${from.tablet} {
								padding: ${space[5]}px;
								display: flex;
							}
						`}
					>
						<div
							css={css`
								${from.tablet} {
									margin: ${space[6]}px 0 0 0;
									padding: ${space[6]}px 0 0 0;
									flex: 1;
									display: flex;
									flex-flow: column nowrap;
									padding: 0;
									margin: 0;
								}
							`}
						>
							<>
								<ul css={keyValuePairCss}>
									<li css={keyCss}>Next Payment</li>
									<li css={valueCss}>
										{mainPlan.currency}
										{(
											subscription.nextPaymentPrice /
											100.0
										).toFixed(2)}{' '}
										/{' '}
										{getPaymentInterval(
											mainPlan.billingPeriod,
										)}
										{subscription.stripePublicKeyForCardAddition && (
											<span>No Payment Method</span>
										)}
									</li>
								</ul>
							</>
						</div>

						<div
							css={css`
								padding: ${space[3]}px 0 0 0;
								${from.tablet} {
									margin: ${space[6]}px 0 0 0;
									flex: 1;
									display: inline-block;
									flex-flow: column nowrap;
									padding: 0 0 0 ${space[5]}px;
									margin: 0;
									padding: 0 0 0 ${space[5]}px;
								}
								ul:last-of-type {
									margin-bottom: ${space[5]}px;
								}
							`}
						>
							<>
								<span css={keyCss}>Next payment date</span>
								<span css={valueCss}>
									{formatDate(subscription.nextPaymentDate)}
								</span>
							</>
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<GenericErrorScreen loggingMessage="Unsupported new payment method" />
	); // unsupported operation currently
};

interface PaymentMethodUpdatedProps extends IsFromAppProps {
	subs: WithSubscription[] | object;
	paymentFailureRecoveryMessage: string;
	subHasExpectedPaymentType: boolean;
	previousProductDetail: ProductDetail;
}

export const PaymentMethodUpdated = ({
	isFromApp,
	subs,
	paymentFailureRecoveryMessage,
	subHasExpectedPaymentType,
	previousProductDetail,
}: PaymentMethodUpdatedProps) => {
	const navigate = useNavigate();
	return Array.isArray(subs) && subs.length === 1 ? (
		<>
			<h1
				css={css`
					${subHeadingCss}
				`}
			>
				Your payment details were updated successfully
			</h1>

			{previousProductDetail.alertText && paymentFailureRecoveryMessage && (
				<InfoSummary
					context=""
					message={paymentFailureRecoveryMessage}
					cssOverrides={css`
						margin-bottom: ${space[6]}px;
					`}
				/>
			)}

			<ConfirmedNewPaymentDetailsRenderer
				subscription={subs[0].subscription}
				subHasExpectedPaymentType={subHasExpectedPaymentType}
				previousProductDetail={previousProductDetail}
			/>

			<h2
				css={css`
					margin-top: ${space[9]}px;
					margin-bottom: ${space[1]}px;
					line-height: 1;
					font-weight: bold;
					font-size: 1.75rem;
				`}
			>
				Thank you
			</h2>
			<span> You are helping to support independent journalism.</span>
			<div css={{ marginTop: `${space[9]}px` }}>
				{isFromApp ? (
					<LinkButton
						theme={themeButtonReaderRevenueBrand}
						href="x-gu://mma/payment-update?success"
						cssOverrides={buttonCentredCss}
					>
						Return to the app
					</LinkButton>
				) : (
					<MMALinkButton
						to="/"
						text="Back to Account overview"
						colour={palette.brand[400]}
						textColour={palette.neutral[100]}
						fontWeight="bold"
						right
					/>
				)}
			</div>
		</>
	) : (
		<>
			<GenericErrorScreen
				loggingMessage={`${
					Array.isArray(subs) && subs.length
				} subs returned when one was expected`}
			/>
			<Button
				priority="tertiary"
				icon={<ArrowIcon pointingLeft />}
				iconSide="left"
				onClick={() => {
					navigate('/');
				}}
			>
				Return to your account
			</Button>
		</>
	);
};

export const PaymentDetailUpdateConfirmation = () => {
	const { productDetail: previousProductDetail, isFromApp } = useContext(
		PaymentUpdateContext,
	) as PaymentUpdateContextInterface;

	const location = useLocation();
	const state = location.state as {
		paymentFailureRecoveryMessage: string;
		subHasExpectedPaymentType: boolean;
		newSubscriptionData: WithSubscription[];
	};

	const newSubscriptionData = state.newSubscriptionData;

	return state ? (
		<PaymentMethodUpdated
			subs={newSubscriptionData}
			paymentFailureRecoveryMessage={state.paymentFailureRecoveryMessage}
			subHasExpectedPaymentType={state.subHasExpectedPaymentType}
			previousProductDetail={previousProductDetail}
			isFromApp={isFromApp}
		/>
	) : (
		<Navigate to="/" />
	);
};
