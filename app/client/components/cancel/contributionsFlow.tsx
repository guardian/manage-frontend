import React from "react";
import { CheckFlowIsValid } from "../cancellationFlowWrapper";
import { MeResponse } from "../../../shared/meResponse";
import { RouteableProps } from "../wizardRouterAdapter";

export const ContributionsFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    validator={(me: MeResponse) => me.contentAccess.recurringContributor}
    checkingFor="regular contribution"
  >
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
