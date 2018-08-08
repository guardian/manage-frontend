import React from "react";
import { fetchMe, MeAsyncLoader, MeResponse } from "../../shared/meResponse";
import { GenericErrorScreen } from "./genericErrorScreen";

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) => (props.validator(me) ? <>{props.children}</> : <GenericErrorScreen />);

export interface CheckFlowIsValidProps {
  children: any;
  validator: (me: MeResponse) => boolean;
  checkingFor: string;
}

export const CheckFlowIsValid = (props: CheckFlowIsValidProps) => (
  <MeAsyncLoader
    fetch={fetchMe}
    render={renderChildrenIfValidated(props)}
    loadingMessage={"Confirming you have a " + props.checkingFor + "..."}
  />
);
