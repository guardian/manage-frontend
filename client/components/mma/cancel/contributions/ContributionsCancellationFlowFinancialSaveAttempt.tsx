import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgSpinner,
} from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { DiscountPreviewResponse } from '@/client/utilities/discountPreview';
import { fetchWithDefaultParameters } from '@/client/utilities/fetch';
import { cancelAlternativeUrlPartLookup } from '@/shared/cancellationUtilsAndTypes';
import { featureSwitches } from '@/shared/featureSwitches';
import type { TrueFalsePending } from '@/shared/generalTypes';
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

const buttonsCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	${from.tablet} {
		flex-direction: row;
	}
`;

const buttonCss = css`
	justify-content: center;
	${from.tablet} {
		&:last-child {
			margin-left: auto;
		}
	}
`;

export const ContributionsCancellationFlowFinancialSaveAttempt: React.FC<
	SaveBodyProps
> = ({ caseId, holidayStops, deliveryCredits }: SaveBodyProps) => {
	const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const navigate = useNavigate();
	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const isSupporterPlusAndFreePeriodOfferIsActive =
		featureSwitches.supporterplusCancellationOffer &&
		productType.productType === 'supporterplus';

	const isContributionAndBreakFeatureIsActive =
		featureSwitches.contributionCancellationPause &&
		productType.productType === 'contributions';

	const [
		showAlternativeBeforeCancelling,
		setShowAlternativeBeforeCancelling,
	] = useState<TrueFalsePending>(
		isSupporterPlusAndFreePeriodOfferIsActive ||
			isContributionAndBreakFeatureIsActive
			? 'pending'
			: false,
	);

	const [discountPreviewDetails, setDiscountPreviewDetails] =
		useState<DiscountPreviewResponse | null>(null);

	useEffect(() => {
		if (
			isSupporterPlusAndFreePeriodOfferIsActive ||
			isContributionAndBreakFeatureIsActive
		) {
			(async () => {
				try {
					const response = await fetchWithDefaultParameters(
						'/api/discounts/preview-discount',
						{
							method: 'POST',
							body: JSON.stringify({
								subscriptionNumber:
									productDetail.subscription.subscriptionId,
							}),
						},
					);

					if (response.ok) {
						// api returns a 400 response if the user is not eligible
						setShowAlternativeBeforeCancelling(true);
						const offerData = await response.json();
						setDiscountPreviewDetails(offerData);
					} else {
						setShowAlternativeBeforeCancelling(false);
					}
				} catch (e) {
					setShowAlternativeBeforeCancelling(false);
				}
			})();
		}
	}, []);

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
		if (showAlternativeBeforeCancelling) {
			const cancelAlternativeUrlPart =
				cancelAlternativeUrlPartLookup[productType.productType] || '';

			navigate(`../${cancelAlternativeUrlPart}`, {
				state: {
					...routerState,
					...discountPreviewDetails,
					caseId,
					holidayStops,
					deliveryCredits,
				},
			});
		} else {
			trackEventInOphanOnly({
				eventCategory: 'cancellation_flow_financial_circumstances',
				eventAction: 'click',
				eventLabel: 'cancel',
			});

			navigate('../confirmed', {
				state: { ...routerState, caseId },
			});
		}
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
							withReturnToAccountOverviewButton
						/>
					) : (
						<div css={buttonsCss}>
							<Button
								onClick={onReduceClicked}
								cssOverrides={buttonCss}
							>
								Reduce amount
							</Button>

							<Button
								icon={
									showAlternativeBeforeCancelling ===
									'pending' ? (
										<SvgSpinner size="xsmall" />
									) : undefined
								}
								iconSide="right"
								disabled={
									showAlternativeBeforeCancelling ===
									'pending'
								}
								aria-disabled={
									showAlternativeBeforeCancelling ===
									'pending'
								}
								onClick={onCancelClicked}
								priority="tertiary"
								cssOverrides={buttonCss}
							>
								I still want to cancel
							</Button>

							<LinkButton
								href="/"
								onClick={onReturnClicked}
								priority="subdued"
								cssOverrides={buttonCss}
							>
								Return to your account
							</LinkButton>
						</div>
					)}
				</>
			)}
		</div>
	);
};
