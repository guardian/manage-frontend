import * as React from "react";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";

export const Confirmed = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <h1>cancel confirmed</h1>
  </WizardStep>
);
