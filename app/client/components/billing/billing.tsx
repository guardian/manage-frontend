import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  getMainPlan,
  isGift,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
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
import { BasicProductInfoTable } from "../basicProductInfoTable";
import { LinkButton } from "../buttons";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { getNextPaymentDetails } from "../payment/nextPaymentDetails";
import { PaymentDetailsTable } from "../payment/paymentDetailsTable";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";

type MMACategoryToProductDetails = {
  [mmaCategory in GroupedProductTypeKeys]: ProductDetail[];
};

const BillingRenderer = (apiResponse: MembersDataApiItem[]) => {
  const allProductDetails = apiResponse.filter(isProduct).sort(sortByJoinDate);

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
      <MembersDatApiAsyncLoader
        fetch={allProductsDetailFetcher}
        render={BillingRenderer}
        loadingMessage={`Loading your billing details...`}
      />
    </PageContainer>
  );
};
