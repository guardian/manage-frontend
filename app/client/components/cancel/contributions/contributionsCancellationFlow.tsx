import React from "react";
import { CheckFlowIsValid } from "../../cancellationFlowWrapper";
import { ProductTypes } from "../../user";
import { RouteableStepProps } from "../../wizardRouterAdapter";

export const ContributionsCancellationFlow = (props: RouteableStepProps) => (
  <CheckFlowIsValid {...ProductTypes.contributions}>
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
