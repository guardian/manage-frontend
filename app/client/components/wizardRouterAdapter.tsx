import { Router } from "@reach/router";
import React from "react";

interface RootComponentProps {
  realChildren: any;
  path: string;
}

const RootComponent = (props: RootComponentProps) => (
  <React.Fragment children={props.realChildren} />
);

const ThisStageContent = (props: any) => (
  <Router>
    <RootComponent path="/" realChildren={props.children} />
  </Router>
);

export interface WizardStepProps {
  subsequentSteps: any;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <React.Fragment>
    <ThisStageContent>{props.children}</ThisStageContent>
    {props.subsequentSteps}
  </React.Fragment>
);
