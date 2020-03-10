import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  sortByJoinDate
} from "../../../shared/productResponse";
import { createAllProductsDetailFetcher } from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { EmptyAccountOverview } from "./emptyAccountOverview";
import { SubscriptionProduct } from "./subscriptionProduct";

const AccountOverviewRenderer = (apiResponse: MembersDataApiItem[]) => {
  const productDetailList = apiResponse.filter(isProduct).sort(sortByJoinDate);

  const subscriptionData = productDetailList.filter(
    item => item.mmaCategory.toLowerCase() === "subscriptions"
  );

  const contributorData = productDetailList.filter(
    item => item.mmaCategory.toLowerCase() === "contributions"
  );

  const membershipData = productDetailList.filter(
    item => item.mmaCategory.toLowerCase() === "memberships"
  );

  if (
    subscriptionData.length === 0 &&
    contributorData.length === 0 &&
    membershipData.length === 0
  ) {
    return <EmptyAccountOverview />;
  }

  return (
    <>
      {subscriptionData.length && (
        <>
          <h2
            css={css`
              margin-top: 50px;
              border-top: 1px solid ${palette.neutral["86"]};
              ${headline.small()};
              font-weight: bold;
              ${maxWidth.tablet} {
                font-size: 1.25rem;
                line-height: 1.6;
              }
            `}
          >
            My subscriptions
          </h2>
          {subscriptionData.map((productDetail, index) => (
            <SubscriptionProduct
              productDetail={productDetail}
              key={`subscription-${index}`}
            />
          ))}
        </>
      )}
    </>
  );
};

export const AccountOverview = (props: RouteComponentProps) => {
  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.accountOverview}>
        <h1
          css={css`
            ${headline.large()};
            font-size: "32px",
            lineheight: "36px",
            margin-bottom: "30px",
            margin-top: "0"
            `}
        >
          Account overview
        </h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.accountOverview}>
        <MembersDatApiAsyncLoader
          fetch={createAllProductsDetailFetcher()}
          render={AccountOverviewRenderer}
          loadingMessage={`Loading your account details...`}
        />
      </PageNavAndContentContainer>
    </>
  );
};
