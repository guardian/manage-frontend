import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  CancelledProductDetail,
  isProduct,
  ProductDetail,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  GROUPED_PRODUCT_TYPES,
  GroupedProductTypeKeys
} from "../../../shared/productTypes";
import { allProductsDetailEndpoint } from "../../productUtils";
import { maxWidth } from "../../styles/breakpoints";
import { isCancelled } from "../cancel/cancellationSummary";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { AccountOverviewCancelledCard } from "./accountOverviewCancelledCard";
import { AccountOverviewCard } from "./accountOverviewCard";
import { EmptyAccountOverview } from "./emptyAccountOverview";
import { SupportTheGuardianSection } from "./supportTheGuardianSection";
import { Action, useSuspenseQuery } from "react-fetching-library";
import DataFetcher from "../DataFetcher";

const fetchCancelledProducts: Action<CancelledProductDetail[]> = {
  method: "GET",
  endpoint: "/api/cancelled"
};

const AccountOverviewRenderer = (): JSX.Element => {
  const mdaResponse = useSuspenseQuery(allProductsDetailEndpoint).payload;
  const cancelledProductsResponse = useSuspenseQuery(fetchCancelledProducts)
    .payload;

  if (mdaResponse && cancelledProductsResponse) {
    const allActiveProductDetails = mdaResponse
      .filter(isProduct)
      .sort(sortByJoinDate);

    const allCancelledProductDetails = cancelledProductsResponse.sort(
      (a: CancelledProductDetail, b: CancelledProductDetail) =>
        b.subscription.start.localeCompare(a.subscription.start)
    );

    const productCategories = [
      ...allActiveProductDetails,
      ...allCancelledProductDetails
    ]
      .map(
        (product: ProductDetail | CancelledProductDetail) => product.mmaCategory
      )
      .filter((value, index, self) => self.indexOf(value) === index);

    if (allActiveProductDetails.length === 0) {
      return <EmptyAccountOverview />;
    }

    const maybeFirstPaymentFailure = allActiveProductDetails.find(
      _ => _.alertText
    );

    const subHeadingCss = css`
      margin: ${space[12]}px 0 ${space[6]}px;
      border-top: 1px solid ${neutral["86"]};
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
        {productCategories.map(category => {
          const groupedProductType =
            GROUPED_PRODUCT_TYPES[category as GroupedProductTypeKeys];
          const activeProductsInCategory = allActiveProductDetails.filter(
            activeProduct => activeProduct.mmaCategory === category
          );
          const cancelledProductsInCategory = allCancelledProductDetails.filter(
            activeProduct => activeProduct.mmaCategory === category
          );

          return (
            <React.Fragment key={category}>
              <h2 css={subHeadingCss}>
                My {groupedProductType.groupFriendlyName}
              </h2>
              {activeProductsInCategory.map(productDetail => (
                <AccountOverviewCard
                  key={productDetail.subscription.subscriptionId}
                  productDetail={productDetail}
                />
              ))}
              {cancelledProductsInCategory.map(cancelledProductDetail => (
                <AccountOverviewCancelledCard
                  key={cancelledProductDetail.subscription.subscriptionId}
                  product={cancelledProductDetail}
                />
              ))}
              {(groupedProductType.groupFriendlyName === "membership" ||
                groupedProductType.groupFriendlyName === "contribution") &&
                (cancelledProductsInCategory.length > 0 ||
                  activeProductsInCategory.some(productDetail =>
                    isCancelled((productDetail as ProductDetail).subscription)
                  )) && (
                  <SupportTheGuardianSection
                    {...groupedProductType.supportTheGuardianSectionProps}
                  />
                )}
            </React.Fragment>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
};

const AccountOverview = (_: RouteComponentProps) => {
  return (
    <PageContainer
      selectedNavItem={NAV_LINKS.accountOverview}
      pageTitle="Account overview"
    >
      <DataFetcher loadingMessage={`Loading your account details...`}>
        <AccountOverviewRenderer />
      </DataFetcher>
    </PageContainer>
  );
};

export default AccountOverview;
