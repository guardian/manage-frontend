import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import React from "react";
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
                ${minWidth.tablet} {
                  width: auto;
                  display: table-cell;
                  text-align: left;
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
            `}
          >
            {data.results.map((deliveryRecord, listIndex) => (
              <tr>
                <td>Dispatched</td>
                <td data-title="Date">21/05/2019</td>
                <td data-title="Delivery postcode">SW1 234</td>
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
