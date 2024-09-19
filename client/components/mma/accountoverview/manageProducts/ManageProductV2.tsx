import { css } from '@emotion/react';
import {
	headlineBold20,
	headlineBold34,
	palette,
	space,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	Stack,
	SvgCalendar,
	SvgClock,
	SvgCreditCard,
} from '@guardian/source/react-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/client/components/mma/Page';
import { ErrorIcon } from '@/client/components/mma/shared/assets/ErrorIcon';
import { JsonResponseHandler } from '@/client/components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '@/client/components/mma/shared/asyncComponents/DefaultLoadingView';
import { getNextPaymentDetails } from '@/client/components/mma/shared/NextPaymentDetails';
import { PaymentDetails } from '@/client/components/mma/shared/PaymentDetails';
import { PaymentFailureAlertIfApplicable } from '@/client/components/mma/shared/PaymentFailureAlertIfApplicable';
import { ProductInfoTableV2 } from '@/client/components/mma/shared/ProductInfoTableV2';
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
import {
	getBillingPeriodAdjective,
	GROUPED_PRODUCT_TYPES,
} from '@/shared/productTypes';

const subHeadingTitleCss = `
	${headlineBold34};
    ${until.tablet} {
	  ${headlineBold20};
    };
  `;
const subHeadingBorderTopCss = `
    margin: 16px 0 16px;
  `;

interface InnerContentProps {
	manageProductV2Props: WithProductType<ProductType>;
	productDetail: ProductDetail;
}

const InnerContent = ({
	manageProductV2Props,
	productDetail,
}: InnerContentProps) => {
	const navigate = useNavigate();

	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in manageProductV2 page');
	}

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		null,
		!!productDetail.alertText,
	);

	const specificProductType = manageProductV2Props.productType;

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[specificProductType.groupedProductType];

	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const isSelfServeCancellationAllowed =
		productDetail.selfServiceCancellation.isAllowed;

	const cancelledCopy =
		specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

	const monthlyOrAnnual = getBillingPeriodAdjective(
		nextPaymentDetails?.paymentInterval,
	).toLowerCase();

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
				</h2>
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

			<ProductInfoTableV2 productDetail={productDetail} />

			<h3
				css={css`
					${textSansBold17};
				`}
			>
				Payment
			</h3>

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
										Next {monthlyOrAnnual}
										{''} payment
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

					<div
						css={css`
							margin-left: ${space[5]}px;
						`}
					>
						{!hasCancellationPending &&
							isSelfServeCancellationAllowed && (
								<Button
									priority="subdued"
									onClick={() => {
										navigate(
											'/cancel/' +
												specificProductType.urlPart,
											{
												state: {
													productDetail:
														productDetail,
												},
											},
										);
									}}
								>
									Cancel {groupedProductType.friendlyName}
								</Button>
							)}
					</div>
				</div>
			</section>
		</>
	);
};

interface ManageProductV2RouterState {
	productDetail: ProductDetail;
}

const AsyncLoadedInnerContent = (props: WithProductType<ProductType>) => {
	const navigate = useNavigate();

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
		navigate('/');
		return null;
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
				GROUPED_PRODUCT_TYPES[props.productType.groupedProductType]
					.friendlyName
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
