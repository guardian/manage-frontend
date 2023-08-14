import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import { parseDate } from '../../../../shared/dates';
import type {
	AppSubscription,
	MPAPIResponse,
} from '../../../../shared/mpapiResponse';
import {
	AppStore,
	determineAppStore,
	isPuzzle,
	isValidAppSubscription,
} from '../../../../shared/mpapiResponse';
import type {
	InvoiceDataApiItem,
	MembersDataApiResponse,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	getMainPlan,
	isGift,
	isProduct,
	sortByJoinDate,
} from '../../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { allRecurringProductsDetailFetcher } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { EmptyAccountOverview } from '../accountoverview/EmptyAccountOverview';
import { SixForSixExplainerIfApplicable } from '../accountoverview/SixForSixExplainer';
import { PageContainer } from '../Page';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { GiftIcon } from '../shared/assets/GiftIcon';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { BasicProductInfoTable } from '../shared/BasicProductInfoTable';
import { LinkButton } from '../shared/Buttons';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaymentDetailsTable } from '../shared/PaymentDetailsTable';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { InvoicesTable } from './InvoicesTable';

interface ProductDetailWithInvoice extends ProductDetail {
	invoices: InvoiceDataApiItem[];
}

type MMACategoryToProductDetails = {
	[mmaCategory in GroupedProductTypeKeys]: ProductDetailWithInvoice[];
};

type BillingResponse = [
	MembersDataApiResponse,
	{ invoices: InvoiceDataApiItem[] },
	MPAPIResponse,
];

const subHeadingTitleCss = `
${headline.small({ fontWeight: 'bold' })};
${until.tablet} {
  font-size: 1.25rem;
  line-height: 1.6;
};
`;

const subHeadingBorderTopCss = css`
	border-top: 1px solid ${neutral['86']};
	margin: ${space[12]}px 0 ${space[5]}px;
`;

function decorateProductDetailWithInvoices(
	productDetail: ProductDetail,
): ProductDetailWithInvoice {
	return { ...productDetail, invoices: [] };
}

function joinInvoicesWithProductsInCategories(
	mdapiResponse: MembersDataApiResponse,
	invoicesResponse: { invoices: InvoiceDataApiItem[] },
) {
	const allProductDetails = mdapiResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate)
		.map(decorateProductDetailWithInvoices);

	const invoiceData = invoicesResponse.invoices.sort(
		(a: InvoiceDataApiItem, b: InvoiceDataApiItem) =>
			b.date.localeCompare(a.date),
	);

	invoiceData.forEach((invoice) => {
		const matchingProduct = allProductDetails.find(
			(product) =>
				product.subscription.subscriptionId ===
				invoice.subscriptionName,
		);
		if (matchingProduct) {
			matchingProduct.invoices.push(invoice);
		}
	});

	const mmaCategoryToProductDetails =
		organiseProductsIntoCategory(allProductDetails);
	return { allProductDetails, mmaCategoryToProductDetails };
}

function organiseProductsIntoCategory(allProductDetails: ProductDetail[]) {
	return allProductDetails.reduce(
		(accumulator, productDetail) => ({
			...accumulator,
			[productDetail.mmaCategory]: [
				...(accumulator[productDetail.mmaCategory] || []),
				productDetail,
			],
		}),
		{} as MMACategoryToProductDetails,
	);
}

function renderProductBillingInfo([mmaCategory, productDetails]: [
	string,
	ProductDetailWithInvoice[],
]) {
	return (
		productDetails.length > 0 && (
			<Fragment key={mmaCategory}>
				{productDetails.map((productDetail) => {
					const mainPlan = getMainPlan(productDetail.subscription);
					if (!mainPlan) {
						throw new Error(
							'mainPlan does not exist for product in billing page',
						);
					}
					const groupedProductType =
						GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
					const specificProductType =
						groupedProductType.mapGroupedToSpecific(productDetail);
					const hasCancellationPending =
						productDetail.subscription.cancelledAt;
					const cancelledCopy =
						specificProductType.cancelledCopy ||
						groupedProductType.cancelledCopy;
					const nextPaymentDetails = getNextPaymentDetails(
						mainPlan,
						productDetail.subscription,
						null,
						!!productDetail.alertText,
					);
					const paidPlan = getMainPlan(
						productDetail.subscription,
					) as PaidSubscriptionPlan;
					const maybePatronSuffix =
						productDetail.subscription.readerType === 'Patron'
							? ' - Patron'
							: '';
					const productInvoiceData = productDetail.invoices.map(
						(invoice) => ({
							...invoice,
							pdfPath: `/api/${invoice.pdfPath}`,
							currency: paidPlan.currency,
							currencyISO: paidPlan.currencyISO,
							productUrlPart: specificProductType.urlPart,
						}),
					);
					const resultsPerPage = paidPlan.billingPeriod?.includes(
						'year',
					)
						? productInvoiceData.length
						: 6;
					return (
						<Fragment
							key={productDetail.subscription.subscriptionId}
						>
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
										<GiftIcon
											alignArrowToThisSide={'left'}
										/>
									</i>
								)}
							</div>

							{hasCancellationPending && (
								<p
									css={css`
										${textSans.medium()};
									`}
								>
									<ErrorIcon fill={brandAlt[200]} />
									<span
										css={css`
											margin-left: ${space[2]}px;
										`}
									>
										{cancelledCopy}{' '}
										<strong>
											{parseDate(
												productDetail.subscription.end,
											).dateStr()}
										</strong>
									</span>
									.
								</p>
							)}
							<BasicProductInfoTable
								groupedProductType={groupedProductType}
								productDetail={productDetail}
							/>
							<SixForSixExplainerIfApplicable
								additionalCss={css`
									${textSans.medium()};
								`}
								mainPlan={mainPlan}
								hasCancellationPending={hasCancellationPending}
							/>
							<PaymentDetailsTable
								productDetail={productDetail}
								nextPaymentDetails={nextPaymentDetails}
								hasCancellationPending={hasCancellationPending}
								tableHeading="Payment"
							/>
							{productDetail.isPaidTier &&
								productDetail.subscription
									.safeToUpdatePaymentMethod && (
									<LinkButton
										colour={
											productDetail.alertText
												? brand[400]
												: brand[800]
										}
										textColour={
											productDetail.alertText
												? neutral[100]
												: brand[400]
										}
										fontWeight={'bold'}
										alert={!!productDetail.alertText}
										text="Update payment method"
										ariaLabelText={`${specificProductType.productTitle(
											mainPlan,
										)} : Update payment method`}
										to={`/payment/${specificProductType.urlPart}`}
										state={{
											productDetail,
											flowReferrer: {
												title: NAV_LINKS.billing.title,
												link: NAV_LINKS.billing.link,
											},
										}}
									/>
								)}
							{productInvoiceData.length > 0 && (
								<div
									css={css`
										margin-top: ${space[12]}px;
										margin-bottom: ${space[3]}px;
									`}
								>
									<InvoicesTable
										resultsPerPage={resultsPerPage}
										invoiceData={productInvoiceData}
									/>
								</div>
							)}
						</Fragment>
					);
				})}
			</Fragment>
		)
	);
}

function getAppStoreMessage(subscription: AppSubscription) {
	const iosMessage = 'Apple (for iOS)';
	const androidMessage = 'Google (for Android)';

	const appStore = determineAppStore(subscription);

	switch (appStore) {
		case AppStore.IOS:
			return iosMessage;
		case AppStore.ANDROID:
			return androidMessage;
		default:
			return `${iosMessage}, or ${androidMessage}`;
	}
}

function renderInAppPurchase(subscription: AppSubscription) {
	const tableHeadingCss = css`
		width: 100%;
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: 0;
		padding: ${space[3]}px ${space[5]}px;
		background-color: ${neutral[97]};
		${until.tablet} {
			font-size: 1.0625rem;
			line-height: 1.6;
			padding: ${space[3]}px;
		}
	`;
	const puzzleOrNews = isPuzzle(subscription) ? 'puzzle' : 'news';

	return (
		<div css={subHeadingBorderTopCss} key={subscription.subscriptionId}>
			<h2
				css={css`
					${subHeadingTitleCss}
					margin: 0;
				`}
			>
				{capitalize(puzzleOrNews)} app
			</h2>
			<div
				css={css`
					${textSans.medium()};
					border: 1px solid ${neutral[86]};
					display: flex;
					flex-wrap: wrap;
					margin: ${space[5]}px 0;
				`}
			>
				<h2 css={tableHeadingCss}>Payment</h2>
				<div
					css={css`
						padding: ${space[3]}px;
					`}
				>
					To change your payment setup, please contact{' '}
					{getAppStoreMessage(subscription)}.
				</div>
			</div>
		</div>
	);
}

function BillingDetailsComponent(props: {
	mmaCategoryToProductDetails: MMACategoryToProductDetails;
}) {
	return (
		<>
			{Object.entries(props.mmaCategoryToProductDetails).map(
				renderProductBillingInfo,
			)}
		</>
	);
}

const BillingPage = () => {
	const {
		data: billingResponse,
		loadingState,
	}: {
		data: BillingResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(billingFetcher, JsonResponseHandler);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return (
			<DefaultLoadingView loadingMessage="Loading your billing details..." />
		);
	}
	if (billingResponse === null) {
		return <GenericErrorScreen />;
	}

	const [mdapiResponse, invoicesResponse, mpapiResponse] = billingResponse;
	const appSubscriptions = mpapiResponse.subscriptions.filter(
		isValidAppSubscription,
	);

	const { allProductDetails, mmaCategoryToProductDetails } =
		joinInvoicesWithProductsInCategories(mdapiResponse, invoicesResponse);

	if (allProductDetails.length === 0 && appSubscriptions.length === 0) {
		return <EmptyAccountOverview />;
	}

	return (
		<>
			<PaymentFailureAlertIfApplicable
				productDetails={allProductDetails}
			/>
			{appSubscriptions.map(renderInAppPurchase)}

			<BillingDetailsComponent
				mmaCategoryToProductDetails={mmaCategoryToProductDetails}
			/>
		</>
	);
};

const billingFetcher = () =>
	Promise.all([
		allRecurringProductsDetailFetcher(),
		fetchWithDefaultParameters('/api/invoices'),
		fetchWithDefaultParameters('/mpapi/user/mobile-subscriptions'),
	]);

export const Billing = () => {
	return (
		<PageContainer selectedNavItem={NAV_LINKS.billing} pageTitle="Billing">
			<BillingPage />
		</PageContainer>
	);
};
