import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { parseDate } from '@/shared/dates';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationPageTitleInterface,
} from '../CancellationContainer';
import {
	CancellationContext,
	CancellationPageTitleContext,
} from '../CancellationContainer';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
	eligibleForFreePeriodOffer: boolean;
}

export const ConfirmCancellation = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	useEffect(() => {
		pageTitleContext.setPageTitle('Cancel subscription');
	}, []);

	const subscription = productDetail.subscription;

	return (
		<>
			<ProgressStepper
				steps={[
					{},
					{},
					{ isCurrentStep: !routerState.eligibleForFreePeriodOffer },
					{ isCurrentStep: routerState.eligibleForFreePeriodOffer },
				]}
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
				Is this really goodbye?
			</Heading>
			<div>
				<p>
					If you confirm your cancellation, you will lose the
					following benefits:
				</p>
				<ul>
					<li>Unlimited access to the Guardian app</li>
					<li>Ad-free reading across all your devices</li>
					<li>Exclusive supporter newsletter</li>
					<li>Far fewer asks for support when you're signed in</li>
				</ul>
				{subscription.nextPaymentDate && (
					<p>
						You will lose/no longer be able to access these benefits
						from{' '}
						{parseDate(
							subscription.nextPaymentDate,
							'yyyy-MM-dd',
						).dateStr()}
						.
					</p>
				)}
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => {
						navigate('../confirmed', {
							state: routerState,
						});
					}}
				>
					Confirm cancellation
				</Button>
				<Button
					iconSide="right"
					onClick={() => {
						navigate('/');
					}}
				>
					Keep my subscription
				</Button>
			</div>
		</>
	);
};
