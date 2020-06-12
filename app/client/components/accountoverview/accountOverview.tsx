import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  replaceAlertTextCTA,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  allProductsDetailFetcher,
  ProductTypes
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { isCancelled } from "../cancel/cancellationSummary";
import { NAV_LINKS } from "../nav/navConfig";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { ProblemAlert } from "../ProblemAlert";
import {
  SupportTheGuardianButton,
  SupportTheGuardianButtonProps
} from "../supportTheGuardianButton";
import { AccountOverviewCard } from "./accountOverviewCard";
import { EmptyAccountOverview } from "./emptyAccountOverview";

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
      {firstPaymentFailure?.productDetail.alertText && (
        <ProblemAlert
          title="A payment needs your attention"
          message={replaceAlertTextCTA(
            firstPaymentFailure.productDetail.alertText
          )}
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
          <h2 css={subHeadingCss}>My subscriptions</h2>
          {subscriptionData.map(item => (
            <AccountOverviewCard
              key={item.productDetail.subscription.subscriptionId}
              {...item}
            />
          ))}
          {subscriptionData.some(item =>
            isCancelled(item.productDetail.subscription)
          ) && (
            <SupportTheGuardianSection
              alternateButtonText="Subscribe again"
              supportReferer="account_overview_subscriptions_section"
              urlSuffix="subscribe"
              message="" // TODO : copy here!!
            />
          )}
        </>
      )}
      {!!membershipData.length && (
        <>
          <h2 css={subHeadingCss}>My membership</h2>
          {membershipData.map(item => (
            <AccountOverviewCard
              key={item.productDetail.subscription.subscriptionId}
              {...item}
            />
          ))}
          {membershipData.some(item =>
            isCancelled(item.productDetail.subscription)
          ) && (
            <SupportTheGuardianSection
              supportReferer="account_overview_membership_section"
              message="We no longer have a membership programme but you can still continue to support The Guardian via a contribution or subscription."
            />
          )}
        </>
      )}
      {!!contributorData.length && (
        <>
          <h2 css={subHeadingCss}>My contributions</h2>
          {contributorData.map(item => {
            return (
              <AccountOverviewCard
                key={item.productDetail.subscription.subscriptionId}
                {...item}
              />
            );
          })}
          {contributorData.some(item =>
            isCancelled(item.productDetail.subscription)
          ) && (
            <SupportTheGuardianSection
              alternateButtonText="Contribute again"
              supportReferer="account_overview_contributions_section"
              urlSuffix="contribute"
              message="You can use your existing payment details, so setting up a new recurring contribution only takes a minute."
            />
          )}
        </>
      )}
    </>
  );
};

export const AccountOverview = (_: RouteComponentProps) => {
  return (
    <>
      <PageHeaderContainer
        selectedNavItem={NAV_LINKS.accountOverview}
        title="Account overview"
      />
      <PageNavAndContentContainer selectedNavItem={NAV_LINKS.accountOverview}>
        <MembersDatApiAsyncLoader
          fetch={allProductsDetailFetcher}
          render={AccountOverviewRenderer}
          loadingMessage={`Loading your account details...`}
        />
      </PageNavAndContentContainer>
    </>
  );
};

interface SupportTheGuardianSectionProps extends SupportTheGuardianButtonProps {
  message: string;
}
const SupportTheGuardianSection = (props: SupportTheGuardianSectionProps) => (
  <>
    <p
      css={css`
        ${textSans.medium()}
        margin-top: ${space[6]}px;
      `}
    >
      {props.message}
    </p>
    <SupportTheGuardianButton
      fontWeight="bold"
      textColour={palette.neutral[100]}
      colour={palette.brand[400]}
      notPrimary
      {...props}
    />
  </>
);
