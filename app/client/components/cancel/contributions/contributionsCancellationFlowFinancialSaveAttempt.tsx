import { css } from '@emotion/core';
import { Button, LinkButton } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { SvgArrowLeftStraight } from '@guardian/src-icons';
import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import {
	isPaidSubscriptionPlan,
} from '../../../../shared/productResponse';
import { getMainPlan } from '../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { ContributionUpdateAmountForm } from '../../accountoverview/contributionUpdateAmountForm';
import { trackEventInOphanOnly } from '../../../services/analytics';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import { getIsPayingMinAmount } from './utils';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CancellationRouterState } from '../CancellationContainer';
import { CancellationReason } from '../cancellationReason';

const container = css`
	& > * + * {
		margin-top: ${space[6]}px;
	}
`;

const ContributionsCancellationFlowFinancialSaveAttempt = () => {
	const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const navigate = useNavigate();

	if (
		!routerState.productType ||
		!routerState.productDetail ||
		!routerState.selectedReasonId
	) {
		return <Navigate to="../" />;
	}

	const onUpdateConfirmed = (updatedAmount: number) => {
		const reason = routerState.productType?.cancellation.reasons.find(
			(reason) => reason.reasonId === routerState.selectedReasonId,
		) as CancellationReason;

		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_financial_circumstances',
			eventAction: 'click',
			eventLabel: 'change',
		});

		navigate('../saved', {
			state: {
				...routerState,
				updatedContributionAmount: updatedAmount,
				selectedReason: reason,
			},
		});
	};

	const onReduceClicked = () => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_financial_circumstances',
			eventAction: 'click',
			eventLabel: 'reduce',
		});

		setShowUpdateForm(true);
	};

	const onCancelClicked = () => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_financial_circumstances',
			eventAction: 'click',
			eventLabel: 'cancel',
		});

		navigate('../confirmed');
	};

	const onReturnClicked = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		navigate('/');
	};

	const mainPlan = getMainPlan(routerState.productDetail.subscription);

	if (!isPaidSubscriptionPlan(mainPlan)) {
		Sentry.captureMessage(
			'mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationFlowFinancialSaveAttempt',
		);
		return <GenericErrorMessage />;
	}

	const isPayingMinAmount = getIsPayingMinAmount(mainPlan);

	return (
		<div css={container}>
			{isPayingMinAmount ? (
				<>
					<div>
						We understand that financial circumstances change, and
						your current contribution might not suit you right now.
					</div>

					<Button onClick={onCancelClicked}>
						Confirm cancellation
					</Button>
				</>
			) : (
				<>
					<div>
						We understand that financial circumstances change. If
						you can, we hope you’ll consider reducing the size of
						your contribution today rather than cancelling it.
						Simply pick a new amount and we’ll do the rest.
					</div>

					{showAmountUpdateForm ? (
						<ContributionUpdateAmountForm
							currentAmount={mainPlan.amount / 100}
							subscriptionId={
								routerState.productDetail.subscription
									.subscriptionId
							}
							mainPlan={mainPlan}
							productType={PRODUCT_TYPES.contributions}
							nextPaymentDate={
								routerState.productDetail.subscription
									.nextPaymentDate
							}
							mode="CANCELLATION_SAVE"
							onUpdateConfirmed={onUpdateConfirmed}
						/>
					) : (
						<div
							css={css`
								& > * + * {
									margin-left: ${space[4]}px;
								}
							`}
						>
							<Button onClick={onReduceClicked}>
								Reduce amount
							</Button>

							<Button
								onClick={onCancelClicked}
								priority="subdued"
							>
								I still want to cancel
							</Button>
						</div>
					)}
				</>
			)}

			<div
				css={css`
					margin-top: ${space[24]}px;
				`}
			>
				<LinkButton
					href="/"
					onClick={onReturnClicked}
					priority="tertiary"
					icon={<SvgArrowLeftStraight />}
					iconSide="left"
				>
					Return to your account
				</LinkButton>
			</div>
		</div>
	);
};

export default ContributionsCancellationFlowFinancialSaveAttempt;
