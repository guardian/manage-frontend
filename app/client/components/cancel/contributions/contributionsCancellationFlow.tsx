import React from "react";
import { ProductTypes } from "../../../../shared/productTypes";
import { CheckFlowIsValid } from "../../cancellationFlowWrapper";
import { RouteableStepProps } from "../../wizardRouterAdapter";

export const ContributionsCancellationFlow = (props: RouteableStepProps) => (
  <CheckFlowIsValid {...ProductTypes.contributions}>
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
