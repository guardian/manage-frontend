import { Link } from "@reach/router";
import React from "react";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";

export const SaveOfReasonA = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <h1>Save of Reason A</h1>
  </WizardStep>
);
