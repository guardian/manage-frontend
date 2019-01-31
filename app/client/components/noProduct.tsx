import React from "react";
import {
  hasProductPageProperties,
  ProductType,
  WithProductType
} from "../../shared/productTypes";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";

export interface NoProductProps extends WithProductType<ProductType> {
  inTab: boolean;
  supportRefererSuffix: string;
}

export const NoProduct = (props: NoProductProps) => (
  <div>
    <h2>You do not currently have a {props.productType.friendlyName}.</h2>
    {props.inTab && hasProductPageProperties(props.productType) ? (
      <p>{props.productType.productPage.noProductInTabCopy}</p>
    ) : (
      undefined
    )}
    <p>
      Please support our journalism by making either a contribution or a
      subscription.
    </p>
    <SupportTheGuardianButton
      supportReferer={`${props.productType.urlPart}_${
        props.supportRefererSuffix
      }`}
      urlSuffix={props.productType.noProductSupportUrlSuffix}
    />
  </div>
);
