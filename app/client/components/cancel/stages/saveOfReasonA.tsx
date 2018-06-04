import { Link } from "@reach/router";
import * as React from "react";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";

export const SaveOfReasonA = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <h1>Save of Reason A</h1>
  </WizardStep>
);
