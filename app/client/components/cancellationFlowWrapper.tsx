import React from "react";
import { MeResponse } from "../../shared/meResponse";
import AsyncLoader from "./asyncLoader";
import { GenericErrorScreen } from "./genericErrorScreen";

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) =>
  props.validator(me) ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <GenericErrorScreen />
  );

const fetchMe: () => Promise<MeResponse> = async () => {
  return (await fetch("/api/me", { credentials: "include" })).json();
};

class MeAsyncLoader extends AsyncLoader<MeResponse> {}

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
