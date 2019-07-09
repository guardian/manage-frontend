import { navigate } from "@reach/router";
import moment from "moment";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../genericErrorScreen";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  calculateIssuesImpactedPerYear,
  createGetHolidayStopsFetcher,
  DATE_INPUT_FORMAT,
  embellishExistingHolidayStops,
  GetHolidayStopsAsyncLoader,
  GetHolidayStopsResponse,
  HolidayStopsResponseContext
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

export interface OverviewRowProps {
  heading: string;
  content: React.ReactFragment;
}

export const holidayQuestionsTopicString = "scheduling a suspension";

const OverviewRow = (props: OverviewRowProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "top",
      marginBottom: "2%"
    }}
  >
    <div css={{ flex: "1 1 150px" }}>
      <h3 css={{ marginTop: "0", paddingTop: "0" }}>{props.heading}</h3>
    </div>
    <div
      css={{
        flex: "4 4 350px"
      }}
    >
      {props.content}
    </div>
  </div>
);

const friendlyLongDateFormat = "D MMMM YYYY";

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  routeableStepProps: RouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse) => {
  const renewalDateMoment = moment(
    productDetail.subscription.renewalDate,
    DATE_INPUT_FORMAT
  );

  const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
    holidayStopsResponse.existing
      .map(existing => existing.publicationDatesToBeStopped)
      .flat(),
    renewalDateMoment
  );

  return (
    <HolidayStopsResponseContext.Provider value={holidayStopsResponse}>
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <WizardStep
          routeableStepProps={routeableStepProps}
          extraFooterComponents={
            <QuestionsFooter topic={holidayQuestionsTopicString} />
          }
          hideBackButton
        >
          <div>
            <h1>Suspend Guardian Weekly</h1>
            <h2>
              Subscription ID: {productDetail.subscription.subscriptionId}
            </h2>

            <OverviewRow
              heading="How"
              content={
                <>
                  <div>
                    You can suspend up to{" "}
                    {holidayStopsResponse.productSpecifics.annualIssueLimit}{" "}
                    issues per year and you will be credited on your future
                    bills.<br />You can schedule one suspension at a time.
                  </div>
                </>
              }
            />
            <OverviewRow
              heading="Summary"
              content={
                holidayStopsResponse.existing.length > 0 ? (
                  <>
                    <div>
                      You have suspended{" "}
                      <strong>
                        {
                          combinedIssuesImpactedPerYear.issueDatesThisYear
                            .length
                        }/{
                          holidayStopsResponse.productSpecifics.annualIssueLimit
                        }
                      </strong>{" "}
                      issues until{" "}
                      {renewalDateMoment.format(friendlyLongDateFormat)}
                      {combinedIssuesImpactedPerYear.issueDatesNextYear.length >
                      0 ? (
                        <span>
                          {" "}
                          and{" "}
                          <strong>
                            {
                              combinedIssuesImpactedPerYear.issueDatesNextYear
                                .length
                            }/{
                              holidayStopsResponse.productSpecifics
                                .annualIssueLimit
                            }
                          </strong>{" "}
                          issues the following year.
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div>
                    You have{" "}
                    <strong>
                      {holidayStopsResponse.productSpecifics.annualIssueLimit}
                    </strong>{" "}
                    issues remainining to suspend until{" "}
                    {renewalDateMoment.format(friendlyLongDateFormat)}.
                  </div>
                )
              }
            />
            <OverviewRow
              heading="Details"
              content={
                holidayStopsResponse.existing.length > 0 ? (
                  <SummaryTable data={holidayStopsResponse.existing} />
                ) : (
                  "You currently don't have any scheduled suspensions."
                )
              }
            />
            <div
              css={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <ReturnToYourProductButton
                productType={routeableStepProps.productType}
              />
              <div css={{ marginRight: "24px" }} />
              <Button
                text="Create suspension"
                right
                primary
                onClick={() =>
                  (routeableStepProps.navigate || navigate)("create")
                }
              />
            </div>
          </div>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    </HolidayStopsResponseContext.Provider>
  );
};

export const HolidaysOverview = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage suspensions of"
    hideHeading
    supportRefererSuffix="holiday_stop_flow"
    loadingMessagePrefix="Retrieving details of your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <NavigateFnContext.Provider value={{ navigate: props.navigate }}>
          {" "}
          {productDetail.subscription.start ? (
            <GetHolidayStopsAsyncLoader
              fetch={createGetHolidayStopsFetcher(
                routeableStepProps.productType.urlPart,
                productDetail.subscription.subscriptionId,
                productDetail.isTestUser
              )}
              render={renderHolidayStopsOverview(
                productDetail,
                routeableStepProps
              )}
              loadingMessage="Loading existing suspensions"
              readerOnOK={embellishExistingHolidayStops}
            />
          ) : (
            <GenericErrorScreen loggingMessage="Subscription had no start date" />
          )}
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);
