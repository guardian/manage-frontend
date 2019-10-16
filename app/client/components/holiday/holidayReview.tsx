import { Link, navigate, NavigateFn } from "@reach/router";
import { DateRange } from "moment-range";
import React from "react";
import {
  hasProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { maxWidth } from "../../styles/breakpoints";
import { Button } from "../buttons";
import { CallCentreNumbers } from "../callCentreNumbers";
import { GenericErrorScreen } from "../genericErrorScreen";
import { visuallyNavigateToParent, WizardStep } from "../wizardRouterAdapter";
import {
  buttonBarCss,
  cancelLinkCss,
  HolidayDateChooserStateContext,
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import {
  creditExplainerSentence,
  HolidayQuestionsModal
} from "./holidayQuestionsModal";
import { HolidayStopsRouteableStepProps } from "./holidaysOverview";
import {
  convertRawPotentialHolidayStopDetail,
  CreateHolidayStopsAsyncLoader,
  CreateHolidayStopsResponse,
  createPotentialHolidayStopsFetcher,
  DATE_INPUT_FORMAT,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  PotentialHolidayStopsAsyncLoader,
  PotentialHolidayStopsResponse,
  ReloadableGetHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

const getPerformCreation = (
  selectedRange: DateRange,
  subscriptionName: string,
  isTestUser: boolean
) => () =>
  fetch(`/api/holidays`, {
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

export class HolidayReview extends React.Component<
  HolidayStopsRouteableStepProps,
  HolidayReviewState
> {
  public state: HolidayReviewState = {
    isCreating: false
  };
  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiResponseContext.Consumer>
            {productDetail => (
              <HolidayDateChooserStateContext.Consumer>
                {dateChooserState =>
                  isSharedHolidayDateChooserState(dateChooserState) &&
                  hasProduct(productDetail) ? (
                    <PotentialHolidayStopsAsyncLoader
                      fetch={createPotentialHolidayStopsFetcher(
                        true,
                        productDetail.subscription.subscriptionId,
                        dateChooserState.selectedRange.start,
                        dateChooserState.selectedRange.end,
                        productDetail.isTestUser
                      )}
                      render={this.buildActualRenderer(
                        holidayStopsResponse,
                        productDetail,
                        dateChooserState
                      )}
                      loadingMessage="Calculating expected credit..."
                    />
                  ) : (
                    visuallyNavigateToParent(this.props)
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

  private buildActualRenderer = (
    holidayStopsResponse: ReloadableGetHolidayStopsResponse,
    productDetail: ProductDetail,
    dateChooserState: SharedHolidayDateChooserState
  ) => (
    potentialHolidayStopsResponseWithCredits: PotentialHolidayStopsResponse
  ) => {
    const dateChooserStateWithCredits: SharedHolidayDateChooserState = {
      ...dateChooserState,
      publicationsImpacted: potentialHolidayStopsResponseWithCredits.potentials.map(
        convertRawPotentialHolidayStopDetail
      )
    };

    return this.props.navigate ? (
      <HolidayDateChooserStateContext.Provider
        value={dateChooserStateWithCredits}
      >
        <WizardStep routeableStepProps={this.props} hideBackButton>
          <div>
            <h1>Review details before confirming</h1>
            <p>
              Check the details carefully and amend them if necessary.{" "}
              {creditExplainerSentence(
                this.props.productType.holidayStops.issueKeyword
              )}{" "}
              {this.props.productType.holidayStops.additionalHowAdvice}
            </p>
            <HolidayQuestionsModal
              annualIssueLimit={holidayStopsResponse.annualIssueLimit}
              holidayStopFlowProperties={this.props.productType.holidayStops}
            />
            <div css={{ height: "25px" }} />
            <SummaryTable
              data={dateChooserStateWithCredits}
              alternateSuspendedColumnHeading="To be suspended"
              subscription={productDetail.subscription}
            />
          </div>
          {this.state.isCreating ? (
            <div css={{ marginTop: "40px", textAlign: "right" }}>
              <CreateHolidayStopsAsyncLoader
                fetch={getPerformCreation(
                  dateChooserState.selectedRange,
                  productDetail.subscription.subscriptionId,
                  productDetail.isTestUser
                )}
                render={getRenderCreationSuccess(this.props.navigate)}
                errorRender={renderCreationError}
                loadingMessage="Creating your suspension..."
                spinnerScale={0.7}
                inline
              />
            </div>
          ) : (
            <div
              css={{
                ...buttonBarCss,
                justifyContent: "space-between",
                marginTop: "20px",
                [maxWidth.mobileMedium]: {
                  flexDirection: "column",
                  marginTop: 0
                }
              }}
            >
              <div
                css={{
                  marginTop: "20px",
                  alignSelf: "flex-start"
                }}
              >
                <Button
                  text="Amend"
                  onClick={() => (this.props.navigate || navigate)("..")}
                  left
                  hollow
                />
              </div>
              <div
                css={{
                  ...buttonBarCss,
                  marginTop: "20px",
                  alignSelf: "flex-end"
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
            </div>
          )}
        </WizardStep>
      </HolidayDateChooserStateContext.Provider>
    ) : (
      visuallyNavigateToParent(this.props)
    );
  };
}
