import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import moment from "moment";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../shared/identity";
import {
  getMainPlan,
  InvoiceDataApiItem,
  isGift,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItem,
  PaidSubscriptionPlan,
  ProductDetail,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  allProductsDetailFetcher,
  GROUPED_PRODUCT_TYPES,
  GroupedProductTypeKeys
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { EmptyAccountOverview } from "../accountoverview/emptyAccountOverview";
import { SixForSixExplainerIfApplicable } from "../accountoverview/sixForSixExplainer";
import AsyncLoader from "../asyncLoader";
import { BasicProductInfoTable } from "../basicProductInfoTable";
import { LinkButton } from "../buttons";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { getNextPaymentDetails } from "../payment/nextPaymentDetails";
import { PaymentDetailsTable } from "../payment/paymentDetailsTable";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";
import { InvoiceInterval, InvoicesTable } from "./invoicesTable";

type MMACategoryToProductDetails = {
  [mmaCategory in GroupedProductTypeKeys]: ProductDetail[];
};

class BillingDataAsyncLoader extends AsyncLoader<
  [MembersDataApiItem[], InvoiceDataApiItem[]]
> {}

const BillingRenderer = (
  apiResponse: [MembersDataApiItem[], InvoiceDataApiItem[]]
) => {
  // console.log(apiResponse);
  const allProductDetails = apiResponse[0]
    .filter(isProduct)
    .sort(sortByJoinDate);
  const invoiceData = apiResponse[1];

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
    border-top: 1px solid ${palette.neutral["86"]};
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
                          <ErrorIcon fill={palette.brandYellow[200]} />
                          <span
                            css={css`
                              margin-left: ${space[2]}px;
                            `}
                          >
                            {cancelledCopy}{" "}
                            <strong>
                              {formatDateStr(productDetail.subscription.end)}
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
                                ? palette.brand[400]
                                : palette.brand[800]
                            }
                            textColour={
                              productDetail.alertText
                                ? palette.neutral[100]
                                : palette.brand[400]
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
                      <div
                        css={css`
                          margin-top: ${space[12]}px;
                          margin-bottom: ${space[3]}px;
                        `}
                      >
                        <InvoicesTable
                          invoiceInterval={InvoiceInterval.annually}
                          invoiceData={mockInvoiceData.map(invoice => {
                            const paidPlan = getMainPlan(
                              productDetail.subscription
                            ) as PaidSubscriptionPlan;
                            return {
                              ...invoice,
                              currency: paidPlan.currency,
                              currencyISO: paidPlan.currencyISO
                            };
                          })}
                        />
                      </div>
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
};

export const Billing = (_: RouteComponentProps) => {
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
    fetch("/api/existing-payment-options", {
      credentials: "include",
      mode: "same-origin",
      headers: {
        [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
          window.location.href
        )
      }
    })
  ]);

const mockInvoiceData = [
  {
    invoiceId: "1",
    subscriptionName: "A-S00052639",
    date: moment().format(),
    paymentMethod: "Card",
    last4: "1111",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "2",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(1, "years")
      .format(),
    paymentMethod: "Card",
    last4: "2222",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "3",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(2, "years")
      .format(),
    paymentMethod: "Card",
    last4: "3333",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "4",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(2, "years")
      .format(),
    paymentMethod: "Card",
    last4: "4444",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "5",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(3, "years")
      .format(),
    paymentMethod: "Card",
    last4: "5555",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "6",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(4, "years")
      .format(),
    paymentMethod: "Card",
    last4: "6666",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "7",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(4, "years")
      .format(),
    paymentMethod: "Card",
    last4: "7777",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "8",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(4, "years")
      .format(),
    paymentMethod: "Card",
    last4: "8888",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "9",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(5, "years")
      .format(),
    paymentMethod: "Card",
    last4: "9999",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "10",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(6, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1010",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "11",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(6, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1111",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "12",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(6, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1212",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "13",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(6, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1313",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "14",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(6, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1414",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "15",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(7, "years")
      .format(),
    paymentMethod: "Card",
    last4: "1515",
    cardType: "Visa",
    price: "11.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "16",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(7, "years")
      .format(),
    paymentMethod: "DirectDebit",
    last4: "9911",
    price: "9.99",
    pdfPath: "download link"
  },
  {
    invoiceId: "17",
    subscriptionName: "A-S00052639",
    date: moment()
      .subtract(7, "years")
      .format(),
    paymentMethod: "Paypal",
    price: "9.99",
    pdfPath: "download link"
  }
];
