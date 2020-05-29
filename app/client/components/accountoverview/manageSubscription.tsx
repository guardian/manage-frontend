import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  augmentInterval,
  getFuturePlanIfVisible,
  getMainPlan,
  isPaidSubscriptionPlan,
  isSixForSix,
  ProductDetail
} from "../../../shared/productResponse";
import {
  hasDeliveryRecordsFlow,
  ProductTypes
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { DeliveryAddressDisplay } from "../delivery/address/deliveryAddressDisplay";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PaypalLogo } from "../payment/paypalLogo";
import { ProblemAlert } from "../ProblemAlert";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { ErrorIcon } from "../svgs/errorIcon";
import { RouteableStepProps } from "../wizardRouterAdapter";

export const ManageSubscription = (props: RouteableStepProps) => {
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
        pageTitle: "Manage subscription",
        selectedNavItem: navLinks.accountOverview
      }}
      supportRefererSuffix="manage_subscription_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
        const mainPlan = getMainPlan(productDetail.subscription);

        const futurePlan = getFuturePlanIfVisible(productDetail.subscription);

        const productType =
          ProductTypes.subscriptions.mapGroupedToSpecific?.(productDetail) ||
          props.productType;
        const productName =
          productType?.alternateTierValue || productDetail.tier;

        const hasCancellationPending = productDetail.subscription.cancelledAt;

        return (
          <>
            <PageHeaderContainer
              selectedNavItem={navLinks.accountOverview}
              title="Manage subscription"
              breadcrumbs={[
                {
                  title: navLinks.accountOverview.title,
                  link: navLinks.accountOverview.link
                },
                {
                  title: "Manage subscription",
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
                    link: `/payment/${productType.urlPart}`,
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
                {productName}
                {mainPlan.name &&
                  !isSixForSix(mainPlan.name) &&
                  ` - ${mainPlan.name}`}
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
                    Your subscription has been <strong>cancelled</strong>. You
                    are able to access your subscription until{" "}
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
                    title: "Subscription ID",
                    value: productDetail.subscription.subscriptionId
                  },
                  {
                    title: "Start date",
                    value: productDetail.subscription.start
                      ? formatDateStr(productDetail.subscription.start)
                      : "-"
                  }
                ]}
              />
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Payment
              </h2>
              {isSixForSix(mainPlan.name) &&
                isPaidSubscriptionPlan(mainPlan) &&
                !hasCancellationPending && (
                  <p
                    css={css`
                      ${textSans.medium()};
                    `}
                  >
                    This subscription is still in the initial '6 issues for{" "}
                    {mainPlan.currency}6' promotional period.
                  </p>
                )}
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
                            productDetail.subscription.currentPlans.length !==
                              0 && isSixForSix(mainPlan.name)
                              ? futurePlan.interval
                              : mainPlan.interval
                          )} payment`,
                          value: `${mainPlan.currency}${(
                            (productDetail.subscription.nextPaymentPrice ||
                              mainPlan.amount) / 100.0
                          ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                        },
                        {
                          title: "Next payment date",
                          ...(productDetail.subscription.nextPaymentDate && {
                            value: formatDateStr(
                              productDetail.subscription.currentPlans.length ===
                                0
                                ? mainPlan.start
                                : productDetail.subscription.nextPaymentDate
                            )
                          })
                        }
                      ]
                    : []),
                  {
                    title: "Payment method",
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
                          <PaypalLogo />
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
              {productDetail.isPaidTier && (
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
                  {...(productDetail.alertText ? { alert: true } : {})}
                  text="Update payment method"
                  to={`/payment/${productType.urlPart}`}
                  state={productDetail}
                />
              )}
              {productType.delivery?.showAddress?.(
                productDetail.subscription
              ) &&
                productDetail.subscription.deliveryAddress && (
                  <>
                    <h2
                      css={css`
                        ${subHeadingCss}
                      `}
                    >
                      Delivery address
                    </h2>
                    <ProductDescriptionListTable
                      borderColour={palette.neutral[86]}
                      content={[
                        {
                          title: "Address",
                          value: (
                            <DeliveryAddressDisplay
                              {...productDetail.subscription.deliveryAddress}
                            />
                          )
                        }
                      ]}
                    />
                    <LinkButton
                      colour={palette.brand[800]}
                      textColour={palette.brand[400]}
                      fontWeight="bold"
                      text="Manage delivery address"
                      to={`/delivery/${productType.urlPart}/address`}
                      state={productDetail}
                    />
                  </>
                )}
              {hasDeliveryRecordsFlow(productType) && (
                <>
                  <h2
                    css={css`
                      ${subHeadingCss}
                    `}
                  >
                    Delivery history
                  </h2>
                  <p>Check delivery history and report an issue.</p>
                  <LinkButton
                    colour={palette.brand[800]}
                    textColour={palette.brand[400]}
                    fontWeight="bold"
                    text="Manage delivery history"
                    to={`/delivery/${productType.urlPart}/records`}
                    state={productDetail}
                  />
                </>
              )}
              {!hasCancellationPending && (
                <>
                  <h2
                    css={css`
                      ${subHeadingCss}
                    `}
                  >
                    Going on holiday?
                  </h2>
                  <p>
                    Don’t fret - you can suspend up to 6 issues per year with a
                    notice period. You will be credited for a suspended issue on
                    the first bill after the suspension date.
                  </p>
                  <LinkButton
                    colour={palette.brand[800]}
                    textColour={palette.brand[400]}
                    fontWeight="bold"
                    text="Manage suspensions"
                    to={`/suspend/${productType.urlPart}`}
                    state={productDetail}
                  />
                </>
              )}
              {productType.cancellation && !hasCancellationPending && (
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
                  Cancel subscription
                </Link>
              )}
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};
