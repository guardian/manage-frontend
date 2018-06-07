import { Link, Router } from "@reach/router";
import React from "react";
import {
  CancellationTypeContext,
  CancellationUrlSuffixContext,
  fetchMe,
  MeCheckerAsyncLoader,
  MeResponse
} from "../user";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";

const childWithRouteablePropsToElement = (child: { props: RouteableProps }) => (
  <li key={child.props.path}>
    <Link to={child.props.path}>
      {child.props.linkLabel || child.props.path}
    </Link>
  </li>
);

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MeResponse
) =>
  data.contentAccess.member ? (
    <CancellationUrlSuffixContext.Provider
      value={data.contentAccess.paidMember ? "/paid" : "/free"}
    >
      <CancellationTypeContext.Provider value="membership">
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
      </CancellationTypeContext.Provider>
    </CancellationUrlSuffixContext.Provider>
  ) : (
    <h2>No Membership</h2>
  );

export const MembershipFlow = (props: RouteableProps) => (
  <MeCheckerAsyncLoader
    fetch={fetchMe}
    render={getReasonsRenderer(props)}
    errorRender={() => (
      <h2>
        Could not fetch membership details. Please call the call centre...{" "}
        {/* TODO add the call centre number*/}
      </h2>
    )}
  />
);
