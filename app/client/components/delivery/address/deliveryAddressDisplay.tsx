import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { COUNTRIES } from "../../identity/models";

export const DeliveryAddressDisplay = (props: DeliveryAddress) => {
  return (
    <div
      css={css`
        span {
          display: block;
          & :last-of-type {
            margin-bottom: 1rem;
          }
        }
        ${textSans.medium()}
      `}
    >
      <span>{props.addressLine1}</span>
      {props.addressLine2 && <span>{props.addressLine2}</span>}
      {props.town && <span>{props.town}</span>}
      {props.region && <span>{props.region}</span>}
      <span>{props.postcode}</span>
      <span>
        {COUNTRIES.find(country => props.country === country.iso)?.name ||
          props.country}
      </span>
    </div>
  );
};
