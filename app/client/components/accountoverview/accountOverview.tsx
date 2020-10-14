import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  CancelledProductDetail,
  isCancelledProduct,
  isProduct,
  MembersDataApiItem,
  ProductDetail,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  allProductsDetailFetcher,
  GROUPED_PRODUCT_TYPES,
  GroupedProductTypeKeys
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import AsyncLoader from "../asyncLoader";
import { isCancelled } from "../cancel/cancellationSummary";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { AccountOverviewCancelledCard } from "./accountOverviewCancelledCard";
import { AccountOverviewCard } from "./accountOverviewCard";
import { EmptyAccountOverview } from "./emptyAccountOverview";
import { SupportTheGuardianSection } from "./supportTheGuardianSection";

type MMACategoryToProduct = {
  [mmaCategory in GroupedProductTypeKeys]: Array<
    ProductDetail | CancelledProductDetail
  >;
};

const AccountOverviewRenderer = ([mdaResponse, cancelledProductsResponse]: [
  MembersDataApiItem[],
  CancelledProductDetail[]
]) => {
  const allActiveProductDetails = mdaResponse
    .filter(isProduct)
    .sort(sortByJoinDate);
  const allCancelledProductDetails = cancelledProductsResponse.sort(
    (a: CancelledProductDetail, b: CancelledProductDetail) =>
      b.subscription.start.localeCompare(a.subscription.start)
  );

  const allProducts: Array<ProductDetail | CancelledProductDetail> = [
    ...allActiveProductDetails,
    ...allCancelledProductDetails
  ];

  const mmaCategoryToProductDetails = allProducts.reduce(
    (accumulator, product) => ({
      ...accumulator,
      [product.mmaCategory]: [
        ...(accumulator[product.mmaCategory] || []),
        product
      ]
    }),
    {} as MMACategoryToProduct
  );

  if (allActiveProductDetails.length === 0) {
    return <EmptyAccountOverview />;
  }

  const maybeFirstPaymentFailure = allActiveProductDetails.find(
    _ => _.alertText
  );

  const subHeadingCss = css`
    margin: ${space[12]}px 0 ${space[6]}px;
    border-top: 1px solid ${palette.neutral["86"]};
    ${headline.small({ fontWeight: "bold" })};
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    }
  `;

  return (
    <>
      <PaymentFailureAlertIfApplicable
        productDetail={maybeFirstPaymentFailure}
      />

      {Object.entries(mmaCategoryToProductDetails).map(
        ([mmaCategory, products]) => {
          const groupedProductType =
            GROUPED_PRODUCT_TYPES[mmaCategory as GroupedProductTypeKeys];
          return (
            products.length > 0 && (
              <React.Fragment key={mmaCategory}>
                <h2 css={subHeadingCss}>
                  My {groupedProductType.groupFriendlyName}
                </h2>
                {products.map(product => {
                  return isCancelledProduct(product) ? (
                    <AccountOverviewCancelledCard
                      key={product.subscription.subscriptionId}
                      product={product as CancelledProductDetail}
                    />
                  ) : (
                    <AccountOverviewCard
                      key={product.subscription.subscriptionId}
                      productDetail={product as ProductDetail}
                    />
                  );
                })}
                {(groupedProductType.groupFriendlyName === "membership" ||
                  groupedProductType.groupFriendlyName === "contribution") &&
                  products.some(product => {
                    if (isCancelledProduct(product)) {
                      return true;
                    } else {
                      return isCancelled(
                        (product as ProductDetail).subscription
                      );
                    }
                  }) && (
                    <SupportTheGuardianSection
                      {...groupedProductType.supportTheGuardianSectionProps}
                    />
                  )}
              </React.Fragment>
            )
          );
        }
      )}
    </>
  );
};

export const AccountOverview = (_: RouteComponentProps) => {
  return (
    <PageContainer
      selectedNavItem={NAV_LINKS.accountOverview}
      pageTitle="Account overview"
    >
      <AccountOverviewAsyncLoader
        fetch={AccountOverviewFetcher}
        render={AccountOverviewRenderer}
        loadingMessage={`Loading your account details...`}
      />
    </PageContainer>
  );
};

class AccountOverviewAsyncLoader extends AsyncLoader<
  [MembersDataApiItem[], CancelledProductDetail[]]
> {}

const AccountOverviewFetcher = () =>
  Promise.all([allProductsDetailFetcher(), fetch("/api/cancelled")]);
