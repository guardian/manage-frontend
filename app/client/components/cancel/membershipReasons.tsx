import { Link, Router } from "@reach/router";
import React from "react";
import AsyncLoader from "../asyncLoader";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";

interface MembershipExistsResponse {
  contentAccess: {
    member: true;
  };
}

class MembershipExistsCheckAsyncLoader extends AsyncLoader<
  MembershipExistsResponse
> {}

const checkIfMember: () => Promise<MembershipExistsResponse> = async () => {
  return (await fetch("/api/me", { credentials: "include" })).json();
};

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MembershipExistsResponse
) =>
  data.contentAccess.member ? (
    <React.Fragment>
      <span>Please tell us your reason...</span>
      <ul>
        {routeableProps.children.props.children.map(
          (child: { props: RouteableProps }) => (
            <li key={child.props.path}>
              <Link to={child.props.path}>
                {child.props.linkLabel
                  ? child.props.linkLabel
                  : child.props.path}
              </Link>
            </li>
          )
        )}
      </ul>
    </React.Fragment>
  ) : (
    noMembershipRenderer()
  );

const noMembershipRenderer = () => <h2>No Membership</h2>;

export const MembershipReasons = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <MembershipExistsCheckAsyncLoader
      fetch={checkIfMember}
      render={getReasonsRenderer(props)}
      errorRender={noMembershipRenderer}
    />
  </WizardStep>
);
