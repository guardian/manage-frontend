import React from "react";
import {
  hasProduct,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import { LinkButton } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import {
  buttonBarCss,
  HolidayDateChooserStateContext,
  isSharedHolidayDateChooserState
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
        <MembersDataApiResponseContext.Consumer>
          {productDetail => (
            <HolidayDateChooserStateContext.Consumer>
              {dateChooserState =>
                isSharedHolidayDateChooserState(dateChooserState) &&
                hasProduct(productDetail) ? (
                  <WizardStep routeableStepProps={props} hideBackButton>
                    <div>
                      <h1>Your schedule has been set</h1>
                      <p>{creditExplainerSentence}</p>
                      <SummaryTable
                        data={dateChooserState}
                        subscription={productDetail.subscription}
                      />
                      <div
                        css={{ ...buttonBarCss, justifyContent: "flex-end" }}
                      >
                        <div css={{ marginBottom: "10px" }}>
                          <LinkButton
                            to={
                              "/suspend/" +
                              props.productType.urlPart +
                              "/create"
                            }
                            onClick={holidayStopsResponse.reload}
                            text="Schedule another suspension"
                            right
                          />
                        </div>
                        <div css={{ marginBottom: "10px", marginLeft: "20px" }}>
                          <LinkButton
                            to={"/" + props.productType.urlPart}
                            text="Manage your subscriptions"
                            primary
                            right
                          />
                        </div>
                      </div>
                    </div>
                  </WizardStep>
                ) : (
                  visuallyNavigateToParent(props)
                )
              }
            </HolidayDateChooserStateContext.Consumer>
          )}
        </MembersDataApiResponseContext.Consumer>
      ) : (
        <GenericErrorScreen loggingMessage="No holiday stop response" />
      )
    }
  </HolidayStopsResponseContext.Consumer>
);
