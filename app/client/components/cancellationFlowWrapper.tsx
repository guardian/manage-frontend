import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { ProductType } from "../../shared/productTypes";
import { GenericErrorScreen } from "./genericErrorScreen";

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) =>
  props.validator(me) ? (
    <>{props.children}</>
  ) : (
    <GenericErrorScreen loggingMessage="Direct navigation in cancellation flow without having the corresponding product" />
  );

export type MeValidator = (me: MeResponse) => boolean;

export interface CheckFlowIsValidProps extends ProductType {
  children: any;
}

export const CheckFlowIsValid = (props: CheckFlowIsValidProps) => (
  <MeAsyncLoader
    fetch={fetchMe}
    render={renderChildrenIfValidated(props)}
    loadingMessage={"Confirming you have a " + props.productName + "..."}
  />
);
