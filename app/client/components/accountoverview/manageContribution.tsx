import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  getMainPlan,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import { maxWidth } from "../../styles/breakpoints";
import { Button, LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PaypalLogo } from "../payment/paypalLogo";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { RouteableStepProps } from "../wizardRouterAdapter";
import { ContributionUpdateAmountForm } from "./contributionUpdateAmountForm";

export const ManageContribution = (props: RouteableStepProps) => {
  const [
    showUpdateContributionAmountForm,
    setUpdateContributionAmountFormVisibility
  ] = useState<boolean>(false);

  const subHeadingCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

  return (
    <FlowStartMultipleProductDetailHandler
      {...props}
      headingPrefix={"Manage contribution"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Manage contribution",
        selectedNavItem: navLinks.subscriptions
      }}
      supportRefererSuffix="manage_contribution_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
        const productType =
          props.productType.mapGroupedToSpecific?.(productDetail) ||
          props.productType;

        const mainPlan = getMainPlan(
          productDetail.subscription
        ) as PaidSubscriptionPlan;

        return (
          <>
            <PageHeaderContainer
              selectedNavItem={navLinks.accountOverview}
              title="Manage contribution"
              breadcrumbs={[
                {
                  title: navLinks.accountOverview.title,
                  link: navLinks.accountOverview.link
                },
                {
                  title: "Manage contribution",
                  currentPage: true
                }
              ]}
            />
            <PageNavAndContentContainer
              selectedNavItem={navLinks.accountOverview}
            >
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Contribution details
              </h2>
              {showUpdateContributionAmountForm || 1 + 2 === 3 ? (
                <ContributionUpdateAmountForm
                  subscriptionId={"asdf"}
                  mainPlan={mainPlan}
                />
              ) : (
                <>
                  <ProductDescriptionListTable
                    content={[
                      {
                        title: "Current amount",
                        value: `${mainPlan.currency}${(
                          mainPlan.amount / 100.0
                        ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                      }
                    ]}
                  />
                  <Button
                    colour={palette.brand[800]}
                    textColour={palette.brand[400]}
                    fontWeight="bold"
                    text="Change amount"
                    onClick={() => {
                      setUpdateContributionAmountFormVisibility(true);
                    }}
                  />
                </>
              )}
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Payment
              </h2>
              <ProductDescriptionListTable
                borderColour={palette.neutral[86]}
                alternateRowBgColors
                content={[
                  {
                    title: "Next payment",
                    ...(productDetail.subscription.nextPaymentDate &&
                      productDetail.subscription.autoRenew && {
                        value: `${mainPlan.currency}${(
                          mainPlan.amount / 100.0
                        ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                      })
                  },
                  {
                    title: "Next payment date",
                    ...(productDetail.subscription.nextPaymentDate &&
                      productDetail.subscription.autoRenew && {
                        value: formatDateStr(
                          productDetail.subscription.nextPaymentDate
                        )
                      })
                  },
                  {
                    title: "Payment method",
                    value: (
                      <>
                        {productDetail.subscription.card && (
                          <CardDisplay
                            margin="0"
                            {...productDetail.subscription.card}
                          />
                        )}
                        {productDetail.subscription.payPalEmail && (
                          <PaypalLogo />
                        )}
                        {productDetail.subscription.mandate && (
                          <DirectDebitDisplay
                            {...productDetail.subscription.mandate}
                          />
                        )}
                        {productDetail.subscription
                          .stripePublicKeyForCardAddition && (
                          <span>No Payment Method</span>
                        )}
                      </>
                    )
                  },
                  {
                    title: "Expiry date",
                    ...(productDetail.subscription.card?.expiry && {
                      value: `${
                        productDetail.subscription.card.expiry.month < 10
                          ? "0"
                          : ""
                      }${productDetail.subscription.card.expiry.month}
                    ${" / "}
                    ${productDetail.subscription.card.expiry.year}`
                    })
                  }
                ]}
              />
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Update payment method"
                to={`/payment/${productType.urlPart}`}
                state={productDetail}
              />
              <Link
                css={css`
                    display: block;
                    float: right;
                    margin: ${space[24]}px 0 0 auto;
                    ${textSans.medium()}
                    color: ${palette.brand["500"]};
                    border-bottom: 1px solid ${palette.neutral["100"]};
                    transition: border-color .15s ease-out;
                    :hover: {
                      borderBottom: 1px solid ${palette.brand["400"]};
                    }
                  `}
                to={"/cancel/" + productType.urlPart}
                state={productDetail}
              >
                Cancel contribution
              </Link>
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};
