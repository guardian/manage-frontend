import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import {
  RouteableStepProps,
  WizardStep,
  ReturnToYourProductButton
} from "../wizardRouterAdapter";
import { navigate } from "@reach/router";
import {
  HolidayStopsAsyncLoader,
  createGetHolidayStopsFetcher,
  GetHolidayStopsResponse,
  HolidayStopsResponseContext,
  augmentExistingHolidayStopsWithDateRange,
  HolidayStopRequest
} from "./holidayStopApi";
import { DateRange } from "moment-range";
export interface OverviewRowProps {
  heading: string;
  content: React.ReactFragment;
}

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
    <td>1 issue</td>
    <td>Amend / Delete</td>
  </tr>
);

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  routeableStepProps: RouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse) => (
  <HolidayStopsResponseContext.Provider value={holidayStopsResponse}>
    <WizardStep routeableStepProps={routeableStepProps} hideBackButton>
      <div>
        <h2>
          Suspensions overview ({productDetail.subscription.subscriptionId})
        </h2>

        <OverviewRow
          heading="How"
          content={
            <>
              <div>
                Going on holiday, or need time off from Guardian Weekly?
              </div>
              <div>
                You can suspend up to 6 issues and be credited on your next
                bill(s).
              </div>
            </>
          }
        />
        <OverviewRow
          heading="Summary"
          content={
            <div>
              You can suspend up to <strong>4</strong> issues until 10 June
              2020.
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
                    <th>Amend</th>
                  </tr>
                  {holidayStopsResponse.existing.map(
                    (holidayStopRequest, index) => (
                      <DetailsTableRow key={index} {...holidayStopRequest} />
                    )
                  )}
                </tbody>
              </table>
            ) : (
              "You currrently don't have any scheduled suspensions."
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
      <ReturnToYourProductButton productType={routeableStepProps.productType} />
    </WizardStep>
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
          <HolidayStopsAsyncLoader
            fetch={createGetHolidayStopsFetcher(
              routeableStepProps.productType.urlPart,
              productDetail.subscription.subscriptionId
            )}
            render={renderHolidayStopsOverview(
              productDetail,
              routeableStepProps
            )}
            loadingMessage="Loading existing suspensions"
            readerOnOK={augmentExistingHolidayStopsWithDateRange}
          />
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);
