import React from "react";
import {
  isProduct,
  MembersDataApiItemContext
} from "../../../shared/productResponse";
import { LinkButton } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
import { visuallyNavigateToParent, WizardStep } from "../wizardRouterAdapter";
import {
  buttonBarCss,
  HolidayDateChooserStateContext,
  isSharedHolidayDateChooserState
} from "./holidayDateChooser";
import { creditExplainerSentence } from "./holidayQuestionsModal";
import { HolidayStopsRouteableStepProps } from "./holidaysOverview";
import {
  HolidayStopsResponseContext,
  isHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

export const HolidayConfirmed = (props: HolidayStopsRouteableStepProps) => (
  <HolidayStopsResponseContext.Consumer>
    {holidayStopsResponse =>
      isHolidayStopsResponse(holidayStopsResponse) ? (
        <MembersDataApiItemContext.Consumer>
          {productDetail => (
            <HolidayDateChooserStateContext.Consumer>
              {dateChooserState =>
                isSharedHolidayDateChooserState(dateChooserState) &&
                isProduct(productDetail) ? (
                  <WizardStep routeableStepProps={props} hideBackButton>
                    <div>
                      <h1>Your schedule has been set</h1>
                      <p>
                        We will send an email to confirm the details.{" "}
                        {creditExplainerSentence(
                          props.productType.holidayStops.issueKeyword
                        )}{" "}
                        {props.productType.holidayStops.additionalHowAdvice}
                      </p>
                      <SummaryTable
                        data={dateChooserState}
                        isTestUser={productDetail.isTestUser}
                        subscription={productDetail.subscription}
                        issueKeyword={
                          props.productType.holidayStops.issueKeyword
                        }
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
        </MembersDataApiItemContext.Consumer>
      ) : (
        <GenericErrorScreen loggingMessage="No holiday stop response" />
      )
    }
  </HolidayStopsResponseContext.Consumer>
);
