import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, brandAlt, neutral } from "@guardian/src-foundations/palette";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { parseDate } from "../../../shared/dates";
import {
  getMainPlan,
  InvoiceDataApiItem,
  isGift,
  isPaidSubscriptionPlan,
  isProduct,
  PaidSubscriptionPlan,
  ProductDetail,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  GROUPED_PRODUCT_TYPES,
  GroupedProductTypeKeys
} from "../../../shared/productTypes";
import { allProductsDetailEndpoint } from "../../productUtils";
import { maxWidth } from "../../styles/breakpoints";
import { EmptyAccountOverview } from "../accountoverview/emptyAccountOverview";
import { SixForSixExplainerIfApplicable } from "../accountoverview/sixForSixExplainer";
import { BasicProductInfoTable } from "../basicProductInfoTable";
import { LinkButton } from "../buttons";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { getNextPaymentDetails } from "../payment/nextPaymentDetails";
import { PaymentDetailsTable } from "../payment/paymentDetailsTable";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";
import { InvoicesTable } from "./invoicesTable";
import { Action, useSuspenseQuery } from "react-fetching-library";
import { allErrorStatuses } from "../../fetchClient";
import DataFetcher from "../DataFetcher";

type MMACategoryToProductDetails = {
  [mmaCategory in GroupedProductTypeKeys]: ProductDetail[];
};

type FetchInvoiceResponse = { invoices: InvoiceDataApiItem[] };

const fetchInvoices: Action<FetchInvoiceResponse> = {
  method: "GET",
  endpoint: "/api/invoices",
  config: {
    emitErrorForStatuses: allErrorStatuses
  }
};

export const BillingRenderer = (): JSX.Element => {
  const mdaResponse = useSuspenseQuery(allProductsDetailEndpoint).payload;
  const invoiceResponse = useSuspenseQuery(fetchInvoices).payload;

  if (mdaResponse && invoiceResponse) {
    const allProductDetails = mdaResponse
      .filter(isProduct)
      .sort(sortByJoinDate);
    const invoiceData = invoiceResponse.invoices.sort(
      (a: InvoiceDataApiItem, b: InvoiceDataApiItem) =>
        b.date.localeCompare(a.date)
    );

    const mmaCategoryToProductDetails = allProductDetails.reduce(
      (accumulator, productDetail) => ({
        ...accumulator,
        [productDetail.mmaCategory]: [
          ...(accumulator[productDetail.mmaCategory] || []),
          productDetail
        ]
      }),
      {} as MMACategoryToProductDetails
    );

    const maybeFirstPaymentFailure = allProductDetails.find(_ => _.alertText);

    if (allProductDetails.length === 0) {
      return <EmptyAccountOverview />;
    }

    const subHeadingTitleCss = `
    ${headline.small({ fontWeight: "bold" })};
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
    const subHeadingBorderTopCss = `
    border-top: 1px solid ${neutral["86"]};
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
                <React.Fragment key={mmaCategory}>
                  {productDetails.map(productDetail => {
                    const mainPlan = getMainPlan(productDetail.subscription);
                    const groupedProductType =
                      GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
                    const specificProductType = groupedProductType.mapGroupedToSpecific(
                      productDetail
                    );
                    const hasCancellationPending =
                      productDetail.subscription.cancelledAt;
                    const cancelledCopy =
                      specificProductType.cancelledCopy ||
                      groupedProductType.cancelledCopy;
                    const isAmountOveridable =
                      specificProductType.updateAmountMdaEndpoint;
                    const isContribution =
                      isAmountOveridable && isPaidSubscriptionPlan(mainPlan);
                    const nextPaymentDetails = getNextPaymentDetails(
                      mainPlan,
                      productDetail.subscription,
                      null,
                      !!productDetail.alertText
                    );
                    const paidPlan = getMainPlan(
                      productDetail.subscription
                    ) as PaidSubscriptionPlan;
                    const productInvoiceData = invoiceData
                      .filter(
                        invoice =>
                          invoice.subscriptionName ===
                          productDetail.subscription.subscriptionId
                      )
                      .map(invoice => ({
                        ...invoice,
                        pdfPath: `/api/${invoice.pdfPath}`,
                        currency: paidPlan.currency,
                        currencyISO: paidPlan.currencyISO,
                        productUrlPart: specificProductType.urlPart
                      }));
                    const resultsPerPage = paidPlan.interval?.includes("year")
                      ? productInvoiceData.length
                      : 6;
                    return (
                      <React.Fragment
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
                          </h2>
                          {isGift(productDetail.subscription) && (
                            <i
                              css={css`
                                margin: 4px 0 0 ${space[3]}px;
                              `}
                            >
                              <GiftIcon alignArrowToThisSide={"left"} />
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
                              {cancelledCopy}{" "}
                              <strong>
                                {parseDate(
                                  productDetail.subscription.end
                                ).dateStr()}
                              </strong>
                            </span>
                            .
                          </p>
                        )}
                        {!isContribution && (
                          <BasicProductInfoTable
                            groupedProductType={groupedProductType}
                            productDetail={productDetail}
                          />
                        )}
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
                          !productDetail.subscription.payPalEmail && (
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
                              fontWeight={"bold"}
                              alert={!!productDetail.alertText}
                              text="Update payment method"
                              to={`/payment/${specificProductType.urlPart}`}
                              state={{
                                productDetail,
                                flowReferrer: {
                                  title: NAV_LINKS.billing.title,
                                  link: NAV_LINKS.billing.link
                                }
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
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              )
            );
          }
        )}
      </>
    );
  } else {
    return <></>;
  }
};

const Billing = (_: RouteComponentProps) => {
  return (
    <PageContainer selectedNavItem={NAV_LINKS.billing} pageTitle="Billing">
      <DataFetcher loadingMessage="Loading your billing details...">
        <BillingRenderer />
      </DataFetcher>
    </PageContainer>
  );
};

export default Billing;
