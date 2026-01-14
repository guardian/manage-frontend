import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
	textSans12,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, Spinner } from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import { capitalize } from 'lodash';
import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ribbon } from '@/client/components/shared/Ribbon';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { getMaxNonDiscountedPrice } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
import { number2words } from '@/shared/numberUtils';
import {
	getBillingPeriodForDiscount,
	getMainPlan,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

type OfferApiCallStatus = 'NOT_READY' | 'PENDING' | 'FAILED' | 'SUCCESS';

const yourOfferBoxCss = css`
	background-color: #fbf6ef;
	padding: ${space[4]}px ${space[6]}px;
	position: relative;
	h4 {
		${textSansBold17};
		margin: 0;
	}
	p {
		margin: 0;
	}
`;

const ribbonCss = css`
	position: absolute;
	top: 0;
	left: ${space[3]}px;
	transform: translateY(-50%);
`;

const yourOfferBoxFlexCss = css`
	display: flex;
	flex-direction: column;
	${from.desktop} {
		flex-direction: row;
		gap: 1ch;
	}
`;

const strikethroughPriceCss = css`
	${textSans17};
	color: ${neutral[46]};
	margin: 0;
`;

const percentageOfferSubText = css`
	${textSans12};
	color: ${neutral[38]};
	margin-top: ${space[2]}px;
`;

const whatsNextTitleCss = css`
	${textEgyptianBold17};
	margin-top: ${space[6]}px;
	${from.desktop} {
		margin-top: ${space[8]}px;
	}
`;

const whatsNextListCss = css`
	${textEgyptian17};
	padding: 0;
	padding-inline-start: 14px;
	li + li {
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

export const CancelAlternativeReview = () => {
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

	const offerPeriodWord = number2words(routerState.upToPeriods);
	const offerPeriodType = routerState.upToPeriodsType;
	const firstDiscountedPaymentDate = parseDate(
		routerState.firstDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);
	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT);

	const humanReadableStrikethroughPrice = getMaxNonDiscountedPrice(
		routerState.nonDiscountedPayments,
		true,
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
	const offerIsPercentageOrFree: 'percentage' | 'free' | false =
		alternativeIsOffer &&
		(routerState.discountPercentage < 100 ? 'percentage' : 'free');

	const handleConfirmClick = async () => {
		setPerformingDiscountStatus('PENDING');

		try {
			const response = await fetchWithDefaultParameters(
				'/api/discounts/apply-discount',
				{
					method: 'POST',
					body: JSON.stringify({
						subscriptionNumber:
							productDetail.subscription.subscriptionId,
					}),
				},
			);

			if (response.ok) {
				const confirmedUrlPart = `../${
					(alternativeIsOffer && 'offer-confirmed') || ''
				}${(alternativeIsPause && 'pause-confirmed') || ''}`;
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
				{alternativeIsOffer && 'Your offer'}
				{alternativeIsPause && "Let's confirm the details"}
			</Heading>
			<div
				css={[
					yourOfferBoxCss,
					offerIsPercentageOrFree === 'percentage' &&
						css`
							padding-top: ${space[6]}px;
						`,
				]}
			>
				{offerIsPercentageOrFree === 'percentage' && (
					<Ribbon
						copy={`${routerState.discountPercentage}% off`}
						ribbonColour={palette.news[400]}
						copyColour={palette.neutral[100]}
						roundedCornersLeft
						roundedCornersRight
						withoutTail
						small
						additionalCss={ribbonCss}
					/>
				)}
				<div
					css={[
						yourOfferBoxFlexCss,
						offerIsPercentageOrFree === 'percentage' &&
							css`
								gap: 1ch;
								flex-direction: row;
							`,
					]}
				>
					{alternativeIsOffer && isPaidSubscriptionPlan(mainPlan) && (
						<p css={strikethroughPriceCss}>
							<s>
								{mainPlan.currency}
								{humanReadableStrikethroughPrice}/
								{billingPeriodForDiscount ||
									mainPlan.billingPeriod}
							</s>
						</p>
					)}
					<h4>
						{alternativeIsOffer &&
							offerIsPercentageOrFree === 'free' &&
							`${capitalize(
								offerPeriodWord,
							)} ${offerPeriodType} of free access to your digital subscription`}
						{alternativeIsOffer &&
							isPaidSubscriptionPlan(mainPlan) &&
							offerIsPercentageOrFree === 'percentage' && (
								<>
									{mainPlan.currency}
									{routerState.discountedPrice}/
									{billingPeriodForDiscount ||
										mainPlan.billingPeriod}
								</>
							)}
						{alternativeIsPause &&
							`You'd like to pause your recurring support for ${offerPeriodWord} ${offerPeriodType}`}
					</h4>
				</div>
				{alternativeIsOffer &&
					isPaidSubscriptionPlan(mainPlan) &&
					offerIsPercentageOrFree === 'percentage' && (
						<p>For your {capitalize(productType.friendlyName)}</p>
					)}
			</div>
			{offerIsPercentageOrFree === 'percentage' &&
				isPaidSubscriptionPlan(mainPlan) && (
					<p css={percentageOfferSubText}>
						You will pay {mainPlan.currency}
						{routerState.discountedPrice} for the next{' '}
						{routerState.upToPeriods} {offerPeriodType} then{' '}
						{mainPlan.currency}
						{getMaxNonDiscountedPrice(
							routerState.nonDiscountedPayments,
							true,
						)}
						/{billingPeriodForDiscount || mainPlan.billingPeriod}
					</p>
				)}
			<h3 css={whatsNextTitleCss}>
				{alternativeIsOffer && 'If you choose to stay with us:'}
				{alternativeIsPause && 'This means:'}
			</h3>
			<ul css={whatsNextListCss}>
				{alternativeIsOffer && (
					<>
						<li>
							{offerIsPercentageOrFree === 'free' &&
								`Your ${offerPeriodWord} ${offerPeriodType} of free access will begin on ${firstDiscountedPaymentDate} (when your next payment would usually be due)`}
							{offerIsPercentageOrFree === 'percentage' &&
								isPaidSubscriptionPlan(mainPlan) &&
								`You will benefit from the discounted rate, and will be charged ${mainPlan.currency}${routerState.discountedPrice} on your next payment date`}
						</li>
						<li>
							{offerIsPercentageOrFree === 'free' &&
								`Unless you cancel before, your payment will resume on ${nextNonDiscountedPaymentDate}`}
							{offerIsPercentageOrFree === 'percentage' &&
								isPaidSubscriptionPlan(mainPlan) &&
								`Unless you cancel before then, your ${
									mainPlan.currency
								}${getMaxNonDiscountedPrice(
									routerState.nonDiscountedPayments,
									true,
								)}/${
									billingPeriodForDiscount ||
									mainPlan.billingPeriod
								} payment will automatically resume on ${nextNonDiscountedPaymentDate}`}
						</li>
						<li>You may cancel your subscription at any time</li>
					</>
				)}
				{alternativeIsPause && (
					<>
						<li>
							Unless you cancel before, your monthly support will
							resume on {nextNonDiscountedPaymentDate}
						</li>
						<li>
							You'll continue to receive our monthly support
							newsletter (unless you've opted out)
						</li>
						<li>You may return to cancel at any time.</li>
					</>
				)}
			</ul>
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
					{alternativeIsOffer ? 'Confirm your offer' : ''}
					{alternativeIsPause ? 'Confirm pausing your support' : ''}
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
					{alternativeIsOffer && offerIsPercentageOrFree === 'free' && (
						<p css={termsCss}>
							If you cancel during the free period, you will lose
							access to your benefits on the day we usually take
							payment. If you cancel after the free period, your
							subscription will end at the end of your current{' '}
							{billingPeriodForDiscount || mainPlan.billingPeriod}
							ly payment period.
						</p>
					)}
					{alternativeIsOffer &&
						offerIsPercentageOrFree === 'percentage' && (
							<p css={termsCss}>
								If you take up the{' '}
								{routerState.discountPercentage}% off offer and
								cancel during that{' '}
								{billingPeriodForDiscount ||
									mainPlan.billingPeriod}
								, you will lose access to your benefits at the
								end of the{' '}
								{billingPeriodForDiscount ||
									mainPlan.billingPeriod}
								. If you cancel after the offer, when your{' '}
								{mainPlan.currency}
								{getMaxNonDiscountedPrice(
									routerState.nonDiscountedPayments,
									true,
								)}
								/
								{billingPeriodForDiscount ||
									mainPlan.billingPeriod}{' '}
								payment automatically resumes, your subscription
								will end at the end of your current{' '}
								{billingPeriodForDiscount ||
									mainPlan.billingPeriod}
								ly payment period
							</p>
						)}
					{alternativeIsPause && (
						<p css={termsCss}>
							If you cancel during the paused period, your{' '}
							{billingPeriodForDiscount || mainPlan.billingPeriod}
							ly payments will not automatically resume. If you
							cancel after the paused period, cancellation will
							take effect immediately and you will not be charged
							again.
						</p>
					)}
				</>
			)}
		</>
	);
};
