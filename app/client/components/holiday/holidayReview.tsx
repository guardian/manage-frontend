import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { Link, navigate, NavigateFn } from "@reach/router";
import React, {useState} from "react";
import {
  DATE_FNS_INPUT_FORMAT,
  DateRange,
  dateString
} from "../../../shared/dates";
import {
  isProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { maxWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { Button, LinkButton } from "../buttons";
import { CallCentreNumbers } from "../callCentreNumbers";
import { Checkbox } from "../checkbox";
import { GenericErrorScreen } from "../genericErrorScreen";
import { Modal } from "../modal";
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
  HolidayStopRequest,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  PotentialHolidayStopsResponse,
  ReloadableGetHolidayStopsResponse
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";
import {fetcher} from "../../fetchClient";
import DataFetcher from "../DataFetcher";
import SpinLoader from "../SpinLoader";
import useSWR from "swr";
import {fetchWithDefaultParameters} from "../../fetch";

interface CreateOrAmendHolidayParams {
  selectedRange: DateRange,
  subscriptionName: string,
  isTestUser: boolean,
  existingHolidayStopToAmend?: HolidayStopRequest
}

const getPerformCreateOrAmendFetcher = (params: CreateOrAmendHolidayParams) =>
  fetchWithDefaultParameters(
    `/api/holidays${
      params.existingHolidayStopToAmend
        ? `/${params.subscriptionName}/${params.existingHolidayStopToAmend.id}`
        : ""
    }`,
    {
      method: params.existingHolidayStopToAmend ? "PATCH" : "POST",
      body: JSON.stringify({
        startDate: dateString(params.selectedRange.start, DATE_FNS_INPUT_FORMAT),
        endDate: dateString(params.selectedRange.end, DATE_FNS_INPUT_FORMAT),
        subscriptionName: params.subscriptionName
      }),
      headers: {
        "Content-Type": "application/json",
        [MDA_TEST_USER_HEADER]: `${params.isTestUser}`
      }
    }
  );

const getRenderCreateOrAmendSuccess = (nav: NavigateFn) => {
  // TODO should probably check the 'success' string within this (even thought status code should catch failure)
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

export function HolidayReview (props: HolidayStopsRouteableStepProps) {
  const [isCheckboxConfirmed, setIsCheckboxConfirmed] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  interface HolidayReviewRendererProps {
    holidayStopsResponse: ReloadableGetHolidayStopsResponse;
    productDetail: ProductDetail;
    dateChooserState: SharedHolidayDateChooserState;
  }

  const HolidayReviewRenderer = ({ holidayStopsResponse, productDetail, dateChooserState  }: HolidayReviewRendererProps) => {
    const { start, end } = dateChooserState.selectedRange;
    const url = `/api/holidays/${productDetail.subscription.subscriptionId}/potential?startDate=${dateString(
      start,
      DATE_FNS_INPUT_FORMAT
    )}&endDate=${dateString(end, DATE_FNS_INPUT_FORMAT)}`;

    const potentialHolidayStopsResponseWithCredits = useSWR(url, fetcher, { suspense: true }).data as PotentialHolidayStopsResponse;

    async function handleMutation(params: CreateOrAmendHolidayParams) {
      try {
        await getPerformCreateOrAmendFetcher(params);

        getRenderCreateOrAmendSuccess(props.navigate || navigate);
      } catch(e) {
        getRenderCreateOrAmendError(
          holidayStopsResponse.existingHolidayStopToAmend
            ? "amending"
            : "creating"
        )
      }
    }

    const dateChooserStateWithCredits: SharedHolidayDateChooserState = {
      ...dateChooserState,
      publicationsImpacted: potentialHolidayStopsResponseWithCredits.potentials.map(
        convertRawPotentialHolidayStopDetail
      )
    };

    const innerContent = (
      <>
        <div>
          <h1>Review details before confirming</h1>
          <p>
            Check the details carefully and amend them if necessary.{" "}
            {creditExplainerSentence(
              props.productType.holidayStops.issueKeyword
            )}{" "}
            {props.productType.holidayStops.additionalHowAdvice}
          </p>
          <HolidayQuestionsModal
            annualIssueLimit={holidayStopsResponse.annualIssueLimit}
            holidayStopFlowProperties={props.productType.holidayStops}
          />
          <div css={{ height: "25px" }} />
          <SummaryTable
            data={dateChooserStateWithCredits}
            alternateSuspendedColumnHeading="To be suspended"
            isTestUser={productDetail.isTestUser}
            subscription={productDetail.subscription}
            issueKeyword={props.productType.holidayStops.issueKeyword}
          />
          {props.productType.holidayStops.explicitConfirmationRequired && (
            <>
              <div css={{ marginTop: "20px", marginBottom: "10px" }}>
                <Checkbox
                  checked={isCheckboxConfirmed}
                  onChange={newValue => setIsCheckboxConfirmed(newValue)}
                  label={
                    props.productType.holidayStops
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
                  props.productType.holidayStops
                    .explicitConfirmationRequired.explainerModalTitle
                }
              >
                <p>
                  {
                    props.productType.holidayStops
                      .explicitConfirmationRequired.explainerModalBody
                  }
                </p>
              </Modal>
            </>
          )}
        </div>
        {isExecuting ? (
          <div css={{ marginTop: "40px", textAlign: "right" }}>
            <SpinLoader loadingMessage={`${
              holidayStopsResponse.existingHolidayStopToAmend
                ? "Amending"
                : "Creating"
            } your suspension...`} spinnerScale={0.7} inline />
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
                onClick={() => (props.navigate || navigate)("..")}
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
                  !!props.productType.holidayStops
                    .explicitConfirmationRequired &&
                  !isCheckboxConfirmed
                }
                onClick={() => {
                  const params = {
                    selectedRange: dateChooserState.selectedRange,
                    subscriptionName: productDetail.subscription.subscriptionId,
                    isTestUser: productDetail.isTestUser,
                    existingHolidayStopToAmend: holidayStopsResponse.existingHolidayStopToAmend
                  }

                  setIsExecuting(true);
                  handleMutation(params);
                }}
                right
                primary
              />
            </div>
          </div>
        )}
      </>
    );

    return props.navigate ? (
      <HolidayDateChooserStateContext.Provider
        value={dateChooserStateWithCredits}
      >
        <WizardStep routeableStepProps={props}>
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
          {innerContent}
        </WizardStep>
      </HolidayDateChooserStateContext.Provider>
    ) : (
      visuallyNavigateToParent(props)
    );
  };

  return (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiItemContext.Consumer>
            {productDetail => (
              <HolidayDateChooserStateContext.Consumer>
                {dateChooserState =>
                  isSharedHolidayDateChooserState(dateChooserState) &&
                  isProduct(productDetail) ? (
                    <DataFetcher loadingMessage="Calculating expected credit...">
                      <HolidayReviewRenderer holidayStopsResponse={holidayStopsResponse} productDetail={productDetail} dateChooserState={dateChooserState} />
                    </DataFetcher>
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
}

