import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textEgyptian17,
	textSans17,
} from '@guardian/source/foundations';
import {
	Button,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { measure } from '@/client/styles/typography';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { isPrintProduct } from '@/client/utilities/productUtils';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
	parseDate,
} from '@/shared/dates';
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

const printCopyCss = css`
	${textSans17};

	p + p {
		margin-top: ${space[4]}px;
	}
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
	const { getUser } = useAccountStore();
	const user = getUser();

	const subscription = productDetail.subscription;
	const isPrintProductType = isPrintProduct(productType);

	const productIsSubscription = productType.productType === 'supporterplus'; // will we migrate other product like Guardian weekly over to this cancellation flow at some point?
	const productIsContribution = productType.productType === 'contributions';
	const productIsGuardianAdLite =
		productType.productType === 'guardianadlite';

	const isInTrialPeriod = subscription.trialLength > 0;

	const progressStepperArray = [
		{},
		{},
		{ isCurrentStep: !routerState.eligibleForFreePeriodOffer },
		{ isCurrentStep: routerState.eligibleForFreePeriodOffer },
	];

	const supportSinceDate = dateString(
		new Date(productDetail.joinDate),
		DATE_FNS_LONG_OUTPUT_FORMAT,
	);
	const supporterNamePrefix = user?.firstName ? `${user.firstName}, ` : '';
	const subscriptionEndDate = subscription.potentialCancellationDate
		? parseDate(
				subscription.potentialCancellationDate,
				'yyyy-MM-dd',
		  ).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)
		: undefined;

	useEffect(() => {
		pageTitleContext.setPageTitle(
			isPrintProductType
				? 'Manage subscription'
				: `Cancel ${groupedProductType.friendlyName}`,
		);
	}, [groupedProductType.friendlyName, isPrintProductType, pageTitleContext]);

	if (isPrintProductType) {
		if (!routerState?.selectedReasonId || !routerState?.caseId) {
			return <Navigate to="../review" />;
		}

		return (
			<>
				<ProgressStepper
					steps={[{}, {}, { isCurrentStep: true }]}
					additionalCSS={css`
						margin: ${space[5]}px 0;
						margin-bottom: ${space[8]}px;
						${from.tablet} {
							margin: ${space[10]}px 0;
						}
					`}
				/>
				<h2
					css={css`
						${headlineBold28}
						margin: 0 0 ${space[5]}px;
					`}
				>
					{`${supporterNamePrefix}thank you for supporting the Guardian since ${supportSinceDate}. Is this really goodbye?`}
				</h2>
				<div css={[printCopyCss]}>
					<p>
						Your continued support has ensured that our independent
						journalism remains open to all. We couldn't do what we
						do without you. Please consider remaining a supporter.
					</p>
					<p>
						By confirming the cancellation of the renewal of your{' '}
						{productType.productTitle()} subscription, you will no
						longer be supporting the Guardian's reader-funded
						journalism.
					</p>
					<p>
						<strong>
							{subscriptionEndDate
								? `Your subscription ends on ${subscriptionEndDate}.`
								: 'Your subscription will end at the end of your current billing period.'}
						</strong>
					</p>
					<p>
						Until then, you will retain all your current
						subscription benefits.
					</p>
					<div
						data-cy="cta_container"
						css={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
							gap: `${space[3]}px`,

							[from.tablet]: {
								flexDirection: 'row',
							},
						}}
					>
						<Button
							priority="tertiary"
							icon={<SvgArrowLeftStraight />}
							iconSide="left"
							onClick={() => {
								navigate('../review', {
									state: routerState,
								});
							}}
						>
							Previous
						</Button>
						<Button
							onClick={() => {
								navigate('../confirmed', {
									state: routerState,
								});
							}}
						>
							Confirm cancellation
						</Button>
					</div>
				</div>
			</>
		);
	}

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
				{productIsGuardianAdLite
					? `Cancel your ${productType.productTitle()} subscription`
					: 'Is this really goodbye?'}
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
								If you confirm your cancellation you will start
								to see personalised advertising on the Guardian
								website across your devices from{' '}
								{!isInTrialPeriod &&
								subscription.potentialCancellationDate
									? parseDate(
											subscription.potentialCancellationDate,
											'yyyy-MM-dd',
									  ).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)
									: 'now on'}
								.
							</p>
						</>
					))}
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
						{productIsSubscription || productIsGuardianAdLite
							? 'Keep my subscription'
							: 'Keep supporting'}
					</Button>
				</div>
			</div>
		</>
	);
};
