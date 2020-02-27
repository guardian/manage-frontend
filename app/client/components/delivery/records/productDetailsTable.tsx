import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { palette } from "@guardian/src-foundations";
import { textSans, titlepiece } from "@guardian/src-foundations/typography";
import React from "react";
import { minWidth } from "../../../styles/breakpoints";

interface ProductDetailsTableProps {
  productName: string;
  subscriptionId: string;
  isGift: true;
}

export const ProductDetailsTable = (props: ProductDetailsTableProps) => {
  const dlCss = css`
    ${textSans.medium()};
    padding: ${space[3]}px;
    margin: 0;
    ${minWidth.tablet} {
      padding: ${space[5]}px;
    }
    & div {
      display: inline-block;
      ${minWidth.tablet} {
        width: 50%;
      }
    }
    & div + div {
      margin-top: ${space[3]}px;
      ${minWidth.tablet} {
        margin-top: 0;
      }
    }
    & dt {
      font-weight: 500;
      display: inline-block;
      vertical-align: top;
      width: 12ch;
      ${minWidth.tablet} {
        width: auto;
        margin-right: ${space[5]}px;
      }
    }
    & dd {
      display: inline-block;
      vertical-align: top;
      margin: 0;
      width: calc(100% - 12ch);
      ${minWidth.tablet} {
        width: auto;
      }
    }
  `;
  return (
    <div
      css={css`
        border: 1px solid ${palette.neutral[86]};
      `}
    >
      <h2
        css={css`
          ${titlepiece.small()};
          font-size: 17px;
          padding: ${space[3]}px;
          margin: 0;
          background-color: ${palette.brand[400]};
          color: white;
          ${minWidth.tablet} {
            font-size: 20px;
            padding: ${space[3]}px ${space[5]}px;
          }
        `}
      >
        Subscription details
        {props.isGift && (
          <span
            css={css`
              display: inline-block;
              margin-left: ${space[3]}px;
            `}
          >
            [GIFT]
          </span>
        )}
      </h2>
      <dl css={dlCss}>
        <div>
          <dt>Product:</dt>
          <dd>{props.productName}</dd>
        </div>
        <div>
          <dt>Subscription ID:</dt>
          <dd>{props.subscriptionId}</dd>
        </div>
      </dl>
    </div>
  );
};
