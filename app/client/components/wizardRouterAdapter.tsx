import { Router } from "@reach/router";
import React from "react";

interface RootComponentProps {
  realChildren: any;
  path: string;
}

export interface Routeable {
  path: string;
  children?: any; // TODO get types (or extend IntrinsicAttributes or something similar)
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
