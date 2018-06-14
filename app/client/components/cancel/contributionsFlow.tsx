import React from "react";
import { CheckFlowIsValid, MeResponse } from "../cancellationFlowWrapper";
import { RouteableProps } from "../wizardRouterAdapter";

export const ContributionsFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    validator={(me: MeResponse) => me.contentAccess.recurringContributor}
    checkingFor="regular contribution"
  >
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
