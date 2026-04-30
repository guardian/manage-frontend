import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';
import { cancellationFormatDate } from '@/shared/dates';
import { featureSwitches } from '@/shared/featureSwitches';
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
import {
	createProductDetailFetcher,
	isPrintProduct,
} from '../../../../utilities/productUtils';
import { GenericErrorScreen } from '../../../shared/GenericErrorScreen';
import { AsyncLoader } from '../../shared/AsyncLoader';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import {
	cancellationEffectiveToday,
	CancellationReasonContext,
} from '../cancellationContexts';
import { generateEscalationCausesList } from '../cancellationFlowEscalationCheck';
import type {
	CancellationReasonId,
	OptionalCancellationReasonId,
} from '../cancellationReason';
import { getCancellationSummary, isCancelled } from '../CancellationSummary';
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from '../caseUpdate';

interface RouterState extends CancellationRouterState {
	eligibleForFreePeriodOffer?: boolean;
	eligibleForPause?: boolean;
}

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
						Subject: 'Online Cancellation Completed',
				  }
				: {
						Case_Journey__c: 'Assisted',
						Subject: 'Online Cancellation Error',
						Status: 'New',
						Priority: 'High',
				  },
		);

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

const printSuccessBodyCss = css`
	${textSans15};

	margin: 0;
	margin-bottom: ${space[8]}px;

	p {
		margin: 0;
	}

	p + p {
		margin-top: ${space[2]}px;
	}

	${from.tablet} {
		${textSans17};
		margin-bottom: ${space[10]}px;
	}
`;

const printSuccessBannerCss = css`
	background-color: ${palette.culture[800]};
	display: flex;
	flex-direction: column-reverse;
	align-items: stretch;

	${from.tablet} {
		flex-direction: row;
	}
`;

const printSuccessBannerContentCss = css`
	flex: 1;
	padding: ${space[3]}px 0 ${space[6]}px ${space[3]}px;
`;

const printSuccessBannerHeadingCss = css`
	${textSansBold17};
	margin: 0 0 ${space[1]}px;

	${from.tablet} {
		${textSansBold20};
	}
`;

const printSuccessBannerBodyCss = css`
	${textSans15};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${textSans17};
		margin: 0 0 ${space[6]}px;
	}
`;

const printSuccessBannerGraphicCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: center;
	padding: ${space[3]}px;
	max-width: 191px;

	${from.tablet} {
		padding: ${space[3]}px ${space[10]}px ${space[1]}px ${space[10]}px;
	}
`;

interface PrintCancellationSuccessProps {
	productType: ProductType;
	productDetail: ProductDetail;
}

//
const PrintCancellationSuccess = ({
	productType,
	productDetail,
}: PrintCancellationSuccessProps) => {
	const navigate = useNavigate();
	const { getUser } = useAccountStore();
	const user = getUser();
	const supporterName = user?.firstName?.trim() || 'supporter';
	const cancellationDate = productDetail.subscription
		.cancellationEffectiveDate
		? cancellationFormatDate(
				productDetail.subscription.cancellationEffectiveDate,
		  )
		: 'the end of your current billing period';
	const confirmationEmail = user?.email || 'your registered email address';

	return (
		<>
			<section>
				<h2
					css={css`
						${headlineBold24}
						margin: ${space[5]}px 0 ${space[2]}px;

						${from.tablet} {
							${headlineBold28}
							margin: ${space[10]}px 0 ${space[3]}px;
						}
					`}
				>
					Your subscription to {productType.productTitle()} has been
					cancelled.
				</h2>
				<div css={printSuccessBodyCss}>
					<p>
						Your cancellation will take effect on{' '}
						<strong
							css={css`
								${textSansBold15};

								${from.tablet} {
									${textSansBold17};
								}
							`}
						>
							{cancellationDate}.
						</strong>
					</p>
					<p>
						You will receive a confirmation email to{' '}
						{confirmationEmail} in the next 24 hours.
					</p>
				</div>
			</section>

			<section css={printSuccessBannerCss}>
				<div css={printSuccessBannerContentCss}>
					<h3 css={printSuccessBannerHeadingCss}>
						Thank you, {supporterName}
					</h3>
					<p css={printSuccessBannerBodyCss}>
						Your support has played a vital role in keeping
						independent journalism open to all.
					</p>
					<Button
						onClick={() => navigate('/')}
						cssOverrides={css`
							width: 100%;

							${from.tablet} {
								width: auto;
							}
						`}
					>
						Continue reading the Guardian
					</Button>
				</div>
				<picture css={printSuccessBannerGraphicCss}>
					<source
						srcSet="https://i.guim.co.uk/img/media/498a685af6226b7b1b4361a447ad042231d3315b/0_0_586_580/586.png?width=586&quality=100&s=164dd39f999b91d6a913ecdcd6641ec7"
						media="(min-width: 740px)"
					/>
					<img
						src="https://i.guim.co.uk/img/media/498a685af6226b7b1b4361a447ad042231d3315b/0_0_586_580/586.png?width=586&quality=100&s=164dd39f999b91d6a913ecdcd6641ec7"
						alt=""
					/>
				</picture>
			</section>
		</>
	);
};

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

export const getCancellationSummaryWithReturnButton =
	(body: ReactNode, excludeReturnButton?: boolean) => () =>
		(
			<div>
				{body}
				{!excludeReturnButton && <ReturnToAccountButton />}
			</div>
		);

const getCaseUpdatingCancellationSummary =
	(
		productType: ProductTypeWithCancellationFlow,
		productDetailBeforeCancelling: ProductDetail,
		eligableForOffer?: boolean,
		eligibleForPause?: boolean,
		cancellationReasonId?: CancellationReasonId,
		caseId?: string,
	) =>
	(mdapiResponse: MembersDataApiResponse) => {
		const productDetail = (mdapiResponse.products[0] as ProductDetail) || {
			subscription: {},
		};

		const render = getCancellationSummaryWithReturnButton(
			getCancellationSummary(
				productType,
				productDetail,
				productDetailBeforeCancelling,
				eligableForOffer,
				eligibleForPause,
				cancellationReasonId,
			),
			!!productType.cancellation?.shouldShowReminder || eligibleForPause,
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

export const ExecuteCancellation = () => {
	const location = useLocation();
	const routerState = location.state as RouterState | null;

	const { productDetail, productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const {
		selectedReasonId: printSelectedReasonId,
		caseId: printCaseId,
		cancellationPolicy: printCancellationPolicy,
		holidayStops: printHolidayStops,
		deliveryCredits: printDeliveryCredits,
		eligibleForFreePeriodOffer: printEligibleForFreePeriodOffer,
	} = usePrintCancellationStore();
	const isPrintProductType = isPrintProduct(productType);
	const selectedReasonId = isPrintProductType
		? printSelectedReasonId
		: routerState?.selectedReasonId;
	const caseId = isPrintProductType ? printCaseId : routerState?.caseId;
	const cancellationPolicy = isPrintProductType
		? printCancellationPolicy
		: routerState?.cancellationPolicy;
	const holidayStops = isPrintProductType
		? printHolidayStops
		: routerState?.holidayStops;
	const deliveryCredits = isPrintProductType
		? printDeliveryCredits
		: routerState?.deliveryCredits;
	const eligibleForFreePeriodOffer = isPrintProductType
		? printEligibleForFreePeriodOffer
		: routerState?.eligibleForFreePeriodOffer;
	const eligibleForPause = routerState?.eligibleForPause;

	const cancellationReasonId = useContext(CancellationReasonContext);
	const productHasReasonSelection = productType.cancellation.reasons?.length
		? true
		: false;

	if (
		(!isPrintProductType && !routerState) ||
		(productHasReasonSelection && (!selectedReasonId || !caseId))
	) {
		return <Navigate to="../" />;
	}
	const alternativeIsOffer = productType.productType === 'supporterplus';
	const alternativeIsPause = productType.productType === 'contributions';

	const escalationCauses = generateEscalationCausesList({
		isEffectiveToday: cancellationPolicy === cancellationEffectiveToday,
		hasOutstandingHolidayStops: !!holidayStops && holidayStops.length > 0,
		hasOutstandingDeliveryProblemCredits:
			!!deliveryCredits && deliveryCredits.length > 0,
	});

	const useProgressStepper =
		(featureSwitches.supporterplusCancellationOffer &&
			productType.productType === 'supporterplus') ||
		(featureSwitches.contributionCancellationPause &&
			productType.productType === 'contributions');

	return (
		<>
			{(alternativeIsOffer && !eligibleForFreePeriodOffer) ||
				(alternativeIsPause && !eligibleForPause && (
					<>
						{useProgressStepper ? (
							<ProgressStepper
								steps={[{}, {}, {}, { isCurrentStep: true }]}
								additionalCSS={css`
									margin: ${space[5]}px 0 ${space[12]}px;
								`}
							/>
						) : (
							<ProgressIndicator
								steps={[
									{ title: 'Reason' },
									{ title: 'Review' },
									{
										title: 'Confirmation',
										isCurrentStep: true,
									},
								]}
								additionalCSS={css`
									margin: ${space[5]}px 0 ${space[12]}px;
								`}
							/>
						)}
					</>
				))}

			{isProduct(productDetail) ? (
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
						render={
							isPrintProductType
								? getPrintCancellationSuccessSummary(
										productType,
										productDetail,
								  )
								: getCaseUpdatingCancellationSummary(
										productType,
										productDetail,
										eligibleForFreePeriodOffer,
										eligibleForPause,
										cancellationReasonId,
										caseId,
								  )
						}
						loadingMessage="Performing your cancellation..."
					/>
				)
			) : (
				<GenericErrorScreen loggingMessage="invalid product detail to cancel" />
			)}
		</>
	);
};
