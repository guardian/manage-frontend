import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, brandAlt, neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { cancellationFormatDate, formatDateStr } from "../../../shared/dates";
import {
  getMainPlan,
  isGift,
  ProductDetail
} from "../../../shared/productResponse";
import { GROUPED_PRODUCT_TYPES } from "../../../shared/productTypes";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { LinkButton } from "../buttons";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import {
  getNextPaymentDetails,
  NewPaymentPriceAlert
} from "../payment/nextPaymentDetails";
import { PayPalDisplay } from "../payment/paypalDisplay";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";
import { SixForSixExplainerIfApplicable } from "./sixForSixExplainer";

interface AccountOverviewCardProps {
  productDetail: ProductDetail;
}

export const AccountOverviewCard = (props: AccountOverviewCardProps) => {
  const mainPlan = getMainPlan(props.productDetail.subscription);

  const hasCancellationPending: boolean =
    props.productDetail.subscription.cancelledAt;

  const groupedProductType =
    GROUPED_PRODUCT_TYPES[props.productDetail.mmaCategory];

  const specificProductType = groupedProductType.mapGroupedToSpecific(
    props.productDetail
  );

  const cancelledCopy =
    specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

  const hasPaymentFailure: boolean = !!props.productDetail.alertText;

  const shouldShowJoinDateNotStartDate =
    groupedProductType.shouldShowJoinDateNotStartDate;

  const subscriptionStartDate = props.productDetail.subscription.start;

  const subscriptionEndDate = props.productDetail.subscription.end;

  const nextPaymentDetails = getNextPaymentDetails(
    mainPlan,
    props.productDetail.subscription,
    null,
    hasPaymentFailure
  );

  const isGifted = isGift(props.productDetail.subscription);

  const userIsGifter = isGifted && props.productDetail.isPaidTier;

  const giftPurchaseDate = props.productDetail.subscription.lastPaymentDate;

  const shouldShowStartDate = !(shouldShowJoinDateNotStartDate || userIsGifter);

  const keyValuePairCss = css`
    list-style: none;
    margin: 0;
    padding: 0;
  `;

  const keyCss = css`
    ${textSans.medium({ fontWeight: "bold" })};
    margin: 0 0 16px 0;
    padding: 0 ${space[2]}px 0 0;
    display: inline-block;
    vertical-align: top;
    width: 14ch;
  `;

  const valueCss = css`
    ${textSans.medium()};
    margin: 0 0 16px 0;
    padding: 0;
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 15ch);
  `;

  return (
    <div
      css={css`
        border: 1px solid ${neutral[86]};
        margin-bottom: ${space[6]}px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: start;
          background-color: ${hasCancellationPending
            ? neutral[97]
            : brand[400]};
          ${minWidth.mobileLandscape} {
            align-items: center;
          }
        `}
      >
        <h2
          css={css`
            font-size: 17px;
            font-weight: bold;
            margin: 0;
            padding: ${space[3]}px;
            color: ${hasCancellationPending ? neutral[7] : neutral[100]};
            ${maxWidth.mobileLandscape} {
              padding: ${space[3]}px;
            }
            ${minWidth.tablet} {
              font-size: 20px;
              padding: ${space[3]}px ${space[5]}px;
            }
          `}
        >
          {specificProductType.productTitle(mainPlan)}
        </h2>
        <div
          css={css`
            display: flex;
            align-items: center;
            padding: ${space[3]}px 0;
            ${maxWidth.mobileLandscape} {
              flex-direction: column;
              align-items: end;
            }
          `}
        >
          {hasCancellationPending && (
            <div
              css={css`
                margin-right: ${space[3]}px;
                white-space: nowrap;
                transform: translateY(1px);
                ${maxWidth.mobileLandscape} {
                  ${isGift(props.productDetail.subscription)
                    ? "margin: 0 5px 6px 0;"
                    : ""};
                }
                ${minWidth.tablet} {
                  margin-right: ${space[5]}px;
                }
              `}
            >
              <ErrorIcon
                fill={brandAlt[200]}
                additionalCss={css`
                  transform: translateY(1px);
                `}
              />
              <span
                css={css`
                  ${textSans.medium({ fontWeight: "bold" })};
                  line-height: 1;
                  margin-left: 6px;
                `}
              >
                Cancelled
              </span>
            </div>
          )}
          {isGift(props.productDetail.subscription) && (
            <GiftIcon alignArrowToThisSide={"left"} />
          )}
        </div>
      </div>
      <SixForSixExplainerIfApplicable
        additionalCss={css`
          ${textSans.medium()};
          padding: ${space[3]}px ${space[3]}px 0;
          margin: 0;
          ${minWidth.tablet} {
            padding: ${space[5]}px ${space[5]}px 0;
          }
        `}
        mainPlan={mainPlan}
        hasCancellationPending={hasCancellationPending}
      />
      {hasCancellationPending &&
        props.productDetail.subscription.end &&
        cancelledCopy && (
          <p
            css={css`
              ${textSans.medium()};
              padding: ${space[3]}px ${space[3]}px 0;
              margin: 0;
              ${minWidth.tablet} {
                padding: ${space[5]}px ${space[5]}px 0;
              }
            `}
          >
            {cancelledCopy.trim() + " "}
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {cancellationFormatDate(
                props.productDetail.subscription.cancellationEffectiveDate
              )}
            </span>
            .
          </p>
        )}
      <div
        css={css`
          padding: ${space[5]}px ${space[3]}px;
          ${minWidth.tablet} {
            padding: ${space[5]}px;
            display: flex;
          }
        `}
      >
        <div
          css={css`
            margin: 0;
            padding: 0;
            ${minWidth.tablet} {
              flex: 1;
              display: flex;
              flex-flow: column nowrap;
            }
            ul:last-of-type {
              margin-bottom: ${space[5]}px;
            }
          `}
        >
          {groupedProductType.shouldRevealSubscriptionId && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Subscription ID</li>
              <li css={valueCss}>
                {props.productDetail.subscription.subscriptionId}
              </li>
            </ul>
          )}
          {groupedProductType.tierLabel && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>{groupedProductType.tierLabel}</li>
              <li css={valueCss}>{props.productDetail.tier}</li>
            </ul>
          )}
          {subscriptionStartDate && shouldShowStartDate && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Start date</li>
              <li css={valueCss}>{formatDateStr(subscriptionStartDate)}</li>
            </ul>
          )}
          {shouldShowJoinDateNotStartDate && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Join date</li>
              <li css={valueCss}>
                {formatDateStr(props.productDetail.joinDate)}
              </li>
            </ul>
          )}
          {userIsGifter && giftPurchaseDate && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Purchase date</li>
              <li css={valueCss}>{formatDateStr(giftPurchaseDate)}</li>
            </ul>
          )}
          {isGifted && !userIsGifter && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>End date</li>
              <li css={valueCss}>{formatDateStr(subscriptionEndDate)}</li>
            </ul>
          )}
          {specificProductType.showTrialRemainingIfApplicable &&
            props.productDetail.subscription.trialLength > 0 &&
            !isGifted && (
              <ul css={keyValuePairCss}>
                <li css={keyCss}>Trial remaining</li>
                <li css={valueCss}>
                  {props.productDetail.subscription.trialLength} day
                  {props.productDetail.subscription.trialLength !== 1
                    ? "s"
                    : ""}
                </li>
              </ul>
            )}
          {!isGifted && (
            <div
              css={css`
                margin-top: auto;
              `}
            >
              <LinkButton
                to={`/${groupedProductType.urlPart}`}
                text={`Manage ${groupedProductType.friendlyName}`}
                state={props.productDetail}
                colour={brand[800]}
                textColour={brand[400]}
                fontWeight={"bold"}
                onClick={() =>
                  trackEvent({
                    eventCategory: "account_overview",
                    eventAction: "click",
                    eventLabel: `manage_${groupedProductType.urlPart}`
                  })
                }
              />
            </div>
          )}
        </div>

        <div
          css={css`
            margin: ${space[6]}px 0 0 0;
            padding: ${space[6]}px 0 0 0;
            border-top: 1px solid ${neutral[86]};
            ${minWidth.tablet} {
              flex: 1;
              display: flex;
              flex-flow: column nowrap;
              padding: 0 0 0 ${space[5]}px;
              border-top: none;
              border-left: 1px solid ${neutral[86]};
              margin: 0;
              padding: 0 0 0 ${space[5]}px;
            }
            ul:last-of-type {
              margin-bottom: ${space[5]}px;
            }
          `}
        >
          {nextPaymentDetails &&
            props.productDetail.subscription.autoRenew &&
            !hasCancellationPending && (
              <ul css={keyValuePairCss}>
                <li css={keyCss}>{nextPaymentDetails.paymentKey}</li>
                <li css={valueCss}>
                  <span
                    css={css`
                      display: block;
                    `}
                  >
                    {nextPaymentDetails.isNewPaymentValue && (
                      <NewPaymentPriceAlert />
                    )}
                    {nextPaymentDetails.paymentValue}
                  </span>
                  {nextPaymentDetails.nextPaymentDateValue && (
                    <span
                      css={css`
                        display: block;
                      `}
                    >
                      {nextPaymentDetails.nextPaymentDateValue}
                    </span>
                  )}
                </li>
              </ul>
            )}
          {props.productDetail.isPaidTier && (
            <>
              <ul css={keyValuePairCss}>
                <li css={keyCss}>Payment method</li>
                <li css={valueCss}>
                  {props.productDetail.subscription.card && (
                    <CardDisplay
                      inErrorState={hasPaymentFailure}
                      margin="0"
                      {...props.productDetail.subscription.card}
                    />
                  )}
                  {props.productDetail.subscription.payPalEmail && (
                    <PayPalDisplay
                      payPalId={props.productDetail.subscription.payPalEmail}
                    />
                  )}
                  {props.productDetail.subscription.mandate && (
                    <DirectDebitDisplay
                      inErrorState={hasPaymentFailure}
                      {...props.productDetail.subscription.mandate}
                    />
                  )}
                  {props.productDetail.subscription
                    .stripePublicKeyForCardAddition && (
                    <span>No Payment Method</span>
                  )}
                </li>
              </ul>
              {!props.productDetail.subscription.payPalEmail && !isGifted && (
                <div
                  css={css`
                    margin-top: auto;
                  `}
                >
                  <LinkButton
                    to={`/payment/${specificProductType.urlPart}`}
                    state={props.productDetail}
                    text={"Manage payment method"}
                    colour={hasPaymentFailure ? brand[400] : brand[800]}
                    textColour={hasPaymentFailure ? neutral[100] : brand[400]}
                    fontWeight={"bold"}
                    alert={hasPaymentFailure}
                    onClick={() =>
                      trackEvent({
                        eventCategory: "account_overview",
                        eventAction: "click",
                        eventLabel: "manage_payment_method"
                      })
                    }
                  />
                </div>
              )}
            </>
          )}
          {!props.productDetail.isPaidTier && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Payment</li>
              <li css={valueCss}>{isGifted ? "Gift redemption" : "Free"}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
