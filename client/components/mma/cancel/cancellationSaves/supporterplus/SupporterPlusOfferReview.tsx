import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import type { DeliveryRecordDetail } from '../../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../../holiday/HolidayStopApi';
import { BenefitsToggle } from '../../../shared/benefits/BenefitsToggle';
import { Heading } from '../../../shared/Heading';
import { ProgressStepper } from '../../../shared/ProgressStepper';
import type { CancellationPageTitleInterface } from '../../CancellationContainer';
import { CancellationPageTitleContext } from '../../CancellationContainer';
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

	const yourOfferBoxCss = css`
		border: 1px solid ${palette.neutral[86]};
		padding: ${space[5]}px;
		${textSans.medium()};
	`;

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	pageTitleContext.setPageTitle('Redeem Offer');

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
				Headline for the review offer page
			</Heading>
			<h3>Your offer</h3>
			<div css={yourOfferBoxCss}>
				<h4>
					{routerState.upToPeriods}{' '}
					{routerState.upToPeriodsType.toLowerCase()} free of your
					All-access digital subscription
				</h4>
				<BenefitsToggle productType="supporterplus" />
			</div>
			<h3>What will happen next?</h3>
			<ul>
				<li>Lorem ipsum dolor sit</li>
				<li>Lorem ipsum dolor sit</li>
				<li>Lorem ipsum dolor sit</li>
			</ul>
			<p>
				You may opt out of your offer and cancel your subscription at
				any time.
			</p>
			<Button
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				onClick={() => {
					navigate('../offer-confirmed', {
						state: routerState,
					});
				}}
			>
				Confirm your {routerState.upToPeriods}{' '}
				{routerState.upToPeriodsType.toLowerCase()} free offer
			</Button>
		</>
	);
};
