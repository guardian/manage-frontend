import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  getMainPlan,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypes } from "../../../shared/productTypes";
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
      headingPrefix={"Manage subscription"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Delivery history",
        selectedNavItem: navLinks.accountOverview
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
        const mainPlan = getMainPlan(
          productDetail.subscription
        ) as PaidSubscriptionPlan;

        const productType =
          ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
            productDetail
          ) || props.productType;
        const productName =
          productType?.alternateTierValue || productDetail.tier;

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
              </h2>
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
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Delivery address
              </h2>
              {productDetail.subscription.deliveryAddress && (
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
              )}
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Manage delivery address"
                to={`/delivery/${productType.urlPart}/address`}
                state={productDetail}
              />
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
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Going on holiday?
              </h2>
              <p>
                Don’t fret - you can suspend up to 6 issues per year with a
                notice period. You will be credited for a suspended issue on the
                first bill after the suspension date.
              </p>
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Manage suspensions"
                to={`/suspend/${productType.urlPart}`}
                state={productDetail}
              />
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};
