import { css } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import {
	Stack,
	SvgCalendar,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { UpdateAmount } from '@/client/components/mma/accountoverview/updateAmount/UpdateAmount';
import { BasicProductInfoTable } from '@/client/components/mma/shared/BasicProductInfoTable';
import { getNextPaymentDetails } from '@/client/components/mma/shared/NextPaymentDetails';
import { PaymentDetails } from '@/client/components/mma/shared/PaymentDetails';
import {
	iconListCss,
	listWithDividersCss,
	whatHappensNextIconCss,
} from '@/client/styles/GenericStyles';
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
	createProductDetailFetcher,
	hasDeliveryRecordsFlow,
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
import { LinkButton } from '../shared/Buttons';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { ProductDescriptionListTable } from '../shared/ProductDescriptionListTable';
import { NewsletterOptinSection } from './NewsletterOptinSection';
import { SixForSixExplainerIfApplicable } from './SixForSixExplainer';

const subHeadingTitleCss = `
    font-size: 2.125rem;
    font-weight: bold;
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
const subHeadingBorderTopCss = `
    margin: 16px 0 32px;
  `;
export const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;

interface InnerContentProps {
	manageProductProps: WithProductType<ProductType>;
	productDetail: ProductDetail;
}

const InnerContent = ({
	manageProductProps,
	productDetail,
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
		featureSwitches.supporterPlusUpdateAmount;

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
					Manage{' '}
					{specificProductType.productTitle(mainPlan).toLowerCase()}
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
						${textSans.medium()};
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
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 16px;
				`}
			>
				Payment
			</h2>

			<section
				css={css`
					border-bottom: 1px solid ${palette.neutral[86]};
					padding-bottom: ${space[5]}px;
				`}
			>
				<Stack space={5}>
					<div
						css={css`
							border-top: 1px solid ${palette.neutral[86]};
							padding-bottom: ${space[1]}px;
						`}
					></div>
					<ul
						css={[
							iconListCss,
							listWithDividersCss,
							whatHappensNextIconCss,
						]}
					>
						<li>
							<SvgClock size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Next payment
								</strong>
								<br />
								{nextPaymentDetails?.paymentValue}
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Next payment date
								</strong>
								<br />{' '}
								{nextPaymentDetails?.nextPaymentDateValue}
							</span>
						</li>
						<li>
							<SvgCreditCard size="medium" />
							<span data-qm-masking="blocklist">
								<strong
									css={css`
										padding-bottom: ${space[1]}px;
									`}
								>
									Payment Method
								</strong>
								<br />{' '}
								<PaymentDetails
									subscription={productDetail.subscription}
								/>
							</span>
						</li>
					</ul>
				</Stack>
			</section>

			<SixForSixExplainerIfApplicable
				additionalCss={css`
					${textSans.medium()};
				`}
				mainPlan={mainPlan}
				hasCancellationPending={hasCancellationPending}
			/>
			{productDetail.isPaidTier &&
				productDetail.subscription.safeToUpdatePaymentMethod &&
				!productDetail.subscription.payPalEmail && (
					<LinkButton
						colour={
							productDetail.alertText
								? palette.brand[400]
								: palette.brand[800]
						}
						textColour={
							productDetail.alertText
								? palette.neutral[100]
								: palette.brand[400]
						}
						fontWeight={'bold'}
						alert={!!productDetail.alertText}
						text="Update payment method"
						to={`/payment/${specificProductType.urlPart}`}
						state={{ productDetail: productDetail }}
					/>
				)}

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
							${textSans.medium()}
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
								${textSans.medium()}
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
								${textSans.medium()}
							`}
						>
							To renew this one-off{' '}
							{specificProductType.friendlyName()}, please contact
							us.
						</p>
						<CallCentreEmailAndNumbers />
						<p
							css={css`
								${textSans.medium()}
							`}
						>
							Alternatively, if you would prefer to start a
							recurring {specificProductType.friendlyName()} you
							can explore payment options and subscribe online by
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

			{!hasCancellationPending && (
				<CancellationCTA
					productDetail={productDetail}
					friendlyName={groupedProductType.friendlyName()}
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
				margin: ${space[24]}px 0 0 auto;
				${textSans.medium()}
				color: ${palette.neutral[46]};
			`}
		>
			{shouldContactUsToCancel &&
				`Would you like to cancel your ${props.friendlyName}? `}
			<Link
				css={css`
					color: ${palette.brand['500']};
				`}
				to={'/cancel/' + props.specificProductType.urlPart}
				state={{ productDetail: props.productDetail }}
			>
				{shouldContactUsToCancel
					? 'Contact us'
					: `Cancel ${props.friendlyName}`}
			</Link>
		</div>
	);
};

interface ManageProductRouterState {
	productDetail: ProductDetail;
}

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
			pageTitle={`Your ${
				GROUPED_PRODUCT_TYPES[props.productType.groupedProductType]
					.shortFriendlyName ||
				GROUPED_PRODUCT_TYPES[
					props.productType.groupedProductType
				].friendlyName()
			}`}
			minimalFooter
		>
			{productDetail ? (
				<InnerContent
					manageProductProps={props}
					productDetail={productDetail}
				/>
			) : (
				<AsyncLoadedInnerContent {...props} />
			)}
		</PageContainer>
	);
};
