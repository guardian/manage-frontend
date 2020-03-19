import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { capitalize } from "lodash";
import React from "react";
import { ProductDetail } from "../../../shared/productResponse";
import { maxWidth } from "../../styles/breakpoints";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { RouteableStepProps } from "../wizardRouterAdapter";

export const ManageProduct = (props: RouteableStepProps) => {
  const depluralise = (input: string) =>
    input.charAt(input.length - 1) === "s"
      ? input.substr(0, input.length - 1)
      : input;

  return (
    <FlowStartMultipleProductDetailHandler
      {...props}
      headingPrefix={"Manage subscription"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Delivery history",
        selectedNavItem: navLinks.subscriptions
      }}
      supportRefererSuffix="delivery_records_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
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
                Manage {depluralise(routeableStepProps.productType.urlPart)}
              </h1>
            </PageHeaderContainer>
            <PageNavAndContentContainer
              selectedNavItem={navLinks.accountOverview}
            >
              <h2
                css={css`
                  border-top: 1px solid ${palette.neutral["86"]};
                  ${headline.small()};
                  font-weight: bold;
                  margin-top: 50px;
                  ${maxWidth.tablet} {
                    font-size: 1.25rem;
                    line-height: 1.6;
                  }
                `}
              >
                {capitalize(
                  routeableStepProps.productType.shortFriendlyName ||
                    routeableStepProps.productType.friendlyName
                )}
              </h2>
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};

// const friendlyProductName = capitalize(
// ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(productDetail)
//     .friendlyName
// );
