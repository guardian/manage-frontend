import React from "react";
import { DirectDebitDetails } from "../../../shared/productResponse";
import palette from "../../colours";
import { DirectDebitLogo } from "./directDebitLogo";

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const DirectDebitDisplay = (mandate: DirectDebitDetails) => (
  <div
    css={{
      display: "flex",
      alignItems: "center"
    }}
  >
    <DirectDebitLogo fill={palette.neutral["1"]} />
    <span
      css={{
        marginLeft: "10px"
      }}
    >
      {mandate.accountNumber &&
      mandate.sortCode.length > NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
        ? "•".repeat(
            mandate.accountNumber.length -
              NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
          ) +
          mandate.accountNumber.substr(
            mandate.accountNumber.length -
              NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
          )
        : undefined}
    </span>
    {mandate.sortCode && mandate.sortCode.length === 6 ? (
      <span
        css={{
          marginLeft: "9px"
        }}
      >
        {mandate.sortCode.substr(0, 2)}-{mandate.sortCode.substr(2, 2)}-{mandate.sortCode.substr(
          4,
          2
        )}
      </span>
    ) : (
      undefined
    )}
  </div>
);
