import { css } from "@emotion/core";
import { neutral } from "@guardian/src-foundations/palette";
import React from "react";
import { DirectDebitDetails } from "../../../shared/productResponse";
import { minWidth } from "../../styles/breakpoints";
import { DirectDebitLogo } from "./directDebitLogo";
import { Inlineable } from "./inlineable";

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const cleanSortCode = (sortCode: string) =>
  sortCode.replace(/[^0-9]/g, "");

const dashifySortCode = (sortCode: string) => {
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

const sanitiseAccountNumber = (
  accountNumber: string,
  shortVersion?: boolean
) => {
  if (!accountNumber) {
    return accountNumber;
  }
  return (
    accountNumber.length >= NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW && (
      <span
        css={css`
          ${minWidth.tablet} {
            :before {
              display: inline;
              content: "${shortVersion ? "" : "account "}";
            }
          }
        `}
      >
        {`ending ${accountNumber.substr(
          accountNumber.length - NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
        )}`}
      </span>
    )
  );
};

interface DirectDebitDisplayProps extends DirectDebitDetails, Inlineable {
  showAccountName?: true;
  inErrorState?: boolean;
  onlyAccountEnding?: true;
}

export const DirectDebitDisplay = (props: DirectDebitDisplayProps) =>
  props.onlyAccountEnding ? (
    <div
      css={css`
        display: flex;
      `}
    >
      <DirectDebitLogo
        fill={neutral[7]}
        additionalCss={css`
          margin: 0 10px 0 0;
        `}
      />
      <span
        css={css`
          margin-right: 10px;
        `}
      >
        {sanitiseAccountNumber(props.accountNumber, true)}
      </span>
    </div>
  ) : (
    <>
      <DirectDebitLogo
        fill={neutral[7]}
        additionalCss={css`
          margin: 0 10px 0 0;
        `}
      />
      <div>
        <span
          css={css`
            margin-right: 10px;
          `}
        >
          {dashifySortCode(props.sortCode)}
        </span>
        <span
          css={css`
            display: block;
          `}
        >
          {sanitiseAccountNumber(props.accountNumber)}
        </span>
        {props.showAccountName && props.accountName ? (
          <span>{props.accountName}</span>
        ) : (
          undefined
        )}
      </div>
    </>
  );
