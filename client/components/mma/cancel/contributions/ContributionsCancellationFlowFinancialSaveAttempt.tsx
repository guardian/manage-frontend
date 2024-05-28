import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
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
import type { SaveBodyProps } from '../cancellationReason';
import { getIsPayingMinAmount } from './utils';

const container = css`
	& > * + * {
		margin-top: ${space[6]}px;
	}
`;

export const ContributionsCancellationFlowFinancialSaveAttempt: React.FC<
	SaveBodyProps
> = ({ caseId }: SaveBodyProps) => {
	const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const navigate = useNavigate();
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	if (!productType || !productDetail || !routerState.selectedReasonId) {
		return <Navigate to="../" />;
	}

	const onUpdateConfirmed = (updatedAmount: number) => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_financial_circumstances',
			eventAction: 'click',
			eventLabel: 'change',
		});

		navigate('../saved', {
			state: { ...routerState, updatedContributionAmount: updatedAmount },
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

		navigate('../confirmed', {
			state: { ...routerState, caseId },
		});
	};

	const onReturnClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigate('/');
	};

	const mainPlan = getMainPlan(productDetail.subscription);

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
