import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSans12,
	textSans15,
	textSansBold15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button, Spinner } from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import { contribToSupporterPlusFetch } from '@/client/utilities/productUtils';
import type { MonthsOrYears } from '@/shared/dates';
import { dateString } from '@/shared/dates';
import { getAppropriateReadableTimePeriod } from '@/shared/dates';
import { appendCorrectPluralisation } from '@/shared/generalTypes';
import {
	getBillingPeriodForDiscount,
	getMainPlan,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import type { SwitchPreviewResponse } from '@/shared/productSwitchTypes';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate extends Required<SwitchPreviewResponse> {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

type OfferApiCallStatus = 'NOT_READY' | 'PENDING' | 'FAILED' | 'SUCCESS';

const yourOfferBoxCss = css`
	background-color: #fbf6ef;
	padding: ${space[3]}px;
	position: relative;
	h4 {
		${textSansBold17};
	}
	${from.tablet} {
		padding: ${space[4]}px;
	}
`;

const yourOfferBoxFlexCss = css`
	display: flex;
	flex-direction: column;
`;

const yourOfferBoxHeaderCss = css`
	${textSansBold20};
	color: ${neutral[7]};
	margin: 0;
`;

const percentageOfferSubText = css`
	${textSans12};
	color: ${neutral[38]};
	margin: ${space[1]}px 0 0;
`;

const pricingDetailsTable = css`
	margin-top: ${space[6]}px;
	border-collapse: collapse;
	${textSans15};
	width: 100%;
	& thead th {
		text-align: left;
		padding-bottom: ${space[2]}px;
	}
	& tbody {
		border-top: 1px solid ${neutral[86]};
	}
	& tbody tr:first-of-type td {
		padding-top: ${space[2]}px;
	}
	& tbody tr:last-of-type td {
		padding-bottom: ${space[2]}px;
	}
	& tbody tr + tr td {
		padding-top: ${space[2]}px;
	}
	& td {
		padding: 0;
	}
	& td:nth-child(even) {
		text-align: right;
	}
	& tfoot {
		border-top: 1px solid ${neutral[86]};
		& th,
		td {
			${textSansBold15};
			text-align: left;
			padding-top: ${space[1]}px;
		}
	}
`;

const subduedCopy = css`
	color: ${neutral[38]};
`;

const whatsNextTitleCss = css`
	${textEgyptianBold17};
	margin-top: ${space[6]}px;
	${from.desktop} {
		margin-top: ${space[8]}px;
	}
`;

const whatsNextUlCss = css`
	padding-left: 0;
	margin: ${space[4]}px 0 0;
	${textEgyptian17};
	& li {
		margin-left: 1em;
		max-width: 650px;
	}
	& li + li {
		margin-top: ${space[3]}px;
	}
`;

const buttonsCtaHolder = css`
	margin: ${space[8]}px 0 ${space[6]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	${from.phablet} {
		flex-direction: row;
		gap: ${space[6]}px;
		margin-top: ${space[9]}px;
	}
`;

const ctaBtnCss = css`
	width: 100%;
	justify-content: center;
	${from.desktop} {
		width: fit-content;
	}
`;

const termsCss = css`
	${textSans12};
	color: ${palette.neutral[46]};
	margin-top: ${space[3]}px;
`;

const mobileOnlyBreakPointCss = css`
	${from.tablet} {
		display: none;
	}
`;

export const CancelAlternativeSwitchReview = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const productType = cancellationContext.productType;
	const mainPlan = getMainPlan(productDetail.subscription);
	const billingPeriodForDiscount = getBillingPeriodForDiscount(
		productDetail.subscription,
	);
	const offerPeriodType = appendCorrectPluralisation(
		routerState.discount.upToPeriodsType,
		1,
	).toLowerCase() as MonthsOrYears;

	const offsetPrice =
		routerState.discount.discountedPrice - routerState.amountPayableToday;

	const humanReadableNextPaymentDate = dateString(
		new Date(routerState.nextPaymentDate),
		'd MMMM',
	);

	const [performingDiscountStatus, setPerformingDiscountStatus] =
		useState<OfferApiCallStatus>('NOT_READY');

	const confirmBtnIconProps: {
		icon?: ReactElement;
		iconSide?: 'right';
		disabled?: true;
		['aria-disabled']?: true;
	} = {};
	if (performingDiscountStatus === 'PENDING') {
		confirmBtnIconProps.icon = <Spinner size="xsmall" />;
		confirmBtnIconProps.iconSide = 'right';
		confirmBtnIconProps.disabled = true;
		confirmBtnIconProps['aria-disabled'] = true;
	}

	const alternativeIsOffer = productType.productType === 'supporterplus';
	const alternativeIsPause = productType.productType === 'contributions';

	const handleConfirmClick = async () => {
		setPerformingDiscountStatus('PENDING');

		try {
			const response = await contribToSupporterPlusFetch(
				productDetail.subscription.subscriptionId,
				false,
				productDetail.isTestUser,
				true,
			);

			if (response.ok) {
				const confirmedUrlPart = '../switch-confirmed';
				navigate(confirmedUrlPart, {
					state: routerState,
				});
			} else {
				setPerformingDiscountStatus('FAILED');
			}
		} catch {
			setPerformingDiscountStatus('FAILED');
		}
	};

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, {}, { isCurrentStep: true }]}
				additionalCSS={css`
					margin: ${space[8]}px 0 ${space[9]}px;
				`}
			/>
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					css`
						margin-bottom: ${space[6]}px;
					`,
				]}
			>
				Your one-time offer
			</Heading>
			{isPaidSubscriptionPlan(mainPlan) && (
				<>
					<div css={yourOfferBoxCss}>
						<div css={[yourOfferBoxFlexCss]}>
							<h3 css={yourOfferBoxHeaderCss}>
								One year of All-access digital for{' '}
								{mainPlan.currency}
								{routerState.amountPayableToday}
							</h3>
							<p css={percentageOfferSubText}>
								You will pay {mainPlan.currency}
								{routerState.amountPayableToday} today for the
								next{' '}
								{getAppropriateReadableTimePeriod(
									routerState.discount.upToPeriods,
									offerPeriodType,
									{
										preferredPeriodType: 'month',
										maxPreferenceValue: 12,
										preferNumberedOutput: true,
									},
								)}{' '}
								then{' '}
								<span
									css={css`
										white-space: nowrap;
									`}
								>
									{mainPlan.currency}
									{routerState.supporterPlusPurchaseAmount}/
									{billingPeriodForDiscount ||
										mainPlan.billingPeriod}
								</span>{' '}
								unless you cancel
							</p>
							<table css={pricingDetailsTable}>
								<thead>
									<tr>
										<th>Pricing details</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											All-access digital |{' '}
											{
												routerState.discount
													.discountPercentage
											}
											% off
										</td>
										<td>
											<s css={subduedCopy}>
												{mainPlan.currency}
												{
													routerState.supporterPlusPurchaseAmount
												}
											</s>{' '}
											{mainPlan.currency}
											{
												routerState.discount
													.discountedPrice
											}
										</td>
									</tr>
									{offsetPrice > 0 && (
										<tr>
											<td>
												Amount offset from your{' '}
												<br
													css={
														mobileOnlyBreakPointCss
													}
												/>
												recurring annual support
											</td>
											<td>
												-{mainPlan.currency}
												{offsetPrice.toFixed(2)}
											</td>
										</tr>
									)}
								</tbody>
								<tfoot>
									<tr>
										<th>Total</th>
										<td>
											{mainPlan.currency}
											{routerState.amountPayableToday}
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>

					<h3 css={whatsNextTitleCss}>
						If you choose to stay with us:
					</h3>
					<ul css={whatsNextUlCss}>
						<li>
							Your current support will be cancelled and changed
							for a discounted All-access digital subscription
							effective immediately. You will start enjoying your
							benefits today.
						</li>
						<li>
							Your payment of {mainPlan.currency}
							{routerState.amountPayableToday} will be taken on{' '}
							{humanReadableNextPaymentDate} for the next 12
							months. After that, you will be charged the standard
							pricing, using your chosen payment method at each
							renewal, at the rate then in effect, unless you
							cancel.
						</li>
						<li>You may cancel your subscription at any time.</li>
					</ul>
				</>
			)}
			{performingDiscountStatus === 'FAILED' && (
				<ErrorSummary
					cssOverrides={css`
						margin-top: ${space[9]}px;
					`}
					message="Unable to complete request"
					context={
						<>
							We're sorry, but we couldn't complete your request
							at this time.
							<br />
							Please try again later. If the problem persists,
							contact our support team for assistance.
							<br />
							<Link to="/">Return to your account</Link>
						</>
					}
				/>
			)}
			<div css={buttonsCtaHolder}>
				<Button
					cssOverrides={ctaBtnCss}
					{...confirmBtnIconProps}
					onClick={handleConfirmClick}
				>
					Confirm your offer
				</Button>
				<Button
					priority="subdued"
					cssOverrides={ctaBtnCss}
					onClick={() => {
						const backUrl = `../${
							alternativeIsOffer ? 'offer' : ''
						}${alternativeIsPause ? 'pause' : ''}`;
						navigate(backUrl, { state: routerState });
						// we need to explicitly pass the state here to
						// avoid a render in the previous page where the
						// state is not yet available
					}}
				>
					Go back
				</Button>
			</div>
			{isPaidSubscriptionPlan(mainPlan) && (
				<>
					<p css={termsCss}>
						The All-access digital subscription will auto-renew each
						year. You will be charged the subscription amounts using
						your chosen payment method at each renewal unless you
						cancel. You can cancel your subscription at any time
						before your next renewal date.
					</p>
					<p css={termsCss}>
						If you cancel within 14 days of taking out a All-access
						digital subscription, you’ll receive a full refund and
						your subscription will stop immediately. Cancellation of
						your subscription made after 14 days will take effect at
						the end of your current annual payment period. To
						cancel, go to Manage My Account or see our Terms.
					</p>
					<p css={termsCss}>
						By proceeding, you are agreeing to our Terms and
						Conditions. To find out what personal data we collect
						and how we use it, please visit our Privacy Policy.
					</p>
				</>
			)}
		</>
	);
};
