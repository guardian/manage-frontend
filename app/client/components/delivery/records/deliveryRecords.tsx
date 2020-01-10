import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React from "react";
import {
  DeliveryRecordsDetail,
  ProductDetail
} from "../../../../shared/productResponse";
import { mockRecords } from "../../../__tests__/components/delivery/records/mockDeliveryRecords";
import { maxWidth } from "../../../styles/breakpoints";
import { FlowStartMultipleProductDetailHandler } from "../../flowStartMultipleProductDetailHandler";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { RecordsTable } from "./deliveryRecordsTable";

const renderDeliveryRecords = (props: RouteableStepProps) => (
  data: DeliveryRecordsResponse
) => {
  // tslint:disable-next-line
  data.deliveryProblemMap["err-123"] = {
    problemType: "problem type explained"
  };
  // tslint:disable-next-line
  for (let i = 0; i < mockRecords.length; i++) {
    data.results.push(mockRecords[i]);
  }

  const getRecordAddressAsString = (recordDetail: DeliveryRecordsDetail) =>
    ` ${recordDetail.addressLine1}
      ${recordDetail.addressLine2}
      ${recordDetail.addressLine3}
      ${recordDetail.addressTown}
      ${recordDetail.addressCountry}
      ${recordDetail.addressPostcode}
    `;

  const filteredData = data;
  let currentAddress: string = "";
  for (let i = filteredData.results.length - 1; i >= 0; --i) {
    if (filteredData.results[i].hasHolidayStop) {
      continue;
    }
    if (
      currentAddress &&
      getRecordAddressAsString(filteredData.results[i]) !== currentAddress
    ) {
      // tslint:disable-next-line: no-object-mutation -- maybe this should live in the API?
      filteredData.results[i].isChangedAddress = true;
    }
    currentAddress = getRecordAddressAsString(filteredData.results[i]);
  }

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.subscriptions}>
        <h1>Delivery history</h1>
      </PageHeaderContainer>
      <PageNavAndContentContainer selectedNavItem={navLinks.subscriptions}>
        <h2
          css={css`
            border-top: 1px solid ${palette.neutral["86"]};
            ${headline.small()};
            font-weight: bold;
            ${maxWidth.tablet} {
              font-size: 1.25rem;
              line-height: 1.6;
            }
          `}
        >
          {props.productType.friendlyName}
        </h2>
        <RecordsTable
          data={filteredData.results}
          deliveryProblemMap={filteredData.deliveryProblemMap}
          resultsPerPage={7}
        />
      </PageNavAndContentContainer>
    </>
  );
};

export const DeliveryRecords = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix={"View delivery records"}
    hideHeading
    withNewLayout={{
      pageTitle: "Delivery history",
      selectedNavItem: navLinks.subscriptions
    }}
    supportRefererSuffix="delivery_records_flow"
    loadingMessagePrefix="Retrieving details of your"
    cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of it's delivery records.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <DeliveryRecordsApiAsyncLoader
        render={renderDeliveryRecords(props)}
        fetch={createDeliveryRecordsFetcher(
          productDetail.subscription.subscriptionId
        )}
        loadingMessage={"Loading delivery records..."}
      />
    )}
  />
);
