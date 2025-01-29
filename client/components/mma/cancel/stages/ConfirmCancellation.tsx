import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textEgyptian17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { DATE_FNS_LONG_OUTPUT_FORMAT, parseDate } from '@/shared/dates';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
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

const copyCss = css`
	${textEgyptian17};
`;

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

const buttonsCtaHolder = css`
	margin-top: ${space[8]}px;
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
	${from.phablet} {
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
	const productType = cancellationContext.productType;
	const groupedProductType =
		GROUPED_PRODUCT_TYPES[productType.groupedProductType];

	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	const subscription = productDetail.subscription;

	const alternativeIsOffer = productType.productType === 'supporterplus';
	const alternativeIsPause = productType.productType === 'contributions';

	useEffect(() => {
		pageTitleContext.setPageTitle(
			`Cancel ${groupedProductType.friendlyName}`,
		);
	}, [groupedProductType.friendlyName, pageTitleContext]);

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
			<div css={copyCss}>
				{alternativeIsOffer && (
					<>
						<p>
							If you confirm your cancellation, you will lose the
							following benefits:
						</p>
						<ul css={youllLoseList}>
							<li>Unlimited access to the Guardian app</li>
							<li>Ad-free reading across all your devices</li>
							<li>Exclusive supporter newsletter</li>
							<li>
								Far fewer asks for support when you're signed in
							</li>
						</ul>
						{subscription.potentialCancellationDate && (
							<p css={loseDateCss}>
								You will no longer have access to these benefits
								from{' '}
								{parseDate(
									subscription.potentialCancellationDate,
									'yyyy-MM-dd',
								).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)}
								.
							</p>
						)}
					</>
				)}
				{alternativeIsPause && (
					<p>
						If you confirm your cancellation, you will no longer be
						supporting the Guardian's reader-funded journalism.
					</p>
				)}
				<div css={buttonsCtaHolder}>
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
						{alternativeIsOffer && 'Keep my subscription'}
						{alternativeIsPause && 'Keep supporting'}
					</Button>
				</div>
			</div>
		</>
	);
};
