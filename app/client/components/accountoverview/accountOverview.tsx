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
  createAllProductsDetailFetcher,
  ProductTypes
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { isCancelled } from "../cancel/cancellationSummary";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { ProblemAlert } from "../ProblemAlert";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { ContributionProduct } from "./contributionProduct";
import { EmptyAccountOverview } from "./emptyAccountOverview";
import { MembershipProduct } from "./membershipProduct";
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
    item => item.mmaCategory.toLowerCase() === "membership"
  );

  if (
    subscriptionData.length === 0 &&
    contributorData.length === 0 &&
    membershipData.length === 0
  ) {
    return <EmptyAccountOverview />;
  }

  const firstPaymentFailureProductDetail = productDetailList.find(
    productDetail => productDetail.alertText
  );

  return (
    <>
      {firstPaymentFailureProductDetail?.alertText && (
        <ProblemAlert
          title="A payment needs your attention"
          message={firstPaymentFailureProductDetail.alertText}
          button={{
            title: "Update payment method",
            link: `/payment/${
              ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
                firstPaymentFailureProductDetail
              ).urlPart
            }`,
            state: firstPaymentFailureProductDetail
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
          {subscriptionData.map((productDetail, index) => (
            <SubscriptionProduct
              productDetail={productDetail}
              key={`subscription-${index}`}
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
          {membershipData.map((productDetail, index) => (
            <MembershipProduct
              productDetail={productDetail}
              key={`membership-${index}`}
            />
          ))}
          {membershipData.some(productDetail =>
            isCancelled(productDetail.subscription)
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
          {contributorData.map((productDetail, index) => {
            return (
              <ContributionProduct
                productDetail={productDetail}
                key={`contributions-${index}`}
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
          fetch={createAllProductsDetailFetcher()}
          render={AccountOverviewRenderer}
          loadingMessage={`Loading your account details...`}
        />
      </PageNavAndContentContainer>
    </>
  );
};
