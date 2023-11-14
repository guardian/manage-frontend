import { css } from '@emotion/react';
import {
	headline,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source-react-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { PageContainer } from '@/client/components/mma/Page';
import { ErrorIcon } from '@/client/components/mma/shared/assets/ErrorIcon';
import { JsonResponseHandler } from '@/client/components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '@/client/components/mma/shared/asyncComponents/DefaultLoadingView';
import { BasicProductInfoTable } from '@/client/components/mma/shared/BasicProductInfoTable';
import { getNextPaymentDetails } from '@/client/components/mma/shared/NextPaymentDetails';
import { PaymentDetails } from '@/client/components/mma/shared/PaymentDetails';
import { PaymentFailureAlertIfApplicable } from '@/client/components/mma/shared/PaymentFailureAlertIfApplicable';
import { GenericErrorScreen } from '@/client/components/shared/GenericErrorScreen';
import { NAV_LINKS } from '@/client/components/shared/nav/NavConfig';
import {
	buttonCentredCss,
	stackedButtonLayoutCss,
} from '@/client/styles/ButtonStyles';
import {
	iconListCss,
	listWithDividersCss,
	whatHappensNextIconCss,
} from '@/client/styles/GenericStyles';
import {
	LoadingState,
	useAsyncLoader,
} from '@/client/utilities/hooks/useAsyncLoader';
import { createProductDetailFetcher } from '@/client/utilities/productUtils';
import { cancellationFormatDate } from '@/shared/dates';
import type {
	MembersDataApiResponse,
	ProductDetail,
} from '@/shared/productResponse';
import { getMainPlan, isProduct } from '@/shared/productResponse';
import type { ProductType, WithProductType } from '@/shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';

const subHeadingTitleCss = `
    ${headline.medium()};
    font-weight: bold;
    ${until.tablet} {
      ${headline.xxsmall()};
      line-height: 1.6;
    };
  `;
const subHeadingBorderTopCss = `
    margin: 16px 0 32px;
  `;

interface InnerContentProps {
	manageProductV2Props: WithProductType<ProductType>;
	productDetail: ProductDetail;
}

const InnerContent = ({
	manageProductV2Props,
	productDetail,
}: InnerContentProps) => {
	const mainPlan = getMainPlan(productDetail.subscription);
	console.log(mainPlan);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in manageProductV2 page');
	}

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		null,
		!!productDetail.alertText,
	);

	console.log(nextPaymentDetails);

	const specificProductType = manageProductV2Props.productType;

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[specificProductType.groupedProductType];

	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const cancelledCopy =
		specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

	const maybePatronSuffix =
		productDetail.subscription.readerType === 'Patron' ? ' - Patron' : '';

	return (
		<>
			<PaymentFailureAlertIfApplicable productDetails={[productDetail]} />
			<div
				css={css`
					${subHeadingBorderTopCss};
					display: flex;
					align-items: start;
					justify-content: space-between;
				`}
			>
				<h2
					css={css`
						${subHeadingTitleCss};
						margin: 0;
					`}
				>
					Manage{' '}
					{specificProductType.productTitle(mainPlan).toLowerCase()}
					{maybePatronSuffix}
				</h2>
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

			<BasicProductInfoTable
				groupedProductType={groupedProductType}
				productDetail={productDetail}
			/>

			<h2
				css={css`
					${textSans.medium({ fontWeight: 'bold' })}
					font-style: normal;
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
								<>
									<strong
										css={css`
											padding-bottom: ${space[1]}px;
										`}
									>
										Next payment
									</strong>
									<br /> {nextPaymentDetails?.paymentValue}
								</>
							</span>
						</li>
						<li>
							<SvgCalendar size="medium" />
							<span>
								<>
									<strong
										css={css`
											padding-bottom: ${space[1]}px;
										`}
									>
										Next payment date
									</strong>{' '}
									<br />
									{nextPaymentDetails?.nextPaymentDateValue}
								</>
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
								<br />
								<PaymentDetails
									subscription={productDetail.subscription}
								/>
							</span>
						</li>
					</ul>
				</Stack>
			</section>

			<section
				css={css`
					margin-top: ${space[4]}px;
				`}
			>
				<div css={stackedButtonLayoutCss}>
					{productDetail.isPaidTier &&
						productDetail.subscription.safeToUpdatePaymentMethod &&
						!productDetail.subscription.payPalEmail && (
							<LinkButton
								href={`/payment/${specificProductType.urlPart}`}
								cssOverrides={buttonCentredCss}
							>
								Update payment method
							</LinkButton>
						)}

					{!hasCancellationPending && (
						<CancellationCTA
							productDetail={productDetail}
							friendlyName={groupedProductType.friendlyName()}
							specificProductType={specificProductType}
						/>
					)}
				</div>
			</section>
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
		<>
			{shouldContactUsToCancel && (
				<div
					css={css`
						${textSans.medium()};
						color: ${palette.neutral[46]};
						margin-top: 16px;
						justify-content: center;
					`}
				>
					Would you like to cancel your {props.friendlyName}?
					<Link
						css={css`
							${textSans.medium()};
							color: ${palette.brand[400]};
							font-weight: 700;
							text-decoration-line: underline;
							justify-content: center;
							margin-left: 5px;
						`}
						to={'/cancel/' + props.specificProductType.urlPart}
						state={{ productDetail: props.productDetail }}
					>
						Contact us
					</Link>
				</div>
			)}

			{!shouldContactUsToCancel && (
				<Link to={'/cancel/' + props.specificProductType.urlPart}>
					{' '}
					Cancel {props.friendlyName}{' '}
				</Link>
			)}
		</>
	);
};

interface ManageProductV2RouterState {
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
			manageProductV2Props={props}
			productDetail={productDetail}
		/>
	);
};

export const ManageProductV2 = (props: WithProductType<ProductType>) => {
	const location = useLocation();
	const routerState = location.state as ManageProductV2RouterState;
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
					manageProductV2Props={props}
					productDetail={productDetail}
				/>
			) : (
				<AsyncLoadedInnerContent {...props} />
			)}
		</PageContainer>
	);
};
