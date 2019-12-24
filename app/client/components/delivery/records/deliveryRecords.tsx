import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import moment, { Moment } from "moment";
import React from "react";
import { DeliveryAddress } from "../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";

const renderDeliveryRecords = (props: RouteableStepProps) => (
  data: DeliveryRecordsResponse
) => {
  // tslint:disable-next-line: no-console
  console.log(JSON.stringify(data.results, null, " "));
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
        <table
          css={css`
            width: 100%;
            margin-top: 30px;
          `}
        >
          <thead
            css={css`
              display: none;
              ${minWidth.tablet} {
                display: table-header-group;
              }
              th {
                text-align: left;
              }
            `}
          >
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Delivery postcode</th>
              <th>Delivery instructions</th>
            </tr>
          </thead>
          <tbody
            css={css`
              td {
                width: 100%;
                display: block;
                border-bottom: 1px solid #dcdcdc;
                padding: 6px 8px 20px;
                vertical-align: top;
                ${minWidth.tablet} {
                  width: auto;
                  display: table-cell;
                  text-align: left;
                  border-bottom: 0;
                  padding: 0;
                }
              }
              td:first-child {
                background-color: #f6f6f6;
                ${minWidth.tablet} {
                  background-color: unset;
                }
              }
              td:nth-child(n + 2) {
                text-align: right;
                ${minWidth.tablet} {
                  text-align: left;
                }
              }
              td:nth-child(n + 2):before {
                font-weight: bold;
              }
              td:nth-child(n + 2)[data-title]:before {
                content: attr(data-title);
                float: left;
                ${minWidth.tablet} {
                  display: none;
                }
              }
              td:nth-child(n + 2)[data-title-block]:before {
                content: attr(data-title-block);
                text-align: left;
                display: block;
                ${minWidth.tablet} {
                  display: none;
                }
              }
              td:nth-child(n + 2)[data-title-block] {
                text-align: left;
              }
              td:first-of-type {
                border-top: 2px solid #dcdcdc;
                ${minWidth.tablet} {
                  border: none;
                }
              }
              tr + tr td:first-child {
                margin-top: 30px;
                ${minWidth.tablet} {
                  margin-top: 0;
                }
              }
            `}
          >
            {data.results.map((deliveryRecord, listIndex) => (
              <tr key={`delivery-record--${listIndex}`}>
                <td>
                  <RecordStatus isDispatched={true} />
                </td>
                <td data-title="Date">
                  {moment(deliveryRecord.deliveryDate).format("DD/MM/YYYY")}
                </td>
                <td data-title="Delivery postcode">
                  <RecordAddress
                    addressLine1={deliveryRecord.addressLine1}
                    addressLine2={deliveryRecord.addressLine2}
                    town={deliveryRecord.addressTown}
                    postcode={deliveryRecord.addressPostcode}
                  />
                </td>
                <td data-title-block="Delivery instructions">
                  placeholder copy
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageNavAndContentContainer>
    </>
  );
};

const RecordAddress = (props: DeliveryAddress) => (
  <div>
    <span>{props.postcode}</span>
    <span
      css={css`
        display: block;
        text-align: left;
        font-style: italic;
        font-weight: bold;
        font-size: 15px;
        color: #767676;
      `}
    >
      read more
    </span>
  </div>
);

interface RecordStatusProps {
  isDispatched: boolean;
}
const RecordStatus = (props: RecordStatusProps) => (
  <span
    css={css`
      font-weight: bold;
      color: ${props.isDispatched ? "green" : "red"};
    `}
  >
    {props.isDispatched ? "Dispatched" : "Undelivered"}
  </span>
);

export const DeliveryRecords = (props: RouteableStepProps) =>
  props.location &&
  props.location.state &&
  Array.isArray(props.location.state) ? (
    renderDeliveryRecords(props)(props.location.state)
  ) : (
    <DeliveryRecordsApiAsyncLoader
      render={renderDeliveryRecords(props)}
      // ABC123-subscriptionID
      fetch={createDeliveryRecordsFetcher("A-S00052650")}
      loadingMessage={"Loading delivery records..."}
    />
  );
