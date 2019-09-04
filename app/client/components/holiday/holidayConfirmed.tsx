import React from "react";
import { LinkButton } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
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
import { creditExplainerSentence } from "./holidayQuestionsModal";
import {
  HolidayStopsResponseContext,
  isHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

export const HolidayConfirmed = (props: RouteableStepProps) => (
  <HolidayStopsResponseContext.Consumer>
    {holidayStopsResponse =>
      isHolidayStopsResponse(holidayStopsResponse) ? (
        <HolidayDateChooserStateContext.Consumer>
          {dateChooserState =>
            isSharedHolidayDateChooserState(dateChooserState) ? (
              <WizardStep routeableStepProps={props} hideBackButton>
                <div>
                  <h1>Your schedule has been set</h1>
                  <p>{creditExplainerSentence}</p>
                  <SummaryTable data={dateChooserState} />
                  <div
                    css={{
                      marginTop: "20px",
                      ...rightAlignedButtonsCss
                    }}
                  >
                    <LinkButton
                      to={"/suspend/" + props.productType.urlPart + "/create"}
                      onClick={holidayStopsResponse.reload}
                      text="Schedule another suspension"
                      right
                    />
                    <div css={{ width: "24px" }} />
                    <LinkButton
                      to={"/" + props.productType.urlPart}
                      text="Manage your subscriptions"
                      primary
                      right
                    />
                  </div>
                </div>
              </WizardStep>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </HolidayDateChooserStateContext.Consumer>
      ) : (
        <GenericErrorScreen loggingMessage="No holiday stop response" />
      )
    }
  </HolidayStopsResponseContext.Consumer>
);
