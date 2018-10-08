import React from "react";
import { ProductTypes } from "../../../../shared/productTypes";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import { CheckFlowIsValid } from "../cancellationFlowWrapper";

export const ContributionsCancellationFlow = (props: RouteableStepProps) => (
  <CheckFlowIsValid {...ProductTypes.contributions}>
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
