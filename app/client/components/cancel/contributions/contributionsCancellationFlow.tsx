import React from "react";
import { MeResponse } from "../../../../shared/meResponse";
import { CheckFlowIsValid } from "../../cancellationFlowWrapper";
import { RouteableProps } from "../../wizardRouterAdapter";

export const ContributionsCancellationFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    validator={(me: MeResponse) => me.contentAccess.recurringContributor}
    checkingFor="regular contribution"
  >
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
