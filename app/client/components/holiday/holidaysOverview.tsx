import { navigate } from "@reach/router";
import { DateRange } from "moment-range";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { GenericErrorScreen } from "../genericErrorScreen";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  createGetHolidayStopsFetcher,
  embellishExistingHolidayStops,
  GetHolidayStopsResponse,
  HolidayStopRequest,
  GetHolidayStopsAsyncLoader,
  HolidayStopsResponseContext,
  DATE_INPUT_FORMAT
} from "./holidayStopApi";
import moment from "moment";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
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
      textAlign: "top",
      marginBottom: "2%"
    }}
  >
    <div css={{ flex: "1 1 150px" }}>
      <h3 css={{ marginTop: "0", paddingTop: "0" }}>{props.heading}</h3>
    </div>
    <div css={{ flex: "4 4 350px" }}>{props.content}</div>
  </div>
);

const friendlyDateFormatPrefix = "D MMM";

const friendlyDateFormatSuffix = " YYYY";

const formatDateRangeAsFriendly = (range: DateRange) =>
  range.start.format(
    friendlyDateFormatPrefix +
      (range.start.year() !== range.end.year() ? friendlyDateFormatSuffix : "")
  ) +
  " - " +
  range.end.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix);

const DetailsTableRow = (holidayStopRequest: HolidayStopRequest) => (
  <tr>
    <td>{formatDateRangeAsFriendly(holidayStopRequest.dateRange)}</td>
    <td>
      {holidayStopRequest.publicationDatesToBeStopped.length} issue{holidayStopRequest
        .publicationDatesToBeStopped.length !== 1
        ? "s"
        : ""}
    </td>
  </tr>
);

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  routeableStepProps: RouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse) => (
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
          <h2>
            Suspend Guardian Weekly ({productDetail.subscription.subscriptionId})
          </h2>

          <OverviewRow
            heading="How"
            content={
              <>
                <div>
                  You can suspend up to 6 issues and be credited on your future
                  bills.<br />You can book up to one year ahead and can schedule
                  one suspension at a time.
                </div>
              </>
            }
          />
          <OverviewRow
            heading="Summary"
            content={
              <div>
                You can suspend up to <strong>4</strong> issues out of{" "}
                {holidayStopsResponse.productSpecifics.annualIssueLimit}{" "}
                available to suspend until{" "}
                {moment(
                  productDetail.subscription.renewalDate,
                  DATE_INPUT_FORMAT
                ).format("D MMMM YYYY")}
              </div> // TODO: replace number of issues and date with data from holidayStopResponse
            }
          />
          <OverviewRow
            heading="Details"
            content={
              holidayStopsResponse.existing.length > 0 ? (
                <table css={{ width: "100%" }}>
                  <tbody>
                    <tr css={{ textAlign: "left" }}>
                      <th>When</th>
                      <th>Suspended</th>
                    </tr>
                    {holidayStopsResponse.existing.map(
                      (holidayStopRequest, index) => (
                        <DetailsTableRow key={index} {...holidayStopRequest} />
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                "You currently don't have any scheduled suspensions."
              )
            }
          />
          <Button
            text="Create suspension"
            right
            primary
            onClick={() => (routeableStepProps.navigate || navigate)("create")}
          />
        </div>
        <ReturnToYourProductButton
          productType={routeableStepProps.productType}
        />
      </WizardStep>
    </MembersDataApiResponseContext.Provider>
  </HolidayStopsResponseContext.Provider>
);

export const HolidaysOverview = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage suspensions of"
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
                productDetail.subscription.subscriptionId
              )}
              render={renderHolidayStopsOverview(
                productDetail,
                routeableStepProps
              )}
              loadingMessage="Loading existing suspensions"
              readerOnOK={embellishExistingHolidayStops(
                productDetail.subscription.start
              )}
            />
          ) : (
            <GenericErrorScreen loggingMessage="Subscription had no start date" />
          )}
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);
