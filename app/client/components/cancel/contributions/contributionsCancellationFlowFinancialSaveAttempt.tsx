import { css } from '@emotion/core';
import { Button, LinkButton } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { SvgArrowLeftStraight } from '@guardian/src-icons';
import { navigate } from '@reach/router';
import * as Sentry from '@sentry/browser';
import { useState } from 'react';
import * as React from 'react';
import {
	isPaidSubscriptionPlan,
	MembersDataApiItemContext,
} from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { ContributionUpdateAmountForm } from '../../accountoverview/contributionUpdateAmountForm';
import { trackEventInOphanOnly } from '../../../services/analytics';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import { getIsPayingMinAmount } from './utils';

const container = css`
	& > * + * {
		margin-top: ${space[6]}px;
	}
`;

const ContributionsCancellationFlowFinancialSaveAttempt: React.FC = () => {
	const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

	const onUpdateConfirmed = (updatedAmount: number) => {
		trackEventInOphanOnly({
			eventCategory: 'cancellation_flow_financial_circumstances',
			eventAction: 'click',
			eventLabel: 'change',
		});

		navigate(`mma_financial_circumstances/saved`, {
			state: { updatedAmount },
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

		navigate(`mma_financial_circumstances/confirmed`);
	};

	const onReturnClicked = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		navigate('/');
	};

	return (
		<MembersDataApiItemContext.Consumer>
			{(productDetail) => {
				if (!isProduct(productDetail)) {
					Sentry.captureMessage(
						'MembersDataApiItem is not a productDetail in ContributionsCancellationFlowFinancialSaveAttempt',
					);
					return <GenericErrorMessage />;
				}

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
									We understand that financial circumstances
									change, and your current contribution might
									not suit you right now.
								</div>

								<Button onClick={onCancelClicked}>
									Confirm cancellation
								</Button>
							</>
						) : (
							<>
								<div>
									We understand that financial circumstances
									change. If you can, we hope you’ll consider
									reducing the size of your contribution today
									rather than cancelling it. Simply pick a new
									amount and we’ll do the rest.
								</div>

								{showAmountUpdateForm ? (
									<ContributionUpdateAmountForm
										currentAmount={mainPlan.amount / 100}
										subscriptionId={
											productDetail.subscription
												.subscriptionId
										}
										mainPlan={mainPlan}
										productType={
											PRODUCT_TYPES.contributions
										}
										nextPaymentDate={
											productDetail.subscription
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
			}}
		</MembersDataApiItemContext.Consumer>
	);
};

export default ContributionsCancellationFlowFinancialSaveAttempt;
