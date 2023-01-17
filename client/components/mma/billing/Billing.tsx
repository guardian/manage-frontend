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
import { Fragment } from 'react';
import { parseDate } from '../../../../shared/dates';
import type {
	InvoiceDataApiItem,
	MembersDataApiItem,
	MembersDataApiResponse,
	PaidSubscriptionPlan,
	ProductDetail,
} from '../../../../shared/productResponse';
import {
	getMainPlan,
	isGift,
	isProduct,
	mdapiResponseReader,
	sortByJoinDate,
} from '../../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { allProductsDetailFetcher } from '../../../utilities/productUtils';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { EmptyAccountOverview } from '../accountoverview/EmptyAccountOverview';
import { SixForSixExplainerIfApplicable } from '../accountoverview/SixForSixExplainer';
import { PageContainer } from '../Page';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { GiftIcon } from '../shared/assets/GiftIcon';
import AsyncLoader from '../shared/AsyncLoader';
import { BasicProductInfoTable } from '../shared/BasicProductInfoTable';
import { LinkButton } from '../shared/Buttons';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaymentDetailsTable } from '../shared/PaymentDetailsTable';
import { PaymentFailureAlertIfApplicable } from '../shared/PaymentFailureAlertIfApplicable';
import { InvoicesTable } from './InvoicesTable';

type MMACategoryToProductDetails = {
	[mmaCategory in GroupedProductTypeKeys]: ProductDetail[];
};

class BillingDataAsyncLoader extends AsyncLoader<
	[
		MembersDataApiResponse | MembersDataApiItem[],
		{ invoices: InvoiceDataApiItem[] },
	]
> {}

const BillingRenderer = ([mdapiObject, invoiceResponse]: [
	MembersDataApiResponse | MembersDataApiItem[],
	{ invoices: InvoiceDataApiItem[] },
]) => {
	const mdaResponse = mdapiResponseReader(mdapiObject);

	const allProductDetails = mdaResponse.products
		.filter(isProduct)
		.sort(sortByJoinDate);
	const invoiceData = invoiceResponse.invoices.sort(
		(a: InvoiceDataApiItem, b: InvoiceDataApiItem) =>
			b.date.localeCompare(a.date),
	);

	const mmaCategoryToProductDetails = allProductDetails.reduce(
		(accumulator, productDetail) => ({
			...accumulator,
			[productDetail.mmaCategory]: [
				...(accumulator[productDetail.mmaCategory] || []),
				productDetail,
			],
		}),
		{} as MMACategoryToProductDetails,
	);

	const maybeFirstPaymentFailure = allProductDetails.find((_) => _.alertText);

	if (allProductDetails.length === 0) {
		return <EmptyAccountOverview />;
	}

	const subHeadingTitleCss = `
    ${headline.small({ fontWeight: 'bold' })};
    ${until.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
	const subHeadingBorderTopCss = `
    border-top: 1px solid ${neutral['86']};
    margin: 50px 0 ${space[5]}px;
  `;

	return (
		<>
			<PaymentFailureAlertIfApplicable
				productDetail={maybeFirstPaymentFailure}
			/>
			{Object.entries(mmaCategoryToProductDetails).map(
				([mmaCategory, productDetails]) => {
					return (
						productDetails.length > 0 && (
							<Fragment key={mmaCategory}>
								{productDetails.map((productDetail) => {
									const mainPlan = getMainPlan(
										productDetail.subscription,
									);
									if (!mainPlan) {
										throw new Error(
											'mainPlan does not exist for product in billing page',
										);
									}
									const groupedProductType =
										GROUPED_PRODUCT_TYPES[
											productDetail.mmaCategory
										];
									const specificProductType =
										groupedProductType.mapGroupedToSpecific(
											productDetail,
										);
									const hasCancellationPending =
										productDetail.subscription.cancelledAt;
									const cancelledCopy =
										specificProductType.cancelledCopy ||
										groupedProductType.cancelledCopy;
									const nextPaymentDetails =
										getNextPaymentDetails(
											mainPlan,
											productDetail.subscription,
											null,
											!!productDetail.alertText,
										);
									const paidPlan = getMainPlan(
										productDetail.subscription,
									) as PaidSubscriptionPlan;
									const maybePatronSuffix =
										productDetail.subscription
											.readerType === 'Patron'
											? ' - Patron'
											: '';
									const productInvoiceData = invoiceData
										.filter(
											(invoice) =>
												invoice.subscriptionName ===
												productDetail.subscription
													.subscriptionId,
										)
										.map((invoice) => ({
											...invoice,
											pdfPath: `/api/${invoice.pdfPath}`,
											currency: paidPlan.currency,
											currencyISO: paidPlan.currencyISO,
											productUrlPart:
												specificProductType.urlPart,
										}));
									const resultsPerPage =
										paidPlan.billingPeriod?.includes('year')
											? productInvoiceData.length
											: 6;
									return (
										<Fragment
											key={
												productDetail.subscription
													.subscriptionId
											}
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
													{specificProductType.productTitle(
														mainPlan,
													)}
													{maybePatronSuffix}
												</h2>
												{isGift(
													productDetail.subscription,
												) && (
													<i
														css={css`
															margin: 4px 0 0
																${space[3]}px;
														`}
													>
														<GiftIcon
															alignArrowToThisSide={
																'left'
															}
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
													<ErrorIcon
														fill={brandAlt[200]}
													/>
													<span
														css={css`
															margin-left: ${space[2]}px;
														`}
													>
														{cancelledCopy}{' '}
														<strong>
															{parseDate(
																productDetail
																	.subscription
																	.end,
															).dateStr()}
														</strong>
													</span>
													.
												</p>
											)}
											<BasicProductInfoTable
												groupedProductType={
													groupedProductType
												}
												productDetail={productDetail}
											/>
											<SixForSixExplainerIfApplicable
												additionalCss={css`
													${textSans.medium()};
												`}
												mainPlan={mainPlan}
												hasCancellationPending={
													hasCancellationPending
												}
											/>
											<PaymentDetailsTable
												productDetail={productDetail}
												nextPaymentDetails={
													nextPaymentDetails
												}
												hasCancellationPending={
													hasCancellationPending
												}
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
														alert={
															!!productDetail.alertText
														}
														text="Update payment method"
														ariaLabelText={`${specificProductType.productTitle(
															mainPlan,
														)} : Update payment method`}
														to={`/payment/${specificProductType.urlPart}`}
														state={{
															productDetail,
															flowReferrer: {
																title: NAV_LINKS
																	.billing
																	.title,
																link: NAV_LINKS
																	.billing
																	.link,
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
														resultsPerPage={
															resultsPerPage
														}
														invoiceData={
															productInvoiceData
														}
													/>
												</div>
											)}
										</Fragment>
									);
								})}
							</Fragment>
						)
					);
				},
			)}
		</>
	);
};

const Billing = () => {
	return (
		<PageContainer selectedNavItem={NAV_LINKS.billing} pageTitle="Billing">
			<BillingDataAsyncLoader
				fetch={billingFetcher}
				render={BillingRenderer}
				loadingMessage={`Loading your billing details...`}
			/>
		</PageContainer>
	);
};

const billingFetcher = () =>
	Promise.all([
		allProductsDetailFetcher(),
		fetchWithDefaultParameters('/api/invoices'),
	]);

export default Billing;
