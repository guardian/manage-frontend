import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { ReactNode, useContext } from 'react';
import { isProduct, ProductDetail } from '../../../../shared/productResponse';
import { ProductTypeWithCancellationFlow } from '../../../../shared/productTypes';
import { createProductDetailFetcher } from '../../../productUtils';
import AsyncLoader from '../../asyncLoader';
import { GenericErrorScreen } from '../../genericErrorScreen';
import { ProgressIndicator } from '../../progressIndicator';
import { Button } from '@guardian/source-react-components';
import { cancellationEffectiveToday } from '../cancellationContexts';
import { generateEscalationCausesList } from '../cancellationFlowEscalationCheck';
import { OptionalCancellationReasonId } from '../cancellationReason';
import { getCancellationSummary, isCancelled } from '../cancellationSummary';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from '../caseUpdate';
import { fetchWithDefaultParameters } from '../../../fetch';
import {
	CancellationContext,
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

class PerformCancelAsyncLoader extends AsyncLoader<ProductDetail[]> {}

const getCancelFunc =
	(
		subscriptionName: string,
		reason: OptionalCancellationReasonId,
		withSubscriptionResponseFetcher: () => Promise<Response>,
	) =>
	async () => {
		await fetchWithDefaultParameters('/api/cancel/' + subscriptionName, {
			method: 'POST',
			body: JSON.stringify({ reason }),
			headers: { 'Content-Type': 'application/json' },
		}); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

		return await withSubscriptionResponseFetcher();
	};

const getCaseUpdateWithCancelOutcomeFunc =
	(caseId: string, productDetail: ProductDetail) => () =>
		getUpdateCasePromise(
			productDetail.isTestUser,
			isCancelled(productDetail.subscription) ? '_CANCELLED' : '_ERROR',
			caseId,
			isCancelled(productDetail.subscription)
				? {
						Journey__c: 'SV - Cancellation - MB',
						Subject: 'Online Cancellation Completed',
				  }
				: {
						Subject: 'Online Cancellation Error',
						Status: 'New',
						Priority: 'High',
				  },
		);

const getCaseUpdateFuncForEscalation =
	(caseId: string, escalationCauses: string[], isTestUser: boolean) => () =>
		getUpdateCasePromise(isTestUser, '_ESCALATED', caseId, {
			Journey__c: 'SV - Cancellation - MB',
			Subject: `Online Cancellation MANUAL INTERVENTION REQUIRED - ${escalationCauses.join(
				' & ',
			)}`,
			Status: 'New',
			Priority: 'High',
		});

const ReturnToAccountButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			cssOverrides={css`
				margin-top: ${space[5]}px;
			`}
			priority="tertiary"
			onClick={() => navigate('/')}
		>
			Return to your account
		</Button>
	);
};

const getCancellationSummaryWithReturnButton = (body: ReactNode) => () =>
	(
		<div>
			{body}
			<ReturnToAccountButton />
		</div>
	);

const getCaseUpdatingCancellationSummary =
	(caseId: string | '', productType: ProductTypeWithCancellationFlow) =>
	(productDetails: ProductDetail[]) => {
		const productDetail = productDetails[0] || { subscription: {} };
		const render = getCancellationSummaryWithReturnButton(
			getCancellationSummary(productType)(productDetail),
		);
		return caseId ? (
			<CaseUpdateAsyncLoader
				fetch={getCaseUpdateWithCancelOutcomeFunc(
					caseId,
					productDetail,
				)}
				render={render}
				loadingMessage="Finalising your cancellation..."
			/>
		) : (
			render()
		);
	};

// TODO consider returning case number from API and displaying
const escalatedConfirmationBody = (
	<p>
		Your cancellation request has been successfully submitted. Our customer
		service team will try their best to contact you as soon as possible to
		confirm the cancellation and refund any credit you are owed.
	</p>
);

const ExecuteCancellation = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	if (!routerState?.selectedReasonId || !routerState?.caseId) {
		return <Navigate to="../" />;
	}

	const caseId = routerState.caseId as string;

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const escalationCauses = generateEscalationCausesList({
		isEffectiveToday:
			routerState.cancellationPolicy === cancellationEffectiveToday,
		hasOutstandingHolidayStops:
			!!routerState.holidayStops && routerState.holidayStops.length > 0,
		hasOutstandingDeliveryProblemCredits:
			!!routerState.deliveryCredits &&
			routerState.deliveryCredits.length > 0,
	});

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Reason' },
					{ title: 'Review' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			{isProduct(productDetail) ? (
				escalationCauses.length > 0 ? (
					<CaseUpdateAsyncLoader
						fetch={getCaseUpdateFuncForEscalation(
							caseId,
							escalationCauses,
							productDetail.isTestUser,
						)}
						render={getCancellationSummaryWithReturnButton(
							escalatedConfirmationBody,
						)}
						loadingMessage="Requesting your cancellation..."
					/>
				) : (
					<PerformCancelAsyncLoader
						fetch={getCancelFunc(
							productDetail.subscription.subscriptionId,
							routerState.selectedReasonId,
							createProductDetailFetcher(
								productType,
								productDetail.subscription.subscriptionId,
							),
						)}
						render={getCaseUpdatingCancellationSummary(
							caseId,
							productType,
						)}
						loadingMessage="Performing your cancellation..."
					/>
				)
			) : (
				<GenericErrorScreen loggingMessage="invalid product detail to cancel" />
			)}
		</>
	);
};

export default ExecuteCancellation;