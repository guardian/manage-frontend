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
import { usePrintCancellationStore } from '@/client/stores/PrintCancellationStore';
import {
	DATE_FNS_LONG_OUTPUT_FORMAT,
	dateString,
	parseDate,
} from '@/shared/dates';
import type { ProductDetail } from '../../../../../shared/productResponse';
import type { ProductTypeWithCancellationFlow } from '../../../../../shared/productTypes';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type { OptionalCancellationReasonId } from '../cancellationReason';

interface PrintConfirmCancellationProps {
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

export const PrintConfirmCancellation = ({
	productDetail,
	productType,
}: PrintConfirmCancellationProps) => {
	const navigate = useNavigate();
	const { getUser } = useAccountStore();
	const printSelectedReasonId: OptionalCancellationReasonId =
		usePrintCancellationStore((state) => state.selectedReasonId);
	const printCaseId: string = usePrintCancellationStore(
		(state) => state.caseId,
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
	const supporterNamePrefix = supporterFirstName
		? `${supporterFirstName}, `
		: '';
	const thankWord = supporterNamePrefix ? 'thank' : 'Thank';
	const subscriptionEndDate = subscription.potentialCancellationDate
		? parseDate(
				subscription.potentialCancellationDate,
				'yyyy-MM-dd',
		  ).dateStr(DATE_FNS_LONG_OUTPUT_FORMAT)
		: undefined;

	if (!printSelectedReasonId || !printCaseId) {
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
				Previous
			</Button>
			<ProgressStepper
				steps={[{}, {}, { isCurrentStep: true }]}
				additionalCSS={stepperCss}
			/>
			<h2 css={titleCss}>
				{`${supporterNamePrefix}${thankWord} you for supporting the Guardian since ${supportSinceDate}. Is this really goodbye?`}
			</h2>
			<div css={bodyCss}>
				<p>
					Your continued support has ensured that our independent
					journalism remains open to all. We couldn&apos;t do what we
					do without you. Please consider remaining a supporter.
				</p>
				<p>
					By confirming the cancellation of the renewal of your{' '}
					{productType.productTitle()} subscription, you will no
					longer be supporting the Guardian&apos;s reader-funded
					journalism.
				</p>
				<p>
					<strong css={endDateTextCss}>
						{subscriptionEndDate
							? `Your subscription ends on ${subscriptionEndDate}.`
							: 'Your subscription will end at the end of your current billing period.'}
					</strong>
				</p>
				<p>
					Until then, you will retain all your current subscription
					benefits.
				</p>
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
						Previous
					</Button>
					<Button
						onClick={() => {
							navigate('../confirmed');
						}}
					>
						Confirm cancellation
					</Button>
				</div>
			</div>
		</>
	);
};
