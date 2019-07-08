import { Link, navigate, NavigateFn } from "@reach/router";
import { DateRange } from "moment-range";
import React from "react";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext
} from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { Button } from "../buttons";
import { CallCentreNumbers } from "../callCentreNumbers";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../wizardRouterAdapter";
import {
  cancelLinkCss,
  HolidayDateChooserStateContext,
  isHolidayDateChooserState,
  rightAlignedButtonsCss
} from "./holidayDateChooser";
import {
  formatDateRangeAsFriendly,
  holidayQuestionsTopicString,
  summaryTableCss
} from "./holidaysOverview";
import {
  CreateHolidayStopsAsyncLoader,
  CreateHolidayStopsResponse,
  DATE_INPUT_FORMAT
} from "./holidayStopApi";

const getPerformCreation = (
  selectedRange: DateRange,
  subscriptionName: string,
  isTestUser: boolean,
  productType: ProductType
) => () =>
  fetch(`/api/holidays/${productType.urlPart}`, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      start: selectedRange.start.format(DATE_INPUT_FORMAT),
      end: selectedRange.end.format(DATE_INPUT_FORMAT),
      subscriptionName
    }),
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

const getRenderCreationSuccess = (nav: NavigateFn) => (
  response: CreateHolidayStopsResponse
) => {
  nav("confirmed", { replace: true });
  return null;
};

const renderCreationError = () => (
  <div css={{ textAlign: "left", marginTop: "10px" }}>
    <h2>Sorry, the holiday suspension creation failed.</h2>
    <p>
      To try again please go back and re-enter your dates. Alternatively, please
      call to speak to one of our customer service specialists.
    </p>
    <CallCentreNumbers prefixText="To contact us" />
  </div>
);
export interface HolidayReviewState {
  isCreating: boolean;
}

const MAX_WIDTH = "606px";

export interface SummaryTableProps {
  selectedRange: DateRange;
  issueDetails: any;
}

export const SummaryTable = (props: SummaryTableProps) => (
  <table css={{ ...summaryTableCss, maxWidth: MAX_WIDTH }}>
    <tbody>
      <tr>
        <th>When</th>
        <th>Suspended</th>
      </tr>
      <tr>
        <td>{formatDateRangeAsFriendly(props.selectedRange)}</td>
        <td>{props.issueDetails}</td>
      </tr>
    </tbody>
  </table>
);

export class HolidayReview extends React.Component<
  RouteableStepProps,
  HolidayReviewState
> {
  public state: HolidayReviewState = {
    isCreating: false
  };
  public render = () => (
    <MembersDataApiResponseContext.Consumer>
      {productDetail => (
        <HolidayDateChooserStateContext.Consumer>
          {dateChooserState =>
            isHolidayDateChooserState(dateChooserState) &&
            dateChooserState.selectedRange &&
            hasProduct(productDetail) &&
            this.props.navigate ? (
              <WizardStep
                routeableStepProps={this.props}
                hideBackButton
                extraFooterComponents={
                  <QuestionsFooter topic={holidayQuestionsTopicString} />
                }
              >
                <div css={{ maxWidth: MAX_WIDTH }}>
                  <h1>Review details before confirming</h1>
                  <p>
                    You will be credited for the suspended issues on your future
                    bill(s). Check the details carefully and amend them if
                    necessary.{" "}
                  </p>{" "}
                  <SummaryTable
                    selectedRange={dateChooserState.selectedRange}
                    issueDetails="details here"
                  />
                  <div
                    css={{
                      marginTop: "20px",
                      textAlign: "right"
                    }}
                  >
                    <Button
                      text="Amend"
                      onClick={() => (this.props.navigate || navigate)("..")}
                      left
                      hollow
                    />
                  </div>
                </div>
                <div>
                  {this.state.isCreating ? (
                    <CreateHolidayStopsAsyncLoader
                      fetch={getPerformCreation(
                        dateChooserState.selectedRange,
                        productDetail.subscription.subscriptionId,
                        productDetail.isTestUser,
                        this.props.productType
                      )}
                      render={getRenderCreationSuccess(this.props.navigate)}
                      errorRender={renderCreationError}
                      loadingMessage="Creating your suspension"
                      spinnerScale={0.7}
                      inline
                    />
                  ) : (
                    <div
                      css={{
                        marginTop: "40px",
                        ...rightAlignedButtonsCss
                      }}
                    >
                      <Link css={cancelLinkCss} to="../.." replace={true}>
                        Cancel
                      </Link>
                      <Button
                        text="Confirm"
                        onClick={() => this.setState({ isCreating: true })}
                        right
                        primary
                      />
                    </div>
                  )}
                </div>
              </WizardStep>
            ) : (
              visuallyNavigateToParent(this.props)
            )
          }
        </HolidayDateChooserStateContext.Consumer>
      )}
    </MembersDataApiResponseContext.Consumer>
  );
}
