import { Link } from "@reach/router";
import React from "react";
import {
  hasProductPageProperties,
  ProductType,
  WithProductType
} from "../../shared/productTypes";
import { navLinks } from "./nav";
import { PageContainer } from "./page";
import { ResubscribeThrasher } from "./resubscribeThrasher";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";

export interface NoProductProps extends WithProductType<ProductType> {
  inTab: boolean;
  supportRefererSuffix: string;
}

export const NoProduct = (props: NoProductProps) => (
  <div>
    <PageContainer>
      <h2>You do not currently have a {props.productType.friendlyName}.</h2>
      {props.inTab &&
        hasProductPageProperties(props.productType) && (
          <p>{props.productType.productPage.noProductInTabCopy}</p>
        )}
    </PageContainer>
    <ResubscribeThrasher
      usageContext={`${props.productType.urlPart}_${
        props.supportRefererSuffix
      }`}
    >
      <PageContainer>
        <p>
          {
            "Alternatively, please consider supporting our journalism via a new "
          }
          {<Link to={navLinks.contributions.link}>contribution</Link>}
          {" or "}
          {<Link to={navLinks.subscriptions.link}>subscription</Link>}.
        </p>
        <SupportTheGuardianButton
          supportReferer={`${props.productType.urlPart}_${
            props.supportRefererSuffix
          }`}
          urlSuffix={props.productType.noProductSupportUrlSuffix}
        />
      </PageContainer>
    </ResubscribeThrasher>
  </div>
);
