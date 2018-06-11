import { Link, Router } from "@reach/router";
import React from "react";
import AsyncLoader from "../asyncLoader";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse
} from "../membership";
import {
  CancellationTypeContext,
  CancellationUrlSuffixContext,
  fetchMe,
  HasSubscriptionGetterContext,
  MeResponse
} from "../user";
import { RouteableProps, WizardStep } from "../wizardRouterAdapter";
import { CancellationSummary } from "./cancellationSummary";

const childWithRouteablePropsToElement = (child: { props: RouteableProps }) => (
  <li key={child.props.path}>
    <Link to={child.props.path}>
      {child.props.linkLabel || child.props.path}
    </Link>
  </li>
);

export type MeOrMembershipData = MeResponse | MembersDataApiResponse;

class MembershipCheckerWithMeJumpout extends AsyncLoader<MeOrMembershipData> {}

const fetchMembershipWithMeJumpout: () => Promise<
  MembersDataApiResponse
> = async () => {
  const membershipPromise = loadMembershipData();

  const firstToComeBack = await Promise.race([fetchMe(), membershipPromise]);

  if (
    firstToComeBack.hasOwnProperty("contentAccess") &&
    !(firstToComeBack as MeResponse).contentAccess.member
  ) {
    return {};
  }

  return membershipPromise;
};

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MembersDataApiResponse
) => {
  if (hasMembership(data)) {
    if (data.subscription.cancelledAt) {
      return CancellationSummary(data.subscription);
    }

    return (
      <CancellationUrlSuffixContext.Provider
        value={data.isPaidTier ? "/paid" : "/free"}
      >
        <HasSubscriptionGetterContext.Provider value={loadMembershipData}>
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
        </HasSubscriptionGetterContext.Provider>
      </CancellationUrlSuffixContext.Provider>
    );
  }

  return <h2>No Membership</h2>;
};

export const MembershipFlow = (props: RouteableProps) => (
  <CancellationTypeContext.Provider value="membership">
    <MembershipCheckerWithMeJumpout
      fetch={fetchMembershipWithMeJumpout}
      render={getReasonsRenderer(props)}
      errorRender={() => (
        <h2>
          Could not fetch membership details. Please call the call centre...{" "}
          {/* TODO add the call centre number*/}
        </h2>
      )}
    />
  </CancellationTypeContext.Provider>
);
