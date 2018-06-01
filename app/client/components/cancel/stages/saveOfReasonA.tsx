import { Link } from "@reach/router";
import * as React from "react";
import { WizardStep } from "../../wizardRouterAdapter";

export const SaveOfReasonA = (props: any) => (
  <WizardStep subsequentSteps={props.children}>
    <h1>SaveOfReasonA</h1>
    <Link to="areYouSure">Cancel Anyway</Link>
  </WizardStep>
);
