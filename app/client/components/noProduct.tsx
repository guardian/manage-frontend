import React from "react";
import { WithProductType } from "../../shared/productTypes";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";

export interface NoProductProps extends WithProductType {
  inTab: boolean;
  supportRefererSuffix: string;
}

export const NoProduct = (props: NoProductProps) => (
  <div>
    <h2>You do not currently have a {props.productType.friendlyName}.</h2>
    {props.inTab ? (
      <p>
        To manage your existing contribution or subscription, please select from
        the tabs above.
      </p>
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
    />
  </div>
);
