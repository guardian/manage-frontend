import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../../shared/productResponse';
import { isProduct } from '../../../../../shared/productResponse';
import type {
	ProductType,
	ProductTypeWithCancellationFlow,
} from '../../../../../shared/productTypes';
import { usePrintCancellationStore } from '../../../../stores/PrintCancellationStore';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import { createProductDetailFetcher } from '../../../../utilities/productUtils';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { AsyncLoader } from '../../shared/AsyncLoader';
import { cancellationEffectiveToday } from '../cancellationContexts';
import { generateEscalationCausesList } from '../cancellationFlowEscalationCheck';
import type { OptionalCancellationReasonId } from '../cancellationReason';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from '../caseUpdate';
import { PrintCancellationSuccess } from './printCancellationSuccess';

class PerformCancelAsyncLoader extends AsyncLoader<MembersDataApiResponse> {}

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
				body: JSON.stringify({ reason }),
				headers: { 'Content-Type': 'application/json' },
			},
		);

		return await withSubscriptionResponseFetcher();
	};

const getCaseUpdateFuncForEscalation =
	(caseId: string, escalationCauses: string[], isTestUser: boolean) => () =>
		getUpdateCasePromise(isTestUser, '_ESCALATED', caseId, {
			Case_Journey__c: 'Assisted',
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

const getCancellationSummaryWithReturnButton =
	(body: ReactNode, excludeReturnButton?: boolean) => () =>
		(
			<div>
				{body}
				{!excludeReturnButton && <ReturnToAccountButton />}
			</div>
		);

const getPrintCancellationSuccessSummary =
	(productType: ProductType, productDetail: ProductDetail) =>
	(mdapiResponse: MembersDataApiResponse) => {
		const updatedProductDetail =
			mdapiResponse.products.find(
				(product): product is ProductDetail =>
					isProduct(product) &&
					product.subscription.subscriptionId ===
						productDetail.subscription.subscriptionId,
			) ?? productDetail;

		return (
			<PrintCancellationSuccess
				productType={productType}
				productDetail={updatedProductDetail}
			/>
		);
	};

const escalatedConfirmationBody = (
	<p>
		Your cancellation request has been successfully submitted. Our customer
		service team will try their best to contact you as soon as possible to
		confirm the cancellation and refund any credit you are owed.
	</p>
);

interface PrintExecuteCancellationProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
}

export const PrintExecuteCancellation = ({
	productDetail,
	productType,
}: PrintExecuteCancellationProps) => {
	const {
		selectedReasonId,
		caseId,
		cancellationPolicy,
		holidayStops,
		deliveryCredits,
	} = usePrintCancellationStore();
	const productHasReasonSelection =
		!!productType.cancellation.reasons?.length;

	if (productHasReasonSelection && (!selectedReasonId || !caseId)) {
		return <Navigate to="../" />;
	}

	const escalationCauses = generateEscalationCausesList({
		isEffectiveToday: cancellationPolicy === cancellationEffectiveToday,
		hasOutstandingHolidayStops: !!holidayStops && holidayStops.length > 0,
		hasOutstandingDeliveryProblemCredits:
			!!deliveryCredits && deliveryCredits.length > 0,
	});

	return isProduct(productDetail) ? (
		escalationCauses.length > 0 && caseId ? (
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
					productType,
					selectedReasonId,
					createProductDetailFetcher(
						productType.allProductsProductTypeFilterString,
						productDetail.subscription.subscriptionId,
					),
				)}
				render={getPrintCancellationSuccessSummary(
					productType,
					productDetail,
				)}
				loadingMessage="Performing your cancellation..."
			/>
		)
	) : (
		<GenericErrorScreen loggingMessage="invalid product detail to cancel" />
	);
};
