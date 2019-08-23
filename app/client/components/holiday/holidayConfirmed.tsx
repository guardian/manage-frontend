import React from "react";
import { LinkButton } from "../buttons";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import {
  HolidayDateChooserStateContext,
  isSharedHolidayDateChooserState,
  rightAlignedButtonsCss
} from "./holidayDateChooser";
import { SummaryTable } from "./summaryTable";

export const HolidayConfirmed = (props: RouteableStepProps) => (
  <HolidayDateChooserStateContext.Consumer>
    {dateChooserState =>
      isSharedHolidayDateChooserState(dateChooserState) ? (
        <WizardStep routeableStepProps={props} hideBackButton>
          <div>
            <h1>Your schedule has been set</h1>
            <p>
              We will send you an email to confirm the details. You will be
              credited for the missing issues on your future bill(s).
            </p>
            <SummaryTable data={dateChooserState} />
            <div
              css={{
                marginTop: "20px",
                ...rightAlignedButtonsCss
              }}
            >
              <LinkButton
                to={"/suspend/" + props.productType.urlPart}
                text="Schedule another suspension"
                maxWidthIfWrapping="230px"
                right
              />
              <div css={{ width: "24px" }} />
              <LinkButton
                to={"/" + props.productType.urlPart}
                text="Finish"
                maxWidthIfWrapping="230px"
                primary
                right
              />{" "}
            </div>{" "}
          </div>
        </WizardStep>
      ) : (
        visuallyNavigateToParent(props)
      )
    }
  </HolidayDateChooserStateContext.Consumer>
);
