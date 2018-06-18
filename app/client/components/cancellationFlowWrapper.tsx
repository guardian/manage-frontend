import React from "react";
import AsyncLoader from "./asyncLoader";

export interface MeResponse {
  userId: string;
  tier: string;
  membershipJoinDate: string;
  contentAccess: {
    member: boolean;
    paidMember: boolean;
    recurringContributor: boolean;
    digitalPack: boolean;
  };
}

const fetchMe: () => Promise<MeResponse> = async () => {
  return (await fetch("/api/me", { credentials: "include" })).json();
};

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) =>
  props.validator(me) ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <h1>No {props.checkingFor}</h1>
  );

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
