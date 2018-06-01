import { Link, Router } from "@reach/router";
import * as React from "react";
import { Routeable, WizardStep } from "../wizardRouterAdapter";

export const MembershipFlow = (props: Routeable) => (
  <WizardStep subsequentSteps={props.children}>
    <span>Please tell us your reason...</span>
    <ul>
      <li>
        <Link to="saveReasonA">Reason A</Link>
      </li>
      <li>
        <Link to="saveReasonB">Reason B</Link>
      </li>
      <li>
        <Link to="saveReasonC">Reason C</Link>
      </li>
    </ul>
  </WizardStep>
);
