import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";

export const RecordAddress = (props: DeliveryAddress) => {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <div
      css={css`
        ${minWidth.tablet} {
          min-width: 20ch;
        }
      `}
    >
      <div
        css={css`
          ${minWidth.tablet} {
            display: flex;
            flex-direction: column-reverse;
          }
        `}
      >
        <span>{props.postcode}</span>
        {showAddress && (
          <ul
            css={css`
              list-style-type: none;
              padding: 0;
              margin: 0;
              text-align: left;
            `}
          >
            <li>{props.addressLine1}</li>
            {props.addressLine2 && <li>{props.addressLine2}</li>}
            {props.town && <li>{props.town}</li>}
            {props.region && <li>{props.region}</li>}
            {props.country && <li>{props.country}</li>}
          </ul>
        )}
      </div>
      <span
        css={css`
          display: block;
          text-align: left;
          ${textSans.small({ italic: true })};
          color: ${palette.brand.bright};
          cursor: pointer;
        `}
        onClick={() => {
          setShowAddress(!showAddress);
        }}
      >
        Read {showAddress ? "less" : "more"}
      </span>
    </div>
  );
};
