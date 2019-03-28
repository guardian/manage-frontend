import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { ProductType } from "../../shared/productTypes";
import { NoProduct } from "./noProduct";

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) =>
  props.validator(me) ? (
    <>{props.children}</>
  ) : (
    <NoProduct
      inTab={false}
      supportRefererSuffix={props.supportRefererSuffix}
      productType={props}
    />
  );

export type MeValidator = (me: MeResponse) => boolean;

export interface CheckFlowIsValidProps extends ProductType {
  children: any;
  supportRefererSuffix: string;
}

export const CheckFlowIsValid = (props: CheckFlowIsValidProps) => (
  <MeAsyncLoader
    fetch={fetchMe}
    render={renderChildrenIfValidated(props)}
    loadingMessage={"Confirming you have a " + props.friendlyName + "..."}
  />
);
