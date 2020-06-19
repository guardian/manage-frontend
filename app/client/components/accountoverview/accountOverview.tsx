import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail,
  replaceAlertTextCTA,
  sortByJoinDate
} from "../../../shared/productResponse";
import {
  allProductsDetailFetcher,
  GROUPED_PRODUCT_TYPES,
  GroupedProductTypeKeys
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { isCancelled } from "../cancel/cancellationSummary";
import { NAV_LINKS } from "../nav/navConfig";
import { PageContainer } from "../page";
import { ProblemAlert } from "../ProblemAlert";
import {
  SupportTheGuardianButton,
  SupportTheGuardianButtonProps
} from "../supportTheGuardianButton";
import { AccountOverviewCard } from "./accountOverviewCard";
import { EmptyAccountOverview } from "./emptyAccountOverview";

type MMACategoryToProductDetails = {
  [mmaCategory in GroupedProductTypeKeys]: ProductDetail[];
};

const AccountOverviewRenderer = (apiResponse: MembersDataApiItem[]) => {
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

  if (allProductDetails.length === 0) {
    return <EmptyAccountOverview />;
  }

  const firstPaymentFailure = allProductDetails.find(_ => _.alertText);

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
      {firstPaymentFailure?.alertText && (
        <ProblemAlert
          title="A payment needs your attention"
          message={replaceAlertTextCTA(firstPaymentFailure.alertText)}
          button={{
            title: "Update payment method",
            link: `/payment/${
              GROUPED_PRODUCT_TYPES[
                firstPaymentFailure.mmaCategory
              ].mapGroupedToSpecific(firstPaymentFailure).urlPart
            }`,
            state: firstPaymentFailure
          }}
          additionalcss={css`
            margin-top: 30px;
          `}
        />
      )}

      {Object.entries(mmaCategoryToProductDetails).map(
        ([mmaCategory, productDetails]) => {
          const groupedProductType =
            GROUPED_PRODUCT_TYPES[mmaCategory as GroupedProductTypeKeys];
          return (
            productDetails.length > 0 && (
              <React.Fragment key={mmaCategory}>
                <h2 css={subHeadingCss}>
                  My {groupedProductType.groupFriendlyName}
                </h2>
                {productDetails.map(productDetail => (
                  <AccountOverviewCard
                    key={productDetail.subscription.subscriptionId}
                    productDetail={productDetail}
                  />
                ))}
                {productDetails.some(productDetail =>
                  isCancelled(productDetail.subscription)
                ) && (
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
      <MembersDatApiAsyncLoader
        fetch={allProductsDetailFetcher}
        render={AccountOverviewRenderer}
        loadingMessage={`Loading your account details...`}
      />
    </PageContainer>
  );
};

export interface SupportTheGuardianSectionProps
  extends SupportTheGuardianButtonProps {
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
