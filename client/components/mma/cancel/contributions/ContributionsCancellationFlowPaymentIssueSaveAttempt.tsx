import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	Stack,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
	getMainPlan,
	isPaidSubscriptionPlan,
} from '../../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { trackEventInOphanOnly } from '../../../../utilities/analytics';
import { ContributionUpdateAmountForm } from '../../accountoverview/updateAmount/ContributionUpdateAmountForm';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import type { CancellationReason, SaveBodyProps } from '../cancellationReason';
import { ContributionsFeedbackForm } from './ContributionsCancellationFeedbackForm';
import { getIsPayingMinAmount } from './utils';

export const ContributionsCancellationFlowPaymentIssueSaveAttempt = (
	props: SaveBodyProps,
) => {
	const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const navigate = useNavigate();
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	if (
		!productType.cancellation.reasons ||
		!productDetail ||
		!routerState.selectedReasonId
	) {
		return <Navigate to="../" />;
	}

	const onManageClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_payment_issue',
			eventAction: 'click',
			eventLabel: 'manage',
		});

		navigate('/payment/contributions', { state: { productDetail } });
	};

	const onUpdateConfirmed = (updatedAmount: number) => {
		const reason = productType.cancellation.reasons?.find(
			(reason) => reason.reasonId === routerState.selectedReasonId,
		) as CancellationReason;

		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_payment_issue',
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
			eventCategory: 'cancellation_flow_payment_issue',
			eventAction: 'click',
			eventLabel: 'reduce',
		});

		setShowUpdateForm(true);
	};

	const onCancelClicked = () => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_payment_issue',
			eventAction: 'click',
			eventLabel: 'cancel',
		});

		navigate('../confirmed', {
			state: { ...routerState, caseId: props.caseId },
		});
	};

	const onReturnClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigate('/');
	};

	const mainPlan = getMainPlan(productDetail.subscription);

	if (!isPaidSubscriptionPlan(mainPlan)) {
		Sentry.captureMessage(
			'mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationFlowPaymentIssueSaveAttempt',
		);
		return <GenericErrorMessage />;
	}

	const isPayingMinAmount = getIsPayingMinAmount(mainPlan);

	return (
		<Stack space={6}>
			<Stack space={6}>
				<p>
					Before cancelling your contribution, please double-check
					your payment details. You can update these quickly and
					easily.
				</p>

				<div
					css={css`
						& > * + * {
							margin-left: ${space[4]}px;
						}
					`}
				>
					<LinkButton
						href="/payment/contributions"
						onClick={onManageClicked}
					>
						Manage payment method
					</LinkButton>

					{isPayingMinAmount && (
						<Button onClick={onCancelClicked} priority="subdued">
							I still want to cancel
						</Button>
					)}
				</div>
			</Stack>
			{!isPayingMinAmount && (
				<div>
					<p>
						If your contribution is no longer affordable, please
						consider reducing its size rather than cancelling it.
						Simply pick a new amount and we’ll do the rest.
					</p>

					{showAmountUpdateForm ? (
						<ContributionUpdateAmountForm
							currentAmount={mainPlan.price / 100}
							subscriptionId={
								productDetail.subscription.subscriptionId
							}
							mainPlan={mainPlan}
							productType={PRODUCT_TYPES.contributions}
							nextPaymentDate={
								productDetail.subscription.nextPaymentDate
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
							<Button
								onClick={onReduceClicked}
								priority="secondary"
							>
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
				</div>
			)}
			{props.caseId && (
				<div
					css={css`
						margin-top: ${space[9]}px;
					`}
				>
					<ContributionsFeedbackForm
						isTestUser={productDetail.isTestUser}
						caseId={props.caseId}
					/>
				</div>
			)}
			<div
				css={css`
					margin-top: ${space[12]}px;
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
		</Stack>
	);
};
