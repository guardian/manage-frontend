import React from "react";
import { LinkButton } from "../buttons";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import {
  rightAlignedButtonsCss,
  SelectedHolidayRangeContext
} from "./holidayDateChooser";
import { isDateRange, SummaryTable } from "./holidayReview";
import { holidayQuestionsTopicString } from "./holidaysOverview";

export const HolidayConfirmed = (props: RouteableStepProps) => (
  <SelectedHolidayRangeContext.Consumer>
    {selectedRange =>
      isDateRange(selectedRange) ? (
        <WizardStep
          routeableStepProps={props}
          extraFooterComponents={
            <QuestionsFooter topic={holidayQuestionsTopicString} />
          }
          hideBackButton
        >
          <div>
            <h1>Your schedule has been set</h1>
            <p>
              We will send you an email to confirm the details. You will be
              credited for the missing issues on your future bill(s).
            </p>
            <SummaryTable
              selectedRange={selectedRange}
              issueDetails="details here"
            />
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
  </SelectedHolidayRangeContext.Consumer>
);
