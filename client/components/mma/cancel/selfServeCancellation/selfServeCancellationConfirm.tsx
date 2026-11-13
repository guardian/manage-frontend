import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button,
	SvgArrowLeftStraight,
	SvgChevronLeftSingle,
} from '@guardian/source/react-components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { useSelfServeCancellationStore } from '@/client/stores/SelfServeCancellationStore';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
	parseDate,
} from '@/shared/dates';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../../shared/productTypes';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { OptionalCancellationReasonId } from '../cancellationReason';
import { getConfirmCopy, reviewVariantFor } from './selfServeCancellationCopy';

interface SelfServeCancellationConfirmProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
}

const stepperCss = css`
	margin: ${space[5]}px 0;
	margin-bottom: ${space[8]}px;

	${from.tablet} {
		margin: ${space[10]}px 0;
	}
`;

const titleCss = css`
	${headlineBold24}
	margin: 0 0 ${space[2]}px;

	${from.tablet} {
		${headlineBold28}
		margin-bottom: ${space[5]}px;
	}
`;

const bodyCss = css`
	${textSans15};

	${from.tablet} {
		${textSans17};
	}

	p + p {
		margin-top: ${space[4]}px;
	}
`;

const endDateTextCss = css`
	${textSansBold15};

	${from.tablet} {
		${textSansBold17};
	}
`;

const ctaContainerCss = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
	}
`;

const mobileOnlyPreviousButtonCss = css`
	margin-top: ${space[5]}px;
	text-decoration: none;

	${from.tablet} {
		display: none;
	}
`;

const tabletAndUpPreviousButtonCss = css`
	display: none;

	${from.tablet} {
		display: flex;
	}
`;

export const SelfServeCancellationConfirm = ({
	productDetail,
}: SelfServeCancellationConfirmProps) => {
	const navigate = useNavigate();
	const { getUser } = useAccountStore();
	const selectedReasonId: OptionalCancellationReasonId =
		useSelfServeCancellationStore((state) => state.selectedReasonId);
	const caseId: string = useSelfServeCancellationStore(
		(state) => state.caseId,
	);
	const cancellationMode =
		useSelfServeCancellationStore((state) => state.cancellationMode) ??
		'hard';
	const cancellationEffectiveDate = useSelfServeCancellationStore(
		(state) => state.cancellationEffectiveDate,
	);
	const holidayStops = useSelfServeCancellationStore(
		(state) => state.holidayStops,
	);
	const deliveryCredits = useSelfServeCancellationStore(
		(state) => state.deliveryCredits,
	);
	const user = getUser();
	const subscription = productDetail.subscription;
	const supportSinceDate = dateString(
		new Date(productDetail.joinDate),
		DATE_FNS_LONG_OUTPUT_FORMAT,
	);
	const fallbackFirstName = subscription.account?.accountName
		?.trim()
		.split(/\s+/)[0];
	const supporterFirstName = user?.firstName || fallbackFirstName;
	const hasOutstandingCredit =
		(holidayStops?.length ?? 0) > 0 || (deliveryCredits?.length ?? 0) > 0;
	const reviewVariant = reviewVariantFor(
		cancellationMode,
		hasOutstandingCredit,
	);
	const copy = getConfirmCopy(productDetail, reviewVariant);
	const subscriptionEndDate =
		cancellationMode === 'soft' &&
		cancellationEffectiveDate &&
		cancellationEffectiveDate !== 'now'
			? parseDate(cancellationEffectiveDate).dateStr(
					DATE_FNS_LONG_OUTPUT_FORMAT,
			  )
			: undefined;

	if (!selectedReasonId || !caseId) {
		return <Navigate to="../review" />;
	}

	return (
		<>
			<Button
				priority="subdued"
				cssOverrides={mobileOnlyPreviousButtonCss}
				icon={<SvgChevronLeftSingle />}
				iconSide="left"
				onClick={() => {
					navigate('../review');
				}}
			>
				{copy.previous}
			</Button>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }]}
				additionalCSS={stepperCss}
			/>
			<h2 css={titleCss}>
				{copy.title(supporterFirstName, supportSinceDate)}
			</h2>
			<div css={bodyCss}>
				<p>{copy.supportParagraph}</p>
				<p>{copy.confirmCancellationBody}</p>
				<p>
					<strong css={endDateTextCss}>
						{reviewVariant === 'soft' && subscriptionEndDate
							? copy.subscriptionEndsOn(subscriptionEndDate)
							: copy.subscriptionEndsImmediately}
					</strong>
				</p>
				{copy.detailParagraphs(subscriptionEndDate).map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
				<div data-cy="cta_container" css={ctaContainerCss}>
					<Button
						priority="tertiary"
						icon={<SvgArrowLeftStraight />}
						iconSide="left"
						cssOverrides={tabletAndUpPreviousButtonCss}
						onClick={() => {
							navigate('../review');
						}}
					>
						{copy.previous}
					</Button>
					<Button
						onClick={() => {
							navigate('../confirmed');
						}}
					>
						{copy.confirmCta}
					</Button>
				</div>
			</div>
		</>
	);
};
