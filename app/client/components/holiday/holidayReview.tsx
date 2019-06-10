import React from "react";
import { Button } from "../buttons";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";

export const HolidayReview = (props: RouteableStepProps) => (
  <WizardStep routeableStepProps={props}>
    <div>
      <h1>New Suspension Review</h1>
      <Button text="Confirm" right primary />
    </div>
  </WizardStep>
);
