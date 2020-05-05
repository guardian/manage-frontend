import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import {
  DeliveryAddress,
  ProductDetail
} from "../../../../shared/productResponse";
import { ProductUrlPart } from "../../../../shared/productTypes";
import { LinkButton } from "../../buttons";
import { COUNTRIES } from "../../identity/models";

interface DeliveryAddressDisplayProps extends DeliveryAddress {
  allProductDetails?: ProductDetail[];
  productDetail?: ProductDetail;
  withEditButton?: true;
  productUrlPart?: ProductUrlPart;
}

export interface DeliveryAddressState {
  allProductDetails: ProductDetail[];
  productDetail: ProductDetail;
}

export const DeliveryAddressDisplay = (props: DeliveryAddressDisplayProps) => {
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
      {props.withEditButton && (
        <LinkButton
          text={"Update delivery details"}
          to={`/delivery/${props.productUrlPart}/address`}
          state={props.productDetail}
          right
        />
      )}
    </div>
  );
};
