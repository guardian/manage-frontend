import { css } from '@emotion/react';
import { space, textSans17 } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
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
import { isCancelled } from '../CancellationSummary';
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

const getCaseUpdateWithCancelOutcomeFunc =
	(caseId: string, productDetail: ProductDetail) => () =>
		getUpdateCasePromise(
			productDetail.isTestUser,
			isCancelled(productDetail.subscription) ? '_CANCELLED' : '_ERROR',
			caseId,
			isCancelled(productDetail.subscription)
				? {
						Subject: 'Online Cancellation Completed',
				  }
				: {
						Case_Journey__c: 'Assisted',
						Subject: 'Online Cancellation Error',
						Status: 'New',
						Priority: 'High',
				  },
		);

const escalatedConfirmationBodyCss = css`
	${textSans17};
	margin: ${space[10]}px 0 0;
`;

const returnToAccountButtonCss = css`
	margin-top: ${space[6]}px;
`;

const getCaseUpdatingPrintCancellationSummary =
	(
		productType: ProductType,
		productDetailBeforeCancelling: ProductDetail,
		caseId?: string,
	) =>
	(mdapiResponse: MembersDataApiResponse) => {
		const updatedProductDetail =
			mdapiResponse.products.find(
				(product): product is ProductDetail =>
					isProduct(product) &&
					product.subscription.subscriptionId ===
						productDetailBeforeCancelling.subscription
							.subscriptionId,
			) ?? productDetailBeforeCancelling;

		const render = () => (
			<PrintCancellationSuccess
				productType={productType}
				productDetail={updatedProductDetail}
			/>
		);

		return caseId ? (
			<CaseUpdateAsyncLoader
				fetch={getCaseUpdateWithCancelOutcomeFunc(
					caseId,
					updatedProductDetail,
				)}
				render={render}
				loadingMessage="Finalising your cancellation..."
			/>
		) : (
			render()
		);
	};

interface PrintExecuteCancellationProps {
	productDetail: ProductDetail;
	productType: ProductTypeWithCancellationFlow;
}

export const PrintExecuteCancellation = ({
	productDetail,
	productType,
}: PrintExecuteCancellationProps) => {
	const navigate = useNavigate();
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
				render={() => (
					<div>
						<p css={escalatedConfirmationBodyCss}>
							Your cancellation request has been successfully
							submitted. Our customer service team will try their
							best to contact you as soon as possible to confirm
							the cancellation and refund any credit you are owed.
						</p>
						<Button
							cssOverrides={returnToAccountButtonCss}
							priority="tertiary"
							onClick={() => navigate('/')}
						>
							Return to your account
						</Button>
					</div>
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
				render={getCaseUpdatingPrintCancellationSummary(
					productType,
					productDetail,
					caseId,
				)}
				loadingMessage="Performing your cancellation..."
			/>
		)
	) : (
		<GenericErrorScreen loggingMessage="invalid product detail to cancel" />
	);
};
