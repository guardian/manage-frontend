import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
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
import { RouteableStepProps } from "../wizardRouterAdapter";
import { ContributionUpdateAmountForm } from "./contributionUpdateAmountForm";

export const ManageContribution = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix={"Manage"}
    hideHeading
    hasLeftNav={{
      pageTitle: "Manage contribution",
      selectedNavItem: navLinks.accountOverview
    }}
    supportRefererSuffix="manage_contribution_flow"
    loadingMessagePrefix="Retrieving details of your"
    cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
    allowCancelledSubscription
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <SingleProductDetailRenderer
        routeableStepProps={routeableStepProps}
        productDetail={productDetail}
      />
    )}
  />
);

interface SingleProductDetailRendererProps {
  routeableStepProps: RouteableStepProps;
  productDetail: ProductDetail;
}
const SingleProductDetailRenderer = ({
  routeableStepProps,
  productDetail
}: SingleProductDetailRendererProps) => {
  const [updatedContributionAmount, setNewContributionAmount] = useState<
    number | null
  >(null);

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

  const productType =
    routeableStepProps.productType.mapGroupedToSpecific?.(productDetail) ||
    routeableStepProps.productType;

  const mainPlan = getMainPlan(productDetail.subscription);

  const hasCancellationPending = productDetail.subscription.cancelledAt;

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
      <PageNavAndContentContainer selectedNavItem={navLinks.accountOverview}>
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
        {isPaidSubscriptionPlan(mainPlan) && (
          <>
            <h2
              css={css`
                ${subHeadingCss}
              `}
            >
              Contribution details
            </h2>
            <ContributionUpdateAmountForm
              subscriptionId={productDetail.subscription.subscriptionId}
              mainPlan={mainPlan}
              productType={productType}
              nextPaymentDate={productDetail.subscription.nextPaymentDate}
              amountUpdateStateChange={setNewContributionAmount}
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
            ...(isPaidSubscriptionPlan(mainPlan) &&
            productDetail.subscription.autoRenew &&
            !hasCancellationPending
              ? [
                  {
                    title: `Next ${augmentInterval(mainPlan.interval)} payment`,
                    value: `${mainPlan.currency}${(
                      updatedContributionAmount ||
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
                  productDetail.subscription.card.expiry.month < 10 ? "0" : ""
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
              to={`/payment/${productType.urlPart}`}
              state={productDetail}
            />
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
            Cancel contribution
          </Link>
        )}
      </PageNavAndContentContainer>
    </>
  );
};
