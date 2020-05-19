import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  getMainPlan,
  isGift,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { minWidth } from "../../styles/breakpoints";
import { titlepiece } from "../../styles/fonts";
import { LinkButton } from "../buttons";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PaypalLogo } from "../payment/paypalLogo";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
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

  const mainPlan = getMainPlan(
    props.productDetail.subscription
  ) as PaidSubscriptionPlan;

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
            {mainPlan.name && ` - ${mainPlan.name}`}
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
        {hasCancellationPending ? (
          <i
            css={css`
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            `}
          >
            <ErrorIcon
              {...(hasCancellationPending
                ? { fill: palette.brandYellow[200] }
                : {})}
            />
            <span
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
                margin: 0 ${space[3]}px 0 ${space[2]}px;
                font-style: normal;
              `}
            >
              {hasCancellationPending && "Cancelled"}
            </span>
          </i>
        ) : (
          isGift(props.productDetail.subscription) && (
            <i
              css={css`
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              `}
            >
              <GiftIcon alignArrowToThisSide={"left"} />
            </i>
          )
        )}
      </h2>
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
                {props.productCategory === "membership" && productName}
              </li>
            </ul>
          )}
          {props.productCategory === "contribution" && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Payment amount</li>
              <li css={valueCss}>
                {`${mainPlan.currency}${(mainPlan.amount / 100.0).toFixed(2)}`}
              </li>
            </ul>
          )}
          {props.productDetail.subscription.start && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>Start date</li>
              <li css={valueCss}>
                {formatDateStr(props.productDetail.subscription.start)}
              </li>
            </ul>
          )}
          {hasCancellationPending && props.productDetail.subscription.end && (
            <ul css={keyValuePairCss}>
              <li css={keyCss}>End date</li>
              <li css={valueCss}>
                {formatDateStr(props.productDetail.subscription.end)}
              </li>
            </ul>
          )}
          <div
            css={css`
              margin-top: auto;
            `}
          >
            {hasCancellationPending &&
            props.productCategory !== "contribution" ? (
              <SupportTheGuardianButton
                supportReferer={`${
                  props.topLevelProductType.urlPart
                }_${"subscription_product_page"}`}
                urlSuffix={props.topLevelProductType.noProductSupportUrlSuffix}
                notPrimary
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                withoutArrow
              />
            ) : (
              <LinkButton
                to={`/${props.topLevelProductType.urlPart}`}
                text={`Manage ${props.productCategory}`}
                state={props.productDetail}
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight={"bold"}
              />
            )}
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
          {hasCancellationPending ? (
            <>
              {props.productDetail.subscription.nextPaymentPrice && (
                <ul css={keyValuePairCss}>
                  <li css={keyCss}>Last payment</li>
                  <li css={valueCss}>
                    <span
                      css={css`
                        display: block;
                      `}
                    >
                      {props.productCategory !== "contribution" &&
                        `${mainPlan.currency}${props.productDetail.subscription.nextPaymentPrice}`}
                      {props.productCategory === "contribution" &&
                      props.productDetail.subscription.nextPaymentDate
                        ? formatDateStr(
                            props.productDetail.subscription.nextPaymentDate
                          )
                        : "-"}
                    </span>
                    {props.productCategory !== "contribution" && (
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {props.productDetail.subscription.nextPaymentDate
                          ? formatDateStr(
                              props.productDetail.subscription.nextPaymentDate
                            )
                          : "-"}
                      </span>
                    )}
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              {props.productCategory === "subscription" &&
                props.productDetail.subscription.nextPaymentDate &&
                props.productDetail.subscription.nextPaymentPrice &&
                props.productDetail.subscription.autoRenew &&
                !hasPaymentFailure && (
                  <ul css={keyValuePairCss}>
                    <li css={keyCss}>Next payment</li>
                    <li css={valueCss}>
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {`${mainPlan.currency}${(
                          props.productDetail.subscription.nextPaymentPrice /
                          100.0
                        ).toFixed(2)}`}
                      </span>
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {props.productDetail.subscription.nextPaymentDate
                          ? formatDateStr(
                              props.productDetail.subscription.nextPaymentDate
                            )
                          : "-"}
                      </span>
                    </li>
                  </ul>
                )}
              {props.productCategory === "membership" &&
                props.productDetail.subscription.nextPaymentPrice && (
                  <ul css={keyValuePairCss}>
                    <li css={keyCss}>Next payment</li>
                    <li css={valueCss}>
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {`${mainPlan.currency}${(
                          props.productDetail.subscription.nextPaymentPrice /
                          100.0
                        ).toFixed(2)}`}
                      </span>
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {props.productDetail.subscription.nextPaymentDate
                          ? formatDateStr(
                              props.productDetail.subscription.nextPaymentDate
                            )
                          : "-"}
                      </span>
                    </li>
                  </ul>
                )}
              {props.productCategory === "contribution" &&
                props.productDetail.subscription.nextPaymentPrice && (
                  <ul css={keyValuePairCss}>
                    <li css={keyCss}>Next payment</li>
                    <li css={valueCss}>
                      <span
                        css={css`
                          display: block;
                        `}
                      >
                        {props.productDetail.subscription.nextPaymentDate
                          ? formatDateStr(
                              props.productDetail.subscription.nextPaymentDate
                            )
                          : "-"}
                      </span>
                    </li>
                  </ul>
                )}
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
                    <PaypalLogo />
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
                    hasPaymentFailure ? palette.brand[400] : palette.brand[800]
                  }
                  textColour={
                    hasPaymentFailure
                      ? palette.neutral[100]
                      : palette.brand[400]
                  }
                  fontWeight={"bold"}
                  {...(hasPaymentFailure ? { alert: true } : {})}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
