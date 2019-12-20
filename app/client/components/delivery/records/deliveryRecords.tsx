import React from "react";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader
} from "./deliveryRecordsApi";

// const renderDeliveryRecords = (routeableStepProps: RouteableStepProps) => (
//   data: DeliveryRecordsApiItem[]
// ) => <p>Delivery records</p>;

export const DeliveryRecords = (props: RouteableStepProps) =>
  props.location &&
  props.location.state &&
  Array.isArray(props.location.state) ? (
    renderDeliveryRecords(props)(props.location.state)
  ) : (
    <DeliveryRecordsApiAsyncLoader
      render={renderDeliveryRecords(props)}
      fetch={createDeliveryRecordsFetcher("ABC123-subscriptionID")}
      loadingMessage={"Loading delivery records..."}
    />
  );

/////////////
const renderDeliveryRecords = (props: RouteableStepProps) => (data: any[]) => {
  return <p>delivery records</p>;
};
