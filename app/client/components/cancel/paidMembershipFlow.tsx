import { Link, Router } from "@reach/router";
import React from "react";
import { CheckFlowIsValid, MeResponse } from "../cancellationFlowWrapper";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse,
  MembershipAsyncLoader
} from "../membership";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";
import { CancellationSummary } from "./cancellationSummary";

const childWithRouteablePropsToElement = (child: { props: RouteableProps }) => (
  <li key={child.props.path}>
    <Link to={child.props.path}>
      {child.props.linkLabel || child.props.path}
    </Link>
  </li>
);

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MembersDataApiResponse
) => {
  if (hasMembership(data)) {
    if (data.subscription.cancelledAt) {
      return CancellationSummary("membership")(data.subscription);
    }

    return (
      <WizardStep routeableProps={routeableProps}>
        <h3>
          Sorry to hear you are thinking of cancelling your membership.<br />Can
          you take a moment to tell us why?
        </h3>
        <ul>
          {routeableProps.children.props.children.map(
            childWithRouteablePropsToElement
          )}
        </ul>
      </WizardStep>
    );
  }

  return <h2>No Membership</h2>;
};

export const PaidMembershipFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    checkingFor="membership"
    validator={(me: MeResponse) => me.contentAccess.paidMember}
  >
    <MembershipAsyncLoader
      fetch={loadMembershipData}
      render={getReasonsRenderer(props)}
      loadingMessage="Checking the status of your current membership..."
      errorRender={() => (
        <h2>
          Could not fetch membership details. Please call the call centre...{" "}
          {/* TODO add the call centre number*/}
        </h2>
      )}
    />
  </CheckFlowIsValid>
);
