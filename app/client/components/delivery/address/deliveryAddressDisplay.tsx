import React from "react";
import {
  DeliveryAddress,
  ProductDetail
} from "../../../../shared/productResponse";
import { ProductUrlPart } from "../../../../shared/productTypes";
import { LinkButton } from "../../buttons";

interface DeliveryAddressDisplayProps extends DeliveryAddress {
  withEditButton: boolean;
  allProductDetails?: ProductDetail[];
  productUrlPart?: ProductUrlPart;
}

export const DeliveryAddressDisplay = (props: DeliveryAddressDisplayProps) => (
  <div
    css={{
      "& span": {
        display: "block",
        ":last-of-type": {
          marginBottom: "1rem"
        }
      }
    }}
  >
    <span>{props.addressLine1}</span>
    {props.addressLine2 && <span>{props.addressLine2}</span>}
    {props.town && <span>{props.town}</span>}
    {props.region && <span>{props.region}</span>}
    <span>{props.postcode}</span>
    <span>{props.country}</span>
    {props.withEditButton && (
      <LinkButton
        text={"Edit address"}
        to={`/delivery/${props.productUrlPart}/address`}
        state={props.allProductDetails}
        right
      />
    )}
  </div>
);
