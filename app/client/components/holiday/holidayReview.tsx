import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { Link, navigate, NavigateFn } from "@reach/router";
import { DateRange } from "moment-range";
import React from "react";
import { DATE_INPUT_FORMAT } from "../../../shared/dates";
import {
  isProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { isInAccountOverviewTest } from "../../accountOverviewRelease";
import { maxWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { Button, LinkButton } from "../buttons";
import { CallCentreNumbers } from "../callCentreNumbers";
import { Checkbox } from "../checkbox";
import { GenericErrorScreen } from "../genericErrorScreen";
import { Modal } from "../modal";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { ProgressIndicator } from "../progressIndicator";
import { InfoIcon } from "../svgs/infoIcon";
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
  CreateOrAmendHolidayStopsAsyncLoader,
  CreateOrAmendHolidayStopsResponse,
  getPotentialHolidayStopsFetcher,
  HolidayStopRequest,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  PotentialHolidayStopsAsyncLoader,
  PotentialHolidayStopsResponse,
  ReloadableGetHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

const getPerformCreateOrAmendFetcher = (
  selectedRange: DateRange,
  subscriptionName: string,
  isTestUser: boolean,
  existingHolidayStopToAmend?: HolidayStopRequest
) => () =>
  fetch(
    `/api/holidays${
      existingHolidayStopToAmend
        ? `/${subscriptionName}/${existingHolidayStopToAmend.id}`
        : ""
    }`,
    {
      credentials: "include",
      method: existingHolidayStopToAmend ? "PATCH" : "POST",
      mode: "same-origin",
      body: JSON.stringify({
        startDate: selectedRange.start.format(DATE_INPUT_FORMAT),
        endDate: selectedRange.end.format(DATE_INPUT_FORMAT),
        subscriptionName
      }),
      headers: {
        "Content-Type": "application/json",
        [MDA_TEST_USER_HEADER]: `${isTestUser}`
      }
    }
  );

const getRenderCreateOrAmendSuccess = (nav: NavigateFn) => (
  response: CreateOrAmendHolidayStopsResponse
) => {
  nav("confirmed", { replace: true });
  return null;
};

const getRenderCreateOrAmendError = (modificationKeyword: string) => () => (
  <div css={{ textAlign: "left", marginTop: "10px" }}>
    <h2>Sorry, {modificationKeyword} your holiday suspension failed.</h2>
    <p>To try again please go back and re-enter your dates.</p>
    <CallCentreNumbers prefixText="Alternatively, to contact us" />
    <LinkButton to=".." text="Back" left />
  </div>
);
export interface HolidayReviewState {
  isExecuting: boolean;
  isCheckboxConfirmed: boolean;
}

export class HolidayReview extends React.Component<
  HolidayStopsRouteableStepProps,
  HolidayReviewState
> {
  public state: HolidayReviewState = {
    isExecuting: false,
    isCheckboxConfirmed: false
  };
  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiItemContext.Consumer>
            {productDetail => (
              <HolidayDateChooserStateContext.Consumer>
                {dateChooserState =>
                  isSharedHolidayDateChooserState(dateChooserState) &&
                  isProduct(productDetail) ? (
                    <PotentialHolidayStopsAsyncLoader
                      fetch={getPotentialHolidayStopsFetcher(
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
          </MembersDataApiItemContext.Consumer>
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

    const innerContent = () => (
      <>
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
            isTestUser={productDetail.isTestUser}
            subscription={productDetail.subscription}
            issueKeyword={this.props.productType.holidayStops.issueKeyword}
          />
          {this.props.productType.holidayStops.explicitConfirmationRequired && (
            <>
              <div css={{ marginTop: "20px", marginBottom: "10px" }}>
                <Checkbox
                  checked={this.state.isCheckboxConfirmed}
                  onChange={newValue =>
                    this.setState({ isCheckboxConfirmed: newValue })
                  }
                  label={
                    this.props.productType.holidayStops
                      .explicitConfirmationRequired.checkboxLabel
                  }
                />
              </div>
              <Modal
                instigator={
                  <a
                    css={{
                      fontFamily: sans,
                      fontSize: "14px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      margin: "10px"
                    }}
                  >
                    <InfoIcon />
                    Tell me more
                  </a>
                }
                title={
                  this.props.productType.holidayStops
                    .explicitConfirmationRequired.explainerModalTitle
                }
              >
                <p>
                  {
                    this.props.productType.holidayStops
                      .explicitConfirmationRequired.explainerModalBody
                  }
                </p>
              </Modal>
            </>
          )}
        </div>
        {this.state.isExecuting ? (
          <div css={{ marginTop: "40px", textAlign: "right" }}>
            <CreateOrAmendHolidayStopsAsyncLoader
              fetch={getPerformCreateOrAmendFetcher(
                dateChooserState.selectedRange,
                productDetail.subscription.subscriptionId,
                productDetail.isTestUser,
                holidayStopsResponse.existingHolidayStopToAmend
              )}
              render={getRenderCreateOrAmendSuccess(
                this.props.navigate || navigate
              )}
              errorRender={getRenderCreateOrAmendError(
                holidayStopsResponse.existingHolidayStopToAmend
                  ? "amending"
                  : "creating"
              )}
              loadingMessage={`${
                holidayStopsResponse.existingHolidayStopToAmend
                  ? "Amending"
                  : "Creating"
              } your suspension...`}
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
                disabled={
                  !!this.props.productType.holidayStops
                    .explicitConfirmationRequired &&
                  !this.state.isCheckboxConfirmed
                }
                onClick={() => this.setState({ isExecuting: true })}
                right
                primary
              />
            </div>
          </div>
        )}
      </>
    );

    return this.props.navigate ? (
      <HolidayDateChooserStateContext.Provider
        value={dateChooserStateWithCredits}
      >
        <WizardStep
          routeableStepProps={this.props}
          hideBackButton
          {...(isInAccountOverviewTest() ? { fullWidth: true } : {})}
        >
          {isInAccountOverviewTest() ? (
            <>
              <PageHeaderContainer
                title="Manage suspensions"
                breadcrumbs={[
                  {
                    title: navLinks.accountOverview.title,
                    link: navLinks.accountOverview.link
                  },
                  {
                    title: "Manage suspensions",
                    currentPage: true
                  }
                ]}
              />
              <PageNavAndContentContainer
                selectedNavItem={navLinks.accountOverview}
              >
                <ProgressIndicator
                  steps={[
                    { title: "Choose dates" },
                    { title: "Review", isCurrentStep: true },
                    { title: "Confirmation" }
                  ]}
                  additionalCSS={css`
                    margin: ${space[5]}px 0 ${space[12]}px;
                  `}
                />
                {innerContent()}
              </PageNavAndContentContainer>
            </>
          ) : (
            innerContent()
          )}
        </WizardStep>
      </HolidayDateChooserStateContext.Provider>
    ) : (
      visuallyNavigateToParent(this.props)
    );
  };
}
