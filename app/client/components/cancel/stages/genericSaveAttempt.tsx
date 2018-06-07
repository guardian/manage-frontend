import { Link } from "@reach/router";
import React from "react";
import { CancellationReasonContext } from "../../user";
import { RouteableProps, WizardStep } from "../../wizardRouterAdapter";

export const GenericSaveAttempt = (props: RouteableProps) => (
  <CancellationReasonContext.Provider value={props.path}>
    <WizardStep routeableProps={props}>
      <h2>{props.linkLabel || props.path}</h2>
    </WizardStep>
  </CancellationReasonContext.Provider>
);
