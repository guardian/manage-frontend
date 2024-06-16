import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
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

const youllLoseList = css`
	padding: 0;
	padding-inline-start: 14px;
	li + li {
		margin-top: ${space[3]}px;
	}
`;

const loseDateCss = css`
	:before {
		content: '';
		display: block;
		width: 100%;
		max-width: 580px;
		height: 1px;
		background-color: ${palette.neutral[86]};
		margin: ${space[6]}px 0;
	}
	margin: 0;
`;

const buttonHolderCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[4]}px;
	margin-top: ${space[9]}px;
	${from.desktop} {
		flex-direction: row;
	}
`;

const ctaBtnCss = css`
	width: 100%;
	justify-content: center;
	${from.desktop} {
		width: fit-content;
	}
`;

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
				Is this really goodbye?
			</Heading>
			<div>
				<p>
					If you confirm your cancellation, you will lose the
					following benefits:
				</p>
				<ul css={youllLoseList}>
					<li>Unlimited access to the Guardian app</li>
					<li>Ad-free reading across all your devices</li>
					<li>Exclusive supporter newsletter</li>
					<li>Far fewer asks for support when you're signed in</li>
				</ul>
				{subscription.nextPaymentDate && (
					<p css={loseDateCss}>
						You will lose/no longer be able to access these benefits
						from{' '}
						{parseDate(
							subscription.nextPaymentDate,
							'yyyy-MM-dd',
						).dateStr()}
						.
					</p>
				)}
				<div css={buttonHolderCss}>
					<Button
						cssOverrides={ctaBtnCss}
						onClick={() => {
							navigate('../confirmed', {
								state: routerState,
							});
						}}
					>
						Confirm cancellation
					</Button>
					<Button
						cssOverrides={ctaBtnCss}
						priority="tertiary"
						onClick={() => {
							navigate('/');
						}}
					>
						Keep my subscription
					</Button>
				</div>
			</div>
		</>
	);
};
