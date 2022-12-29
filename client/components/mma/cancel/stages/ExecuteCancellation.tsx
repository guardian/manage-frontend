import {css} from '@emotion/react';
import {space} from '@guardian/source-foundations';
import {Button} from '@guardian/source-react-components';
import type {ReactNode} from 'react';
import {useContext} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import type {ProductDetail} from '../../../../../shared/productResponse';
import {CancelledProductDetail, isProduct, MembersDataApiItem} from '../../../../../shared/productResponse';
import type {
	ProductType,
	ProductTypeWithCancellationFlow,
} from '../../../../../shared/productTypes';
import {fetchWithDefaultParameters} from '../../../../utilities/fetch';
import {createProductDetailFetcher} from '../../../../utilities/productUtils';
import {GenericErrorScreen} from '../../../shared/GenericErrorScreen';
import AsyncLoader from '../../shared/AsyncLoader';
import {ProgressIndicator} from '../../shared/ProgressIndicator';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import {CancellationContext} from '../CancellationContainer';
import {cancellationEffectiveToday} from '../cancellationContexts';
import {generateEscalationCausesList} from '../cancellationFlowEscalationCheck';
import type {OptionalCancellationReasonId} from '../cancellationReason';
import {getCancellationSummary, isCancelled} from '../CancellationSummary';
import {CaseUpdateAsyncLoader, getUpdateCasePromise} from '../caseUpdate';
import useAsyncLoader from "../../shared/useFetch";
import SpinLoader from "../../shared/SpinLoader";

const getCancelFunc =
	(
		subscriptionName: string,
		productType: ProductType,
		reason: OptionalCancellationReasonId,
		withSubscriptionResponseFetcher: () => Promise<Response>,
	) =>
		async () => {
			const isSupporterPlus =
				productType.allProductsProductTypeFilterString === 'SupporterPlus';
			const cancellationApi = isSupporterPlus
				? '/api/supporter-plus-cancel/'
				: '/api/cancel/';
			await fetchWithDefaultParameters(
				`${cancellationApi}${subscriptionName}`,
				{
					method: 'POST',
					body: JSON.stringify({reason}),
					headers: {'Content-Type': 'application/json'},
				},
			); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

			return await withSubscriptionResponseFetcher();
		};

const getCancelFunc2 =
	async (
		subscriptionName: string,
		productType: ProductType,
		reason: OptionalCancellationReasonId,
		withSubscriptionResponseFetcher: () => Promise<Response>,
	) => {
		const isSupporterPlus =
			productType.allProductsProductTypeFilterString === 'SupporterPlus';
		const cancellationApi = isSupporterPlus
			? '/api/supporter-plus-cancel/'
			: '/api/cancel/';
		await fetchWithDefaultParameters(
			`${cancellationApi}${subscriptionName}`,
			{
				method: 'POST',
				body: JSON.stringify({reason}),
				headers: {'Content-Type': 'application/json'},
			},
		); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

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

export const getCaseUpdateWithCancelOutcomeFunc2 =
	(caseId: string, productDetail: ProductDetail) =>
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

const GetCaseUpdatingCancellationSummary =
	(
		caseId: string | '',
		productType: ProductTypeWithCancellationFlow,
		cancelledProductDetail: ProductDetail,
		selectedReasonId?: OptionalCancellationReasonId
	) => {
		const request = getCancelFunc2(
			cancelledProductDetail.subscription.subscriptionId,
			productType,
			selectedReasonId,
			createProductDetailFetcher(
				productType.allProductsProductTypeFilterString,
				cancelledProductDetail.subscription.subscriptionId,
			),
		);

		const {data, loading, error} = useAsyncLoader<ProductDetail[]>(request);

		if (error || !data) {
			return <GenericErrorScreen loggingMessage={false}/>
		}

		if (loading) {
			return <SpinLoader loadingMessage={"Performing your cancellation..."}/>
		}

		const productDetail = data[0] || {subscription: {}};

		if (caseId) {
			<div>
				<CancellationSummary productType={productType} cancelledProductDetail={cancelledProductDetail}
									 productDetail={productDetail}/>
				<ReturnToAccountButton/>
			</div>
		} else {
			return (
				<CancellationSummary productType={productType} cancelledProductDetail={cancelledProductDetail}
									 productDetail={productDetail}/>
			)
		}
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
		return <Navigate to="../"/>;
	}

	const caseId = routerState.caseId as string;

	const {productDetail, productType} = useContext(
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
					{title: 'Reason'},
					{title: 'Review'},
					{title: 'Confirmation', isCurrentStep: true},
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
					<GetCaseUpdatingCancellationSummary caseId={caseId}
														productType={productType}
														cancelledProductDetail={productDetail}
														selectedReasonId={routerState.selectedReasonId}
					/>
				)
			) : (
				<GenericErrorScreen loggingMessage="invalid product detail to cancel"/>
			)}
		</>
	);
};

export default ExecuteCancellation;
