import { Link, Router } from "@reach/router";
import React from "react";
import { fetchMe, MeCheckerAsyncLoader, MeResponse } from "../user";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";

const childWithRouteablePropsToElement = (child: { props: RouteableProps }) => (
  <li key={child.props.path}>
    <Link to={child.props.path}>
      {child.props.linkLabel ? child.props.linkLabel : child.props.path}
    </Link>
  </li>
);

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MeResponse
) =>
  data.contentAccess.member ? (
    <WizardStep routeableProps={routeableProps}>
      <span>Please tell us your reason...</span>
      <ul>
        {routeableProps.children.props.children.map(
          childWithRouteablePropsToElement
        )}
      </ul>
    </WizardStep>
  ) : (
    <h2>No Membership</h2>
  );

export const MembershipFlow = (props: RouteableProps) => (
  <MeCheckerAsyncLoader
    fetch={fetchMe}
    render={getReasonsRenderer(props)}
    errorRender={() => (
      <h2>
        Could not fetch Membership details. Please call the call centre...{" "}
        {/* TODO add the call centre number*/}
      </h2>
    )}
  />
);
