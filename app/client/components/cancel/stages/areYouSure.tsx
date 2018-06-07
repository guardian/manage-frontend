import { Link } from "@reach/router";
import React from "react";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";

export const AreYouSure = (props: RouteableProps) => (
  <WizardStep routeableProps={props}>
    <h2>are you sure?</h2>
  </WizardStep>
);
