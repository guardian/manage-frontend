import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
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
import { ProductType } from "../../../shared/productTypes";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { titlepiece } from "../../styles/fonts";
import { LinkButton } from "../buttons";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PayPalDisplay } from "../payment/paypalDisplay";
import { ErrorIcon } from "../svgs/errorIcon";
import { GiftIcon } from "../svgs/giftIcon";

type ProductCategory = "subscription" | "membership" | "contribution";

interface ProductProps {
  productCategory: ProductCategory;
  productDetail: ProductDetail;
  topLevelProductType: ProductType;
  specificProductType: ProductType;
}

export const Product = (props: ProductProps) => {
  const productName =
    props.specificProductType.alternateTierValue || props.productDetail.tier;

  const mainPlan = getMainPlan(props.productDetail.subscription);

  const futurePlan = getFuturePlanIfVisible(props.productDetail.subscription);

  const hasCancellationPending: boolean =
    props.productDetail.subscription.cancelledAt;

  const hasPaymentFailure: boolean = !!props.productDetail.alertText;

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
        border: 1px solid ${palette.neutral[86]};
        margin-top: ${space[12]}px;
      `}
    >
      <h2
        css={css`
          position: relative;
          background-color: ${hasCancellationPending
            ? palette.neutral[97]
            : palette.brand[400]};
          margin: 0;
          padding: ${space[3]}px 12ch ${space[3]}px ${space[3]}px;
          color: ${hasCancellationPending
            ? palette.neutral[7]
            : palette.neutral[100]};
          ${titlepiece.small()};
          font-weight: bold;
          font-size: 17px;
          ${minWidth.tablet} {
            font-size: 20px;
            padding: ${space[3]}px ${space[5]}px;
          }
        `}
      >
        {props.productCategory === "subscription" && (
          <>
            {productName}
            {mainPlan.name &&
              !isSixForSix(mainPlan.name) &&
              ` - ${mainPlan.name}`}
          </>
        )}
        {props.productCategory === "membership" && (
          <>
            Guardian membership
            {mainPlan.name && <i>&nbsp;({mainPlan.name})</i>}
          </>
        )}
        {props.productCategory === "contribution" && (
          <>
            Recurring contribution
            {mainPlan.name && <i>&nbsp;({mainPlan.name})</i>}
          </>
        )}

        <div
          css={css`
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
          `}
        >
          {hasCancellationPending && (
            <i>
              <ErrorIcon fill={palette.brandYellow[200]} />
              <span
                css={css`
                  ${textSans.medium({ fontWeight: "bold" })};
                  margin: 0 ${space[3]}px 0 ${space[2]}px;
                  font-style: normal;
                `}
              >
                Cancelled
              </span>
            </i>
          )}
          {isGift(props.productDetail.subscription) && (
            <i
              css={
                hasCancellationPending &&
                css`
                  ${maxWidth.mobileLandscape} {
                    display: none; // TODO: find a way to include both cancelation and gift display on mobile
                  }
                `
              }
            >
              <GiftIcon alignArrowToThisSide={"left"} />
            </i>
          )}
        </div>
      </h2>
      {isSixForSix(mainPlan.name) &&
        isPaidSubscriptionPlan(mainPlan) &&
        !hasCancellationPending && (
          <p
            css={css`
              ${textSans.medium()};
              padding: 20px 20px 0;
              margin: 0;
            `}
          >
            This subscription is still in the initial '6 issues for{" "}
            {mainPlan.currency}6' promotional period.
          </p>
        )}
      {hasCancellationPending &&
        props.productDetail.subscription.end &&
        props.productCategory !== "contribution" && (
          <p
            css={css`
              ${textSans.medium()};
              padding: 20px 20px 0;
              margin: 0;
            `}
          >
            {props.productCategory === "subscription" &&
              "Your subscription has been cancelled. You are able to access your subscription until "}
            {props.productCategory === "membership" &&
              "Your membership has been cancelled. You will receive the benefit of your membership until "}
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {formatDateStr(props.productDetail.subscription.end)}
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
          {props.productCategory !== "contribution" && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>
                {props.productCategory === "subscription" && "Subscription ID"}
                {props.productCategory === "membership" && "Membership tier"}
              </li>
              <li css={valueCss}>
                {props.productCategory === "subscription" &&
                  props.productDetail.subscription.subscriptionId}
                {props.productCategory === "membership" &&
                  props.productDetail.tier}
              </li>
            </ul>
          )}
          {props.productDetail.subscription.start && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>
                {props.productCategory !== "membership" ? "Start " : "Join "}
                date
              </li>
              <li css={valueCss}>
                {formatDateStr(
                  props.productCategory === "membership"
                    ? props.productDetail.joinDate
                    : props.productDetail.subscription.start
                )}
              </li>
            </ul>
          )}
          {props.specificProductType.showTrialRemainingIfApplicable &&
            props.productDetail.subscription.trialLength > 0 && (
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
          <div
            css={css`
              margin-top: auto;
            `}
          >
            <LinkButton
              to={`/${props.topLevelProductType.urlPart}`}
              text={`Manage ${props.productCategory}`}
              state={props.productDetail}
              colour={palette.brand[800]}
              textColour={palette.brand[400]}
              fontWeight={"bold"}
            />
          </div>
        </div>

        <div
          css={css`
            margin: ${space[6]}px 0 0 0;
            padding: ${space[6]}px 0 0 0;
            border-top: 1px solid ${palette.neutral[86]};
            ${minWidth.tablet} {
              flex: 1;
              display: flex;
              flex-flow: column nowrap;
              padding: 0 0 0 ${space[5]}px;
              border-top: none;
              border-left: 1px solid ${palette.neutral[86]};
              margin: 0;
              padding: 0 0 0 ${space[5]}px;
            }
            ul:last-of-type {
              margin-bottom: ${space[5]}px;
            }
          `}
        >
          {isPaidSubscriptionPlan(mainPlan) &&
            props.productDetail.subscription.autoRenew &&
            !hasCancellationPending && (
              <ul css={keyValuePairCss}>
                <li css={keyCss}>{`Next ${augmentInterval(
                  props.productDetail.subscription.currentPlans.length !== 0 &&
                    isSixForSix(mainPlan.name)
                    ? futurePlan.interval
                    : mainPlan.interval
                )} payment`}</li>
                <li css={valueCss}>
                  <span
                    css={css`
                      display: block;
                    `}
                  >
                    {`${mainPlan.currency}${(
                      (props.productDetail.subscription.nextPaymentPrice ||
                        mainPlan.amount) / 100.0
                    ).toFixed(2)} ${mainPlan.currencyISO}`}
                  </span>
                  <span
                    css={css`
                      display: block;
                    `}
                  >
                    {props.productDetail.subscription.nextPaymentDate &&
                      !hasPaymentFailure &&
                      formatDateStr(
                        props.productDetail.subscription.currentPlans.length ===
                          0
                          ? mainPlan.start
                          : props.productDetail.subscription.nextPaymentDate
                      )}
                  </span>
                </li>
              </ul>
            )}
          {props.productDetail.isPaidTier ? (
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
              {!props.productDetail.subscription.payPalEmail && (
                <div
                  css={css`
                    margin-top: auto;
                  `}
                >
                  <LinkButton
                    to={`/payment/${props.specificProductType.urlPart}`}
                    state={props.productDetail}
                    text={"Manage payment method"}
                    colour={
                      hasPaymentFailure
                        ? palette.brand[400]
                        : palette.brand[800]
                    }
                    textColour={
                      hasPaymentFailure
                        ? palette.neutral[100]
                        : palette.brand[400]
                    }
                    fontWeight={"bold"}
                    alert={hasPaymentFailure}
                  />
                </div>
              )}
            </>
          ) : (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Payment</li>
              <li css={valueCss}>FREE</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
