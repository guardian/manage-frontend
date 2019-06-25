import React from "react";
import { Button } from "../buttons";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import { SelectedHolidayRangeContext } from "./holidayDateChooser";
import { isDateRange } from "./holidayReview";

export const HolidayConfirmed = (props: RouteableStepProps) => (
  <SelectedHolidayRangeContext.Consumer>
    {selectedRange =>
      isDateRange(selectedRange) ? (
        <WizardStep routeableStepProps={props}>
          <div>
            <h1>Suspension Confirmed</h1>
            {selectedRange.start.toString()} {selectedRange.end.toString()}
            <Button text="Some forward CTA" right primary />
          </div>
        </WizardStep>
      ) : (
        visuallyNavigateToParent(props)
      )
    }
  </SelectedHolidayRangeContext.Consumer>
);
