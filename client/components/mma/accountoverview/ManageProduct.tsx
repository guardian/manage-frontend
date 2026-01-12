import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import { featureSwitches } from '@/shared/featureSwitches';
import { cancellationFormatDate } from '../../../../shared/dates';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	getMainPlan,
	isGift,
	isPaidSubscriptionPlan,
	isProduct,
} from '../../../../shared/productResponse';
import type {
	ProductType,
	WithProductType,
} from '../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import {
	changeSubscriptionBillingFrequencyFetch,
	createProductDetailFetcher,
	hasDeliveryRecordsFlow,
	hasSupporterPlusMonthlyRatePlan,
	isMonthlySubscription,
	isNonServiceableCountry,
	shouldHaveHolidayStopsFlow,
} from '../../../utilities/productUtils';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { DeliveryAddressDisplay } from '../delivery/address/DeliveryAddressDisplay';
import { PageContainer } from '../Page';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { GiftIcon } from '../shared/assets/GiftIcon';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { BasicProductInfoTable } from '../shared/BasicProductInfoTable';
import { LinkButton } from '../shared/Buttons';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaymentDetailsTableV2 } from '../shared/PaymentDetailsTableV2';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { ProductDescriptionListTable } from '../shared/ProductDescriptionListTable';
import { NewsletterOptinSection } from './NewsletterOptinSection';
import { SixForSixExplainerIfApplicable } from './SixForSixExplainer';
import { UpdateAmount } from './updateAmount/UpdateAmount';

const subHeadingTitleCss = `
	${headlineBold28};
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
const subHeadingBorderTopCss = `
    border-top: 1px solid ${palette.neutral['86']};
    margin: 50px 0 ${space[5]}px;
	padding-top: ${space[3]}px;
  `;
export const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;

interface InnerContentProps {
	manageProductProps: WithProductType<ProductType>;
	productDetail: ProductDetail;
	billingFrequencySwitchPreview?: BillingFrequencySwitchPreview;
}

const InnerContent = ({
	manageProductProps,
	productDetail,
	billingFrequencySwitchPreview,
}: InnerContentProps) => {
	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in manageProduct page');
	}

	const specificProductType = manageProductProps.productType;
	const groupedProductType =
		GROUPED_PRODUCT_TYPES[specificProductType.groupedProductType];

	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const cancelledCopy =
		specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

	const [overiddenAmount, setOveriddenAmount] = useState<number | null>(null);
	const isAmountOveridable = specificProductType.updateAmountMdaEndpoint;

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		overiddenAmount,
		!!productDetail.alertText,
	);

	const maybePatronSuffix =
		productDetail.subscription.readerType === 'Patron' ? ' - Patron' : '';

	const showSupporterPlusUpdateAmount =
		specificProductType.productType === 'supporterplus' &&
		featureSwitches.supporterPlusUpdateAmount &&
		!hasCancellationPending &&
		productDetail.subscription.autoRenew;

	return (
		<>
			<PaymentFailureAlertIfApplicable productDetails={[productDetail]} />
			<div
				css={css`
					${subHeadingBorderTopCss}
					display: flex;
					align-items: start;
					justify-content: space-between;
				`}
			>
				<h2
					css={css`
						${subHeadingTitleCss}
						margin: 0;
					`}
				>
					{specificProductType.productTitle(mainPlan)}
					{maybePatronSuffix}
				</h2>
				{isGift(productDetail.subscription) && (
					<i
						css={css`
							margin: 4px 0 0 ${space[3]}px;
						`}
					>
						<GiftIcon alignArrowToThisSide={'left'} />
					</i>
				)}
			</div>

			{hasCancellationPending && (
				<p
					css={css`
						${textSans17};
					`}
				>
					<ErrorIcon fill={palette.brandAlt[200]} />
					<span
						css={css`
							margin-left: ${space[2]}px;
						`}
					>
						{cancelledCopy}{' '}
						<strong>
							{cancellationFormatDate(
								productDetail.subscription
									.cancellationEffectiveDate,
							)}
						</strong>
					</span>
					.
				</p>
			)}

			{(isAmountOveridable || showSupporterPlusUpdateAmount) &&
			!isNonServiceableCountry(productDetail) &&
			isPaidSubscriptionPlan(mainPlan) ? (
				<UpdateAmount
					subscriptionId={productDetail.subscription.subscriptionId}
					mainPlan={mainPlan}
					productType={specificProductType}
					nextPaymentDate={productDetail.subscription.nextPaymentDate}
					amountUpdateStateChange={setOveriddenAmount}
					isTestUser={productDetail.isTestUser}
					futurePlan={productDetail.subscription.futurePlans[0]}
				/>
			) : (
				<BasicProductInfoTable
					groupedProductType={groupedProductType}
					productDetail={productDetail}
				/>
			)}

			<h2
				css={css`
					${subHeadingCss}
				`}
			>
				Payment
			</h2>
			<SixForSixExplainerIfApplicable
				additionalCss={css`
					${textSans17};
				`}
				mainPlan={mainPlan}
				hasCancellationPending={hasCancellationPending}
			/>
			<PaymentDetailsTableV2
				productDetail={productDetail}
				nextPaymentDetails={nextPaymentDetails}
				hasCancellationPending={hasCancellationPending}
				specificProductType={specificProductType}
				billingFrequencySwitchPreview={
					!overiddenAmount ? billingFrequencySwitchPreview : undefined
				}
			/>

			{specificProductType.delivery?.showAddress?.(
				productDetail.subscription,
			) &&
				productDetail.subscription.deliveryAddress && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Delivery address
						</h2>
						<ProductDescriptionListTable
							alternateRowBgColors
							borderColour={palette.neutral[86]}
							content={[
								{
									title: 'Address',
									value: (
										<DeliveryAddressDisplay
											{...productDetail.subscription
												.deliveryAddress}
										/>
									),
									spanTwoCols: true,
								},
								...(specificProductType.delivery
									?.enableDeliveryInstructionsUpdate
									? [
											{
												title: 'Instructions',
												value: productDetail
													.subscription
													.deliveryAddress
													.instructions,
												spanTwoCols: true,
											},
									  ]
									: []),
							]}
						/>
						<LinkButton
							colour={palette.brand[800]}
							textColour={palette.brand[400]}
							fontWeight="bold"
							text="Manage delivery address"
							to={`/delivery/${specificProductType.urlPart}/address`}
							state={productDetail}
						/>
					</>
				)}

			{hasDeliveryRecordsFlow(specificProductType) && (
				<>
					<h2
						css={css`
							${subHeadingCss}
						`}
					>
						Delivery history
					</h2>
					<p
						css={css`
							${textSans17};
						`}
					>
						Check delivery history and report an issue.
					</p>
					<LinkButton
						colour={palette.brand[800]}
						textColour={palette.brand[400]}
						fontWeight="bold"
						text="Manage delivery history"
						to={`/delivery/${specificProductType.urlPart}/records`}
						state={{ productDetail }}
					/>
				</>
			)}

			{shouldHaveHolidayStopsFlow(specificProductType) &&
				productDetail.subscription.autoRenew &&
				!hasCancellationPending && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Going on holiday?
						</h2>
						<p
							css={css`
								${textSans17};
							`}
						>
							Don’t fret - you can manage your suspensions by
							clicking the button below. You will be credited for
							each suspended{' '}
							{specificProductType.holidayStops.issueKeyword} on
							the first bill after the suspension date.
						</p>
						<LinkButton
							colour={palette.brand[800]}
							textColour={palette.brand[400]}
							fontWeight="bold"
							text="Manage suspensions"
							to={`/suspend/${specificProductType.urlPart}`}
							state={{ productDetail }}
						/>
					</>
				)}

			{!productDetail.subscription.autoRenew &&
				specificProductType.renewalMetadata && (
					<>
						<h2
							css={css`
								${subHeadingCss}
							`}
						>
							Renewal
						</h2>
						<p
							css={css`
								${textSans17};
							`}
						>
							To renew this one-off{' '}
							{specificProductType.friendlyName}, please contact
							us.
						</p>
						<CallCentreEmailAndNumbers />
						<p
							css={css`
								${textSans17};
							`}
						>
							Alternatively, if you would prefer to start a
							recurring {specificProductType.friendlyName} you can
							explore payment options and subscribe online by
							clicking the button below.
						</p>
						<SupportTheGuardianButton
							{...specificProductType.renewalMetadata}
							size="small"
						/>
					</>
				)}

			{specificProductType.productPageNewsletterIDs && (
				<NewsletterOptinSection
					activeNewletterIDs={
						specificProductType.productPageNewsletterIDs
					}
				/>
			)}

			{!hasCancellationPending &&
				productDetail.billingCountry !== 'United States' && (
					<CancellationCTA
						productDetail={productDetail}
						friendlyName={groupedProductType.friendlyName}
						specificProductType={specificProductType}
					/>
				)}
		</>
	);
};

interface CancellationCTAProps {
	productDetail: ProductDetail;
	friendlyName: string;
	specificProductType: ProductType;
}

const CancellationCTA = (props: CancellationCTAProps) => {
	const shouldContactUsToCancel =
		!props.productDetail.selfServiceCancellation.isAllowed ||
		!props.specificProductType.cancellation;
	return (
		<div
			css={css`
				margin: ${space[10]}px 0 0 auto;
				${textSans17};
				color: ${palette.neutral[46]};
			`}
		>
			{shouldContactUsToCancel &&
				`Would you like to cancel your ${props.friendlyName}? `}
			<LinkButton
				fontWeight={'bold'}
				to={'/cancel/' + props.specificProductType.urlPart}
				state={{ productDetail: props.productDetail }}
				text={
					shouldContactUsToCancel
						? 'Contact us'
						: `Cancel ${props.friendlyName}`
				}
				hollow
			/>
		</div>
	);
};

interface ManageProductRouterState {
	productDetail: ProductDetail;
}

const AsyncLoadedSwitchBillingFrequencyPreview = ({
	manageProductProps,
	productDetail,
}: {
	manageProductProps: WithProductType<ProductType>;
	productDetail: ProductDetail;
}) => {
	const { data, loadingState } =
		useAsyncLoader<BillingFrequencySwitchPreview>(
			() =>
				changeSubscriptionBillingFrequencyFetch(
					productDetail.isTestUser,
					productDetail.subscription.subscriptionId,
					true,
					'Annual',
				),
			JsonResponseHandler,
		);

	if (loadingState == LoadingState.HasError) {
		// If there's an error loading the preview, just show the regular manage product content
		return (
			<InnerContent
				manageProductProps={manageProductProps}
				productDetail={productDetail}
			/>
		);
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView loadingMessage="Loading your product..." />;
	}

	return (
		<InnerContent
			manageProductProps={manageProductProps}
			productDetail={productDetail}
			billingFrequencySwitchPreview={data!}
		/>
	);
};

const AsyncLoadedInnerContent = (props: WithProductType<ProductType>) => {
	const request = createProductDetailFetcher(
		props.productType.allProductsProductTypeFilterString,
	);

	const { data, loadingState } = useAsyncLoader<MembersDataApiResponse>(
		request,
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView loadingMessage="Loading your product..." />;
	}

	if (data == null || data.products.length == 0) {
		return <Navigate to="/" />;
	}

	const productDetail = data.products.filter(isProduct)[0];

	if (
		isMonthlySubscription(productDetail) &&
		hasSupporterPlusMonthlyRatePlan(productDetail)
	) {
		return (
			<AsyncLoadedSwitchBillingFrequencyPreview
				manageProductProps={props}
				productDetail={productDetail}
			/>
		);
	}

	return (
		<InnerContent
			manageProductProps={props}
			productDetail={productDetail}
		/>
	);
};

export const ManageProduct = (props: WithProductType<ProductType>) => {
	const location = useLocation();
	const routerState = location.state as ManageProductRouterState;
	const productDetail = routerState?.productDetail;

	return (
		<PageContainer
			selectedNavItem={NAV_LINKS.accountOverview}
			pageTitle={`Manage ${
				GROUPED_PRODUCT_TYPES[props.productType.groupedProductType]
					.shortFriendlyName ||
				GROUPED_PRODUCT_TYPES[props.productType.groupedProductType]
					.friendlyName
			}`}
			minimalFooter
		>
			{productDetail ? (
				<>
					{isMonthlySubscription(productDetail) &&
					hasSupporterPlusMonthlyRatePlan(productDetail) ? (
						<AsyncLoadedSwitchBillingFrequencyPreview
							manageProductProps={props}
							productDetail={productDetail}
						/>
					) : (
						<InnerContent
							manageProductProps={props}
							productDetail={productDetail}
						/>
					)}
				</>
			) : (
				<AsyncLoadedInnerContent {...props} />
			)}
		</PageContainer>
	);
};
