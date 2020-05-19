import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  allProductsDetailFetcher,
  ProductTypes
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { isCancelled } from "../cancel/cancellationSummary";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { ProblemAlert } from "../ProblemAlert";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { EmptyAccountOverview } from "./emptyAccountOverview";
import { Product } from "./product";

const AccountOverviewRenderer = (apiResponse: MembersDataApiItem[]) => {
  const productDetailList = apiResponse
    .filter(isProduct)
    .sort(sortByJoinDate)
    .map(productDetail => {
      const topLevelProductType = ProductTypes[productDetail.mmaCategory];
      return {
        productDetail,
        topLevelProductType,
        specificProductType:
          topLevelProductType.mapGroupedToSpecific?.(productDetail) ||
          topLevelProductType
      };
    });

  const subscriptionData = productDetailList.filter(
    _ => _.topLevelProductType === ProductTypes.subscriptions
  );

  const contributorData = productDetailList.filter(
    _ => _.topLevelProductType === ProductTypes.contributions
  );

  const membershipData = productDetailList.filter(
    _ => _.topLevelProductType === ProductTypes.membership
  );

  if (productDetailList.length === 0) {
    return <EmptyAccountOverview />;
  }

  const firstPaymentFailure = productDetailList.find(
    _ => _.productDetail.alertText
  );

  return (
    <>
      {firstPaymentFailure?.productDetail.alertText && (
        <ProblemAlert
          title="A payment needs your attention"
          message={firstPaymentFailure.productDetail.alertText}
          button={{
            title: "Update payment method",
            link: `/payment/${firstPaymentFailure.specificProductType.urlPart}`,
            state: firstPaymentFailure.productDetail
          }}
          additionalcss={css`
            margin-top: 30px;
          `}
        />
      )}
      {!!subscriptionData.length && (
        <>
          <h2
            css={css`
              margin-top: 50px;
              border-top: 1px solid ${palette.neutral["86"]};
              ${headline.small({ fontWeight: "bold" })};
              ${maxWidth.tablet} {
                font-size: 1.25rem;
                line-height: 1.6;
              }
            `}
          >
            My subscriptions
          </h2>
          {subscriptionData.map(item => (
            <Product
              key={item.productDetail.subscription.subscriptionId}
              {...item}
              productCategory="subscription"
            />
          ))}
        </>
      )}
      {!!membershipData.length && (
        <>
          <h2
            css={css`
              margin-top: 50px;
              border-top: 1px solid ${palette.neutral["86"]};
              ${headline.small({ fontWeight: "bold" })};
              ${maxWidth.tablet} {
                font-size: 1.25rem;
                line-height: 1.6;
              }
            `}
          >
            My membership
          </h2>
          {membershipData.map(item => (
            <Product
              key={item.productDetail.subscription.subscriptionId}
              {...item}
              productCategory="membership"
            />
          ))}
          {membershipData.some(item =>
            isCancelled(item.productDetail.subscription)
          ) && (
            <>
              <p
                css={css`
            ${textSans.medium()}
            margin-top: ${space[6]}px;
          `}
              >
                We no longer have a membership programme but you can still
                continue to support The Guardian via a contribution or
                subscription.
              </p>
              <SupportTheGuardianButton
                urlSuffix="subscribe"
                supportReferer="footer_support_subscribe"
                alternateButtonText="Support The Guardian"
                fontWeight="bold"
                textColour={palette.neutral[100]}
                colour={palette.brand[400]}
                notPrimary
              />
            </>
          )}
        </>
      )}
      {!!contributorData.length && (
        <>
          <h2
            css={css`
              margin-top: 50px;
              border-top: 1px solid ${palette.neutral["86"]};
              ${headline.small({ fontWeight: "bold" })};
              ${maxWidth.tablet} {
                font-size: 1.25rem;
                line-height: 1.6;
              }
            `}
          >
            My contributions
          </h2>
          {contributorData.map(item => {
            return (
              <Product
                key={item.productDetail.subscription.subscriptionId}
                {...item}
                productCategory="contribution"
              />
            );
          })}
        </>
      )}
    </>
  );
};

export const AccountOverview = (props: RouteComponentProps) => {
  return (
    <>
      <PageHeaderContainer
        selectedNavItem={navLinks.accountOverview}
        title="Account overview"
      />
      <PageNavAndContentContainer selectedNavItem={navLinks.accountOverview}>
        <MembersDatApiAsyncLoader
          fetch={allProductsDetailFetcher}
          render={AccountOverviewRenderer}
          loadingMessage={`Loading your account details...`}
        />
      </PageNavAndContentContainer>
    </>
  );
};
