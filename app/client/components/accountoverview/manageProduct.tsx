import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  augmentInterval,
  getFuturePlanIfVisible,
  getMainPlan,
  isGift,
  isPaidSubscriptionPlan,
  isSixForSix,
  ProductDetail
} from "../../../shared/productResponse";
import {
  hasDeliveryRecordsFlow,
  shouldHaveHolidayStopsFlow
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { DeliveryAddressDisplay } from "../delivery/address/deliveryAddressDisplay";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PayPalDisplay } from "../payment/paypalDisplay";
import { ProblemAlert } from "../ProblemAlert";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { ProductDetailWrapper } from "../productDetailWrapper";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";
import { RouteableStepProps } from "../wizardRouterAdapter";
import { ContributionUpdateAmountForm } from "./contributionUpdateAmountForm";
import { SixForSixExplainerIfApplicable } from "./sixForSixExplainer";

const subHeadingTitleCss = `
    ${headline.small()};
    font-weight: bold;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;
const subHeadingBorderTopCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    margin: 50px 0 ${space[5]}px;
  `;
const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;

interface InnerContentProps {
  props: RouteableStepProps;
  productDetail: ProductDetail;
}
const InnerContent = ({ props, productDetail }: InnerContentProps) => {
  const mainPlan = getMainPlan(productDetail.subscription);

  const futurePlan = getFuturePlanIfVisible(productDetail.subscription);

  const topLevelProductType = props.productType;

  const specificProductType =
    topLevelProductType.mapGroupedToSpecific?.(productDetail) ||
    topLevelProductType;

  const hasCancellationPending = productDetail.subscription.cancelledAt;

  const pageTitle = `Manage ${topLevelProductType.friendlyName}`;

  const cancelledCopy =
    specificProductType.cancelledCopy || topLevelProductType.cancelledCopy;

  const [overiddenAmount, setOveriddenAmount] = useState<number | null>(null);
  const isAmountOveridable = specificProductType.updateAmountMdaEndpoint;

  return (
    <>
      <PageHeaderContainer
        selectedNavItem={navLinks.accountOverview}
        title={pageTitle}
        breadcrumbs={[
          {
            title: navLinks.accountOverview.title,
            link: navLinks.accountOverview.link
          },
          {
            title: pageTitle,
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
              link: `/payment/${specificProductType.urlPart}`,
              state: productDetail
            }}
            additionalcss={css`
              margin-top: 30px;
            `}
          />
        )}
        <div
          css={css`
            ${subHeadingBorderTopCss}
            display: flex;
            align-items: start;
            justify-content: space-between;
          `}
        >
          <h2
            css={css`
              ${subHeadingTitleCss}
              margin: 0;
            `}
          >
            {specificProductType.productTitle(mainPlan)}
          </h2>
          {isGift(productDetail.subscription) && (
            <i
              css={css`
                margin: 4px 0 0 ${space[3]}px;
              `}
            >
              <GiftIcon alignArrowToThisSide={"left"} />
            </i>
          )}
        </div>

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
              {cancelledCopy}{" "}
              <strong>{formatDateStr(productDetail.subscription.end)}</strong>
            </span>
            .
          </p>
        )}

        {isAmountOveridable && isPaidSubscriptionPlan(mainPlan) ? (
          <ContributionUpdateAmountForm
            subscriptionId={productDetail.subscription.subscriptionId}
            mainPlan={mainPlan}
            productType={specificProductType}
            nextPaymentDate={productDetail.subscription.nextPaymentDate}
            amountUpdateStateChange={setOveriddenAmount}
          />
        ) : (
          <ProductDescriptionListTable
            content={[
              ...(topLevelProductType.shouldRevealSubscriptionId
                ? [
                    {
                      title: "Subscription ID",
                      value: productDetail.subscription.subscriptionId
                    }
                  ]
                : []),
              ...(topLevelProductType.tierLabel
                ? [
                    {
                      title: topLevelProductType.tierLabel,
                      value: productDetail.tier
                    }
                  ]
                : []),
              ...(topLevelProductType.shouldShowJoinDateNotStartDate
                ? [
                    {
                      title: "Join date",
                      value: formatDateStr(productDetail.joinDate)
                    }
                  ]
                : [
                    {
                      title: "Start date",
                      value: productDetail.subscription.start
                        ? formatDateStr(productDetail.subscription.start)
                        : "-"
                    }
                  ])
            ]}
          />
        )}

        {specificProductType.changeTierUrl && (
          <a href={specificProductType.changeTierUrl(window?.guardian?.domain)}>
            <Button priority="secondary">Change tier</Button>
          </a>
        )}
        <h2
          css={css`
            ${subHeadingCss}
          `}
        >
          Payment
        </h2>
        <SixForSixExplainerIfApplicable
          additionalCss={css`
            ${textSans.medium()};
          `}
          mainPlan={mainPlan}
          hasCancellationPending={hasCancellationPending}
        />
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
                      productDetail.subscription.currentPlans.length !== 0 &&
                        isSixForSix(mainPlan.name)
                        ? futurePlan.interval
                        : mainPlan.interval
                    )} payment`,
                    value: `${mainPlan.currency}${(
                      overiddenAmount ||
                      (productDetail.subscription.nextPaymentPrice ||
                        mainPlan.amount) / 100.0
                    ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                  },
                  {
                    title: "Next payment date",
                    ...(productDetail.subscription.nextPaymentDate && {
                      value: formatDateStr(
                        productDetail.subscription.currentPlans.length === 0
                          ? mainPlan.start
                          : productDetail.subscription.nextPaymentDate
                      )
                    })
                  }
                ]
              : []),
            {
              title: `Payment${productDetail.isPaidTier ? " method" : ""}`,
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
              ),
              spanTwoCols: productDetail.subscription.payPalEmail
                ? true
                : undefined
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
              to={`/payment/${specificProductType.urlPart}`}
              state={productDetail}
            />
          )}

        {specificProductType.delivery?.showAddress?.(
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
                    ),
                    spanTwoCols: true
                  }
                ]}
              />
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Manage delivery address"
                to={`/delivery/${specificProductType.urlPart}/address`}
                state={productDetail}
              />
            </>
          )}

        {hasDeliveryRecordsFlow(specificProductType) && (
          <>
            <h2
              css={css`
                ${subHeadingCss}
              `}
            >
              Delivery history
            </h2>
            <p
              css={css`
                ${textSans.medium()}
              `}
            >
              Check delivery history and report an issue.
            </p>
            <LinkButton
              colour={palette.brand[800]}
              textColour={palette.brand[400]}
              fontWeight="bold"
              text="Manage delivery history"
              to={`/delivery/${specificProductType.urlPart}/records`}
              state={productDetail}
            />
          </>
        )}

        {shouldHaveHolidayStopsFlow(specificProductType) &&
          productDetail.subscription.autoRenew &&
          !hasCancellationPending && (
            <>
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Going on holiday?
              </h2>
              <p
                css={css`
                  ${textSans.medium()}
                `}
              >
                Don’t fret - you can manage your suspensions by clicking the
                button below. You will be credited for each suspended{" "}
                {specificProductType.holidayStops.issueKeyword} on the first
                bill after the suspension date.
              </p>
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Manage suspensions"
                to={`/suspend/${specificProductType.urlPart}`}
                state={productDetail}
              />
            </>
          )}

        {!productDetail.subscription.autoRenew &&
          specificProductType.renewalMetadata && (
            <>
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Renewal
              </h2>
              <p
                css={css`
                  ${textSans.medium()}
                `}
              >
                To renew this one-off {specificProductType.friendlyName}, please
                contact us.
              </p>
              <CallCentreEmailAndNumbers />
              <p
                css={css`
                  ${textSans.medium()}
                `}
              >
                Alternatively, if you would prefer to start a recurring{" "}
                {specificProductType.friendlyName} you can explore payment
                options and subscribe online by clicking the button below.
              </p>
              <SupportTheGuardianButton
                {...specificProductType.renewalMetadata}
                fontWeight="bold"
                textColour={palette.neutral[100]}
                colour={palette.brand[400]}
                notPrimary
              />
            </>
          )}

        {specificProductType.cancellation && !hasCancellationPending && (
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
            to={"/cancel/" + specificProductType.urlPart}
            state={productDetail}
          >
            Cancel {topLevelProductType.friendlyName}
          </Link>
        )}
      </PageNavAndContentContainer>
    </>
  );
};

export const ManageProduct = (props: RouteableStepProps) => (
  <ProductDetailWrapper
    {...props}
    loadingMessagePrefix="Retrieving details of your"
    allowCancelledSubscription
  >
    {productDetail => (
      <InnerContent props={props} productDetail={productDetail} />
    )}
  </ProductDetailWrapper>
);
