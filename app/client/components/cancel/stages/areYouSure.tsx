import { Link } from "@reach/router";
import * as React from "react";
import { Routeable, WizardStep } from "../../wizardRouterAdapter";

export const AreYouSure = (props: Routeable) => (
  <WizardStep subsequentSteps={props.children}>
    <h1>are you sure?</h1>
    <Link to="confirmed">Confirm?</Link>
  </WizardStep>
);
