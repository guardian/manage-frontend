import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React from "react";
import { DirectDebitDetails } from "../../../shared/productResponse";
import { minWidth } from "../../styles/breakpoints";
import { DirectDebitLogo } from "./directDebitLogo";
import { Inlineable } from "./inlineable";

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const cleanSortCode = (sortCode: string) =>
  sortCode.replace(/[^0-9]/g, "");

export const dashifySortCode = (sortCode: string) => {
  if (!sortCode) {
    return sortCode;
  }
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

const sanitiseAccountNumber = (accountNumber: string) => {
  if (!accountNumber) {
    return accountNumber;
  }
  return (
    accountNumber.length >= NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW && (
      <span
        css={{
          marginRight: "10px"
        }}
      >
        {`account ending ${accountNumber.substr(
          accountNumber.length - NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
        )}`}
      </span>
    )
  );
};

export interface DirectDebitDisplayProps
  extends DirectDebitDetails,
    Inlineable {
  showAccountName?: true;
  inErrorState?: boolean;
}

export const DirectDebitInlineDisplay = (props: DirectDebitDisplayProps) => (
  <div
    css={{
      display: props.inline ? "inline-flex" : "flex",
      alignItems: "top"
    }}
  >
    <i
      css={css`
        margin-top: 2px;
      `}
    >
      <DirectDebitLogo fill={palette.neutral[7]} />
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
          color: ${props.inErrorState ? palette.news[400] : palette.neutral[7]};
          ${minWidth.tablet} {
            display: inline-block;
            vertical-align: top;
          }
        `}
      >
        {props.accountName}
      </span>
      <span
        css={css`
          display: block;
          color: ${props.inErrorState ? palette.news[400] : palette.neutral[7]};
          ${minWidth.tablet} {
            display: inline-block;
            vertical-align: top;
            margin-left: ${space[2]}px;
          }
        `}
      >
        {sanitiseAccountNumber(props.accountNumber)}
      </span>
    </div>
  </div>
);

export const DirectDebitDisplay = (mandate: DirectDebitDisplayProps) => (
  <div
    css={{
      display: mandate.inline ? "inline-flex" : "flex",
      flexWrap: "wrap",
      alignItems: "top"
    }}
  >
    <DirectDebitLogo fill={palette.neutral[7]} marginRight />
    <div
      css={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {sanitiseAccountNumber(mandate.accountNumber)}
      {mandate.showAccountName && mandate.accountName ? (
        <span>{mandate.accountName}</span>
      ) : (
        undefined
      )}
    </div>
  </div>
);
