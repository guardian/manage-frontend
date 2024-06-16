import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	space,
	textSans12,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, SvgSpinner } from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import { capitalize } from 'lodash';
import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { parseDate } from '@/shared/dates';
import { number2words } from '@/shared/numberUtils';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { DeliveryRecordDetail } from '../../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../../holiday/HolidayStopApi';
import { Heading } from '../../../shared/Heading';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type { CancellationContextInterface } from '../../CancellationContainer';
import { CancellationContext } from '../../CancellationContainer';
import type { OptionalCancellationReasonId } from '../../cancellationReason';

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
	display: flex;
	flex-direction: column;
	h4 {
		${textSansBold17};
		margin: 0;
	}
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

const whatsNextTitleCss = css`
	${textSansBold17};
	margin-top: ${space[8]}px;
`;

const whatsNextListCss = css`
	padding: 0;
	padding-inline-start: 14px;
	li + li {
		margin-top: ${space[3]}px;
	}
`;

const buttonsCtaHolder = css`
	margin: ${space[9]}px 0 ${space[6]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	${from.desktop} {
		flex-direction: row;
		gap: ${space[6]}px;
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

export const SupporterPlusOfferReview = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	const mainPlan = getMainPlan(productDetail.subscription);

	const offerPeriodWord = number2words(routerState.upToPeriods);
	const offerPeriodType = routerState.upToPeriodsType.toLowerCase();
	const firstDiscountedPaymentDate = parseDate(
		routerState.firstDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr();
	const nextNonDiscountedPaymentDate = parseDate(
		routerState.nextNonDiscountedPaymentDate,
		'yyyy-MM-dd',
	).dateStr();

	const [performingDiscountStatus, setPerformingDiscountStatus] =
		useState<OfferApiCallStatus>('NOT_READY');

	const confirmBtnIconProps: { icon?: ReactElement; iconSide?: 'right' } = {};
	if (performingDiscountStatus === 'PENDING') {
		confirmBtnIconProps.icon = <SvgSpinner size="xsmall" />;
		confirmBtnIconProps.iconSide = 'right';
	}

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
				navigate('../offer-confirmed', {
					state: routerState,
				});
			} else {
				setPerformingDiscountStatus('FAILED');
			}
		} catch (e) {
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
				Your offer
			</Heading>
			<div css={yourOfferBoxCss}>
				{isPaidSubscriptionPlan(mainPlan) && (
					<p css={strikethroughPriceCss}>
						<s>
							{mainPlan.currency}
							{mainPlan.price / 100}/{mainPlan.billingPeriod}
						</s>
					</p>
				)}
				<h4>
					{capitalize(offerPeriodWord)} {offerPeriodType} of free
					access to your digital subscription
				</h4>
			</div>
			<h3 css={whatsNextTitleCss}>If you choose to stay with us:</h3>
			<ul css={whatsNextListCss}>
				<li>
					Your {offerPeriodWord} {offerPeriodType} of free access will
					begin on {firstDiscountedPaymentDate} (when your next
					payment would usually be due)
				</li>
				<li>
					Unless you cancel before, your payment will resume on{' '}
					{nextNonDiscountedPaymentDate}
				</li>
				<li>You may cancel your subscription at any time</li>
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
					Confirm your offer
				</Button>
				<Button
					priority="subdued"
					cssOverrides={ctaBtnCss}
					onClick={() => {
						navigate('..');
					}}
				>
					Go back
				</Button>
			</div>
			<p css={termsCss}>
				Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam
				condimentum tempus diam, ultricies sollicitudin erat facilisis
				eget. Vestibulum rhoncus dui vel eros laoreet consectetur.
				Vivamus eget elementum ligula, vitae pharetra quam. Nullam at
				ligula sed metu
			</p>
		</>
	);
};
