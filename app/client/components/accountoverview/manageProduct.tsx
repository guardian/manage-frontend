import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { cancellationFormatDate } from "../../../shared/dates";
import {
  getMainPlan,
  isGift,
  isPaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import {
  hasDeliveryRecordsFlow,
  ProductType,
  shouldHaveHolidayStopsFlow
} from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { BasicProductInfoTable } from "../basicProductInfoTable";
import { LinkButton } from "../buttons";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { DeliveryAddressDisplay } from "../delivery/address/deliveryAddressDisplay";
import { FlowWrapper } from "../FlowWrapper";
import { NAV_LINKS } from "../nav/navConfig";
import { getNextPaymentDetails } from "../payment/nextPaymentDetails";
import { PaymentDetailsTable } from "../payment/paymentDetailsTable";
import { PaymentFailureAlertIfApplicable } from "../payment/paymentFailureAlertIfApplicable";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";
import { RouteableStepPropsForGrouped } from "../wizardRouterAdapter";
import { ContributionUpdateAmountForm } from "./contributionUpdateAmountForm";
import { NewsletterOptinSection } from "./newsletterOptinSection";
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
export const subHeadingCss = `
    ${subHeadingBorderTopCss}
    ${subHeadingTitleCss}
  `;

interface InnerContentProps {
  props: RouteableStepPropsForGrouped;
  productDetail: ProductDetail;
}
const InnerContent = ({ props, productDetail }: InnerContentProps) => {
  const mainPlan = getMainPlan(productDetail.subscription);

  const groupedProductType = props.groupedProductType;

  const specificProductType = groupedProductType.mapGroupedToSpecific(
    productDetail
  );

  const hasCancellationPending = productDetail.subscription.cancelledAt;

  const cancelledCopy =
    specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

  const [overiddenAmount, setOveriddenAmount] = useState<number | null>(null);
  const isAmountOveridable = specificProductType.updateAmountMdaEndpoint;

  const nextPaymentDetails = getNextPaymentDetails(
    mainPlan,
    productDetail.subscription,
    overiddenAmount,
    !!productDetail.alertText
  );

  return (
    <>
      <PaymentFailureAlertIfApplicable productDetail={productDetail} />
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
          <ErrorIcon fill={palette.brandAlt[200]} />
          <span
            css={css`
              margin-left: ${space[2]}px;
            `}
          >
            {cancelledCopy}{" "}
            <strong>
              {cancellationFormatDate(
                productDetail.subscription.cancellationEffectiveDate
              )}
            </strong>
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
        <BasicProductInfoTable
          groupedProductType={groupedProductType}
          productDetail={productDetail}
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
      <PaymentDetailsTable
        productDetail={productDetail}
        nextPaymentDetails={nextPaymentDetails}
        hasCancellationPending={hasCancellationPending}
      />
      {productDetail.isPaidTier && !productDetail.subscription.payPalEmail && (
        <LinkButton
          colour={
            productDetail.alertText ? palette.brand[400] : palette.brand[800]
          }
          textColour={
            productDetail.alertText ? palette.neutral[100] : palette.brand[400]
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
              alternateRowBgColors
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
                },
                ...(specificProductType.delivery
                  ?.enableDeliveryInstructionsUpdate
                  ? [
                      {
                        title: "Instructions",
                        value:
                          productDetail.subscription.deliveryAddress
                            .instructions,
                        spanTwoCols: true
                      }
                    ]
                  : [])
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
              {specificProductType.holidayStops.issueKeyword} on the first bill
              after the suspension date.
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
              {specificProductType.friendlyName} you can explore payment options
              and subscribe online by clicking the button below.
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

      {specificProductType.restrictedNewsletterIDs && (
        <NewsletterOptinSection
          activeNewletterIDs={specificProductType.restrictedNewsletterIDs}
        />
      )}

      {!hasCancellationPending && (
        <CancellationCTA
          productDetail={productDetail}
          friendlyName={groupedProductType.friendlyName}
          specificProductType={specificProductType}
        />
      )}
    </>
  );
};

interface CancellationCTAProps {
  productDetail: ProductDetail;
  friendlyName: string;
  specificProductType: ProductType;
}

const CancellationCTA = (props: CancellationCTAProps) => {
  const shouldContactUsToCancel =
    !props.productDetail.selfServiceCancellation.isAllowed ||
    !props.specificProductType.cancellation;
  return (
    <div
      css={css`
        margin: ${space[24]}px 0 0 auto;
        ${textSans.medium()}
        color: ${palette.neutral[46]};
      `}
    >
      {shouldContactUsToCancel &&
        "Would you like to cancel your subscription? "}
      <Link
        css={css`
          color: ${palette.brand["500"]};
        `}
        to={"/cancel/" + props.specificProductType.urlPart}
        state={props.productDetail}
      >
        {shouldContactUsToCancel
          ? "Contact us"
          : `Cancel ${props.friendlyName}`}
      </Link>
    </div>
  );
};

export const ManageProduct = (props: RouteableStepPropsForGrouped) => (
  <FlowWrapper
    {...props}
    productType={props.groupedProductType}
    loadingMessagePrefix="Retrieving details of your"
    allowCancelledSubscription
    forceRedirectToAccountOverviewIfNoBrowserHistoryState
    selectedNavItem={NAV_LINKS.accountOverview}
    pageTitle={`Manage ${props.groupedProductType.shortFriendlyName ||
      props.groupedProductType.friendlyName}`}
    breadcrumbs={[
      {
        title: NAV_LINKS.accountOverview.title,
        link: NAV_LINKS.accountOverview.link
      },
      {
        title: `Manage ${props.groupedProductType.friendlyName}`,
        currentPage: true
      }
    ]}
  >
    {productDetail => (
      <InnerContent props={props} productDetail={productDetail} />
    )}
  </FlowWrapper>
);
