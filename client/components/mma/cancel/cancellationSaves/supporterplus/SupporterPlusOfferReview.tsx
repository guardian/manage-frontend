import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans12,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { parseDate } from '@/shared/dates';
import { number2words } from '@/shared/numberUtils';
import { getMainPlan, isPaidSubscriptionPlan } from '@/shared/productResponse';
import type { DeliveryRecordDetail } from '../../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../../holiday/HolidayStopApi';
import { Heading } from '../../../shared/Heading';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../../CancellationContainer';
import type { OptionalCancellationReasonId } from '../../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

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

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	pageTitleContext.setPageTitle('Your exclusive offer');

	const yourOfferBoxCss = css`
		border: 1px solid ${palette.neutral[86]};
		padding: ${space[5]}px;
		h4 {
			${textSansBold17};
			margin: 0;
		}
	`;

	const strikethroughPriceCss = css`
		${textSans17};
		color: ${neutral[46]};
		margin: 0;
	`;

	const whatsNextTitleCss = css`
		${textSansBold17};
	`;

	const whatsNextListCss = css`
		padding: 0;
		list-style-position: inside;
		li + li {
			margin-top: ${space[3]}px;
		}
	`;

	const offerBtnCss = css`
		margin-top: ${space[9]}px;
		width: 100%;
		justify-content: center;
	`;

	const cancelButtonCss = css`
		margin: ${space[6]}px 0;
		width: 100%;
		justify-content: center;
	`;

	const termsCss = css`
		${textSans12};
		color: ${palette.neutral[46]};
		margin-top: ${space[3]}px;
	`;

	return (
		<>
			<ProgressStepper
				steps={[{}, {}, {}, { isCurrentStep: true }]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Heading
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
			<h3 css={whatsNextTitleCss}>What will happen next?</h3>
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
			<Button
				cssOverrides={offerBtnCss}
				onClick={() => {
					navigate('../offer-confirmed', {
						state: routerState,
					});
				}}
			>
				Confirm your offer
			</Button>
			<Button
				priority="subdued"
				cssOverrides={cancelButtonCss}
				onClick={() => {
					navigate('..');
				}}
			>
				Go back
			</Button>
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
