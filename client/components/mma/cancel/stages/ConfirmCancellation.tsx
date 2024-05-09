import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import type { DeliveryRecordDetail } from '../../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../../holiday/HolidayStopApi';
import { Heading } from '../../shared/Heading';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface RouterSate extends DiscountPreviewResponse {
	selectedReasonId: OptionalCancellationReasonId;
	cancellationPolicy: string;
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

export const ConfirmCancellation = () => {
	const location = useLocation();
	const routerState = location.state as RouterSate;
	const navigate = useNavigate();

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
				Headline for the cancellation review page
			</Heading>
			<div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Curabitur pharetra, velit id varius pretium, nibh nisi
					sodales.
				</p>
				<ul>
					<li>asdfasdfa</li>
					<li>asdfasdfa</li>
					<li>asdfasdfa</li>
				</ul>
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
