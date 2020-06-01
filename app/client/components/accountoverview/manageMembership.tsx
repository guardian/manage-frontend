import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  augmentInterval,
  getMainPlan,
  isPaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PayPalDisplay } from "../payment/paypalDisplay";
import { ProblemAlert } from "../ProblemAlert";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { ErrorIcon } from "../svgs/errorIcon";
import { RouteableStepProps } from "../wizardRouterAdapter";

export const ManageMembership = (props: RouteableStepProps) => {
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
      headingPrefix={"Manage"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Manage membership",
        selectedNavItem: navLinks.accountOverview
      }}
      supportRefererSuffix="manage_membership_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
        const membershipTier =
          props.productType.alternateTierValue || productDetail.tier;

        const mainPlan = getMainPlan(productDetail.subscription);

        const hasCancellationPending = productDetail.subscription.cancelledAt;

        return (
          <>
            <PageHeaderContainer
              selectedNavItem={navLinks.accountOverview}
              title="Manage membership"
              breadcrumbs={[
                {
                  title: navLinks.accountOverview.title,
                  link: navLinks.accountOverview.link
                },
                {
                  title: "Manage membership",
                  currentPage: true
                }
              ]}
            />
            <PageNavAndContentContainer
              selectedNavItem={navLinks.accountOverview}
            >
              {productDetail.alertText && (
                <ProblemAlert
                  title="A payment needs your attention"
                  message={productDetail.alertText}
                  button={{
                    title: "Update payment method",
                    link: `/payment/${props.productType.urlPart}`,
                    state: productDetail
                  }}
                  additionalcss={css`
                    margin-top: 30px;
                  `}
                />
              )}
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Membership details
              </h2>
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
                    Your membership has been <strong>cancelled</strong>. You
                    will receive the benefits of your membership until{" "}
                    <strong>
                      {formatDateStr(productDetail.subscription.end)}
                    </strong>
                  </span>
                  .
                </p>
              )}
              <ProductDescriptionListTable
                content={[
                  {
                    title: "Membership tier",
                    value: membershipTier
                  },
                  {
                    title: "Start date",
                    value: productDetail.subscription.start
                      ? formatDateStr(productDetail.subscription.start)
                      : "-"
                  }
                ]}
              />
              <a
                href={`https://membership.${window.guardian.domain}/tier/change`}
              >
                <Button priority="secondary">Change tier</Button>
              </a>
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
                  ...(isPaidSubscriptionPlan(mainPlan) &&
                  productDetail.subscription.autoRenew &&
                  !hasCancellationPending
                    ? [
                        {
                          title: `Next ${augmentInterval(
                            mainPlan.interval
                          )} payment`,
                          value: `${mainPlan.currency}${(
                            (productDetail.subscription.nextPaymentPrice ||
                              mainPlan.amount) / 100.0
                          ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                        }
                      ]
                    : []),
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
                    title: `Payment${
                      productDetail.isPaidTier ? " method" : ""
                    }`,
                    value: productDetail.isPaidTier ? (
                      <>
                        {productDetail.subscription.card && (
                          <CardDisplay
                            margin="0"
                            inErrorState={!!productDetail.alertText}
                            {...productDetail.subscription.card}
                          />
                        )}
                        {productDetail.subscription.payPalEmail && (
                          <PayPalDisplay
                            payPalId={productDetail.subscription.payPalEmail}
                            shouldIncludePrefixCopy
                          />
                        )}
                        {productDetail.subscription.mandate && (
                          <DirectDebitDisplay
                            inErrorState={!!productDetail.alertText}
                            {...productDetail.subscription.mandate}
                          />
                        )}
                        {productDetail.subscription
                          .stripePublicKeyForCardAddition && (
                          <span>No Payment Method</span>
                        )}
                      </>
                    ) : (
                      <span>FREE</span>
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
                    to={`/payment/${props.productType.urlPart}`}
                    state={productDetail}
                  />
                )}
              {props.productType.cancellation && !hasCancellationPending && (
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
                  to={`/cancel/${props.productType.urlPart}`}
                  state={productDetail}
                >
                  Cancel membership
                </Link>
              )}
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};
