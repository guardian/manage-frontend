import React from "react";
import { Button } from "../buttons";
import { RouteableStepProps, WizardStep } from "../wizardRouterAdapter";

export const HolidayConfirmed = (props: RouteableStepProps) => (
  <WizardStep routeableStepProps={props}>
    <div>
      <h1>Suspension Confirmed</h1>
      <Button text="Some forward CTA" right primary />
    </div>
  </WizardStep>
);
