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

const headingWithContentAbove = css`
	margin-bottom: ${space[6]}px;
`;
const headingWithoutContentAbove = css`
	margin: ${space[9]}px 0 ${space[6]}px;
`;

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

	const productIsSubscription = productType.productType === 'supporterplus'; // will we migrate other product like Guardian weekly over to this cancellation flow at some point?
	const productIsContribution = productType.productType === 'contributions';
	const productIsGuardianAdLite =
		productType.productType === 'guardianadlite';

	const progressStepperArray = [
		{},
		{},
		{ isCurrentStep: !routerState.eligibleForFreePeriodOffer },
		{ isCurrentStep: routerState.eligibleForFreePeriodOffer },
	];

	useEffect(() => {
		pageTitleContext.setPageTitle(
			`Cancel ${groupedProductType.friendlyName}`,
		);
	}, [groupedProductType.friendlyName, pageTitleContext]);

	return (
		<>
			{productType.cancellation?.reasons && (
				<ProgressStepper
					steps={progressStepperArray}
					additionalCSS={css`
						margin: ${space[8]}px 0 ${space[9]}px;
					`}
				/>
			)}
			<Heading
				borderless
				cssOverrides={[
					measure.heading,
					productType.cancellation?.reasons
						? headingWithContentAbove
						: headingWithoutContentAbove,
				]}
			>
				Is this really goodbye?
			</Heading>
			<div css={copyCss}>
				{(productIsSubscription && (
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
				)) ||
					(productIsContribution && (
						<p>
							If you confirm your cancellation, you will no longer
							be supporting the Guardian's reader-funded
							journalism.
						</p>
					)) ||
					(productIsGuardianAdLite && (
						<>
							<p>
								If you confirm your cancellation, you will lose
								the following benefits:
							</p>
							<ul css={youllLoseList}>
								<li>Unlimited access to the Guardian app</li>
								<li>Ad-free reading across all your devices</li>
								<li>Exclusive supporter newsletter</li>
								<li>
									Far fewer asks for support when you're
									signed in
								</li>
							</ul>
							{subscription.potentialCancellationDate && (
								<p css={loseDateCss}>
									You will no longer have access to these
									benefits from{' '}
									{parseDate(
										subscription.potentialCancellationDate,
										'yyyy-MM-dd',
									).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)}
									.
								</p>
							)}
						</>
					))}
				<div css={buttonsCtaHolder}>
					<Button
						cssOverrides={ctaBtnCss}
						onClick={() => {
							console.log('confirm cancellation click!');
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
						{productIsSubscription || productIsGuardianAdLite
							? 'Keep my subscription'
							: 'Keep supporting'}
					</Button>
				</div>
			</div>
		</>
	);
};
