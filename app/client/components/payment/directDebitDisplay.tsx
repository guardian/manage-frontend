import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import { DirectDebitDetails } from "../../../shared/productResponse";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { DirectDebitLogo } from "./directDebitLogo";
import { Inlineable } from "./inlineable";

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const cleanSortCode = (sortCode: string) =>
  sortCode.replace(/[^0-9]/g, "");

export const dashifySortCode = (sortCode: string) => {
  const cleanedSortCode = cleanSortCode(sortCode);
  if (cleanedSortCode.length !== 6) {
    return cleanedSortCode;
  }
  return (
    cleanedSortCode.substr(0, 2) +
    "-" +
    cleanedSortCode.substr(2, 2) +
    "-" +
    cleanedSortCode.substr(4, 2)
  );
};

export interface DirectDebitDisplayProps
  extends DirectDebitDetails,
    Inlineable {
  showAccountName?: true;
}

export const DirectDebitInlineDisplay = (mandate: DirectDebitDisplayProps) => (
  <div
    css={{
      display: mandate.inline ? "inline-flex" : "flex",
      alignItems: "top"
    }}
  >
    <i
      css={css`
        margin-top: 2px;
      `}
    >
      <DirectDebitLogo justLogo />
    </i>
    <div
      css={css`
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
      `}
    >
      <span
        css={css`
          display: block;
          ${minWidth.tablet} {
            display: inline-block;
            vertical-align: top;
          }
        `}
      >
        {mandate.accountName}
      </span>
      <span
        css={css`
          display: block;
          ${minWidth.tablet} {
            display: inline-block;
            vertical-align: top;
            margin-left: ${space[2]}px;
          }
        `}
      >
        {mandate.accountNumber}
      </span>
    </div>
  </div>
);

export const DirectDebitDisplay = (mandate: DirectDebitDisplayProps) => (
  <div
    css={{
      display: mandate.inline ? "inline-flex" : "flex",
      alignItems: "top"
    }}
  >
    <DirectDebitLogo fill={palette.neutral["1"]} />
    <div
      css={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      <span
        css={{
          marginLeft: "10px"
        }}
      >
        {mandate.sortCode ? dashifySortCode(mandate.sortCode) : undefined}
      </span>
      {mandate.accountNumber &&
      mandate.accountNumber.length > NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW ? (
        <span
          css={{
            marginLeft: "10px"
          }}
        >
          {"•".repeat(
            mandate.accountNumber.length -
              NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
          ) +
            mandate.accountNumber.substr(
              mandate.accountNumber.length -
                NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
            )}
        </span>
      ) : (
        undefined
      )}
      {mandate.showAccountName && mandate.accountName ? (
        <span
          css={{
            marginLeft: "10px"
          }}
        >
          {mandate.accountName}
        </span>
      ) : (
        undefined
      )}
    </div>
  </div>
);
