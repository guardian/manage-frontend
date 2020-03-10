import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import {
  getMainPlan,
  isGift,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypes } from "../../../shared/productTypes";
import { minWidth } from "../../styles/breakpoints";
import { titlepiece } from "../../styles/fonts";
import { LinkButton } from "../buttons";

interface SubscriptionProductProps {
  productDetail: ProductDetail;
}

export const SubscriptionProduct = (props: SubscriptionProductProps) => {
  const productType = ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
    props.productDetail
  );
  const productName =
    productType?.alternateTierValue || props.productDetail.tier;
  const mainPlan = getMainPlan(props.productDetail.subscription);

  const dtCss = css`
    ${textSans.medium({ fontWeight: "bold" })};
    margin: 0;
    padding: 0;
    display: inline-block;
    min-width: 14ch;
  `;

  const ddCss = css`
    ${textSans.medium()};
    margin: 0;
    padding: 0;
    display: inline-block;
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
          background-color: ${palette.brand[400]};
          margin: 0;
          padding: ${space[3]}px;
          color: ${palette.neutral[100]};
          ${titlepiece.small()};
          font-size: 17px;
          ${minWidth.tablet} {
            font-size: 20px;
            padding: ${space[3]}px ${space[5]}px;
          }
        `}
      >
        {productName}
        {mainPlan.name && <i>&nbsp;({mainPlan.name})</i>}
        {isGift(props.productDetail.subscription) && <span>GIFT</span>}
      </h2>
      <div
        css={css`
          padding: ${space[3]}px;
          ${minWidth.tablet} {
            padding: ${space[5]}px;
          }
        `}
      >
        <dl
          css={css`
            margin: 0;
            padding: 0;
          `}
        >
          <dt css={dtCss}>Subscription ID</dt>
          <dd css={ddCss}>{props.productDetail.subscription.subscriptionId}</dd>
          {props.productDetail.subscription.start && (
            <div
              css={css`
                display: block;
              `}
            >
              <dt css={dtCss}>Start date</dt>
              <dd css={ddCss}>{props.productDetail.subscription.start}</dd>
            </div>
          )}
          <LinkButton
            to={"adsf"}
            text={"Manage subscription"}
            colour={palette.brand[800]}
            textColour={palette.brand[400]}
            fontWeight={"bold"}
          />
        </dl>
      </div>
    </div>
  );
};
