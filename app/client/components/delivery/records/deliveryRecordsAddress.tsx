import { css } from "@emotion/core";
import React, { useState } from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";

export const RecordAddress = (props: DeliveryAddress) => {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <div>
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
          font-style: italic;
          font-weight: 500;
          font-size: 15px;
          color: #767676;
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
