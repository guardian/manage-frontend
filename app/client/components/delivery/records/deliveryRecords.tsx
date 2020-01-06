import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { textSans } from "@guardian/src-foundations/typography";
import { WindowLocation } from "@reach/router";
import moment from "moment";
import React, { useState } from "react";
import {
  DeliveryAddress,
  DeliveryRecordsApiItem,
  DeliveryRecordsDetail
} from "../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { navLinks } from "../../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../../page";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoIcon } from "../../svgs/infoIcon";
import { RouteableStepProps } from "../../wizardRouterAdapter";
import {
  createDeliveryRecordsFetcher,
  DeliveryRecordsApiAsyncLoader,
  DeliveryRecordsResponse
} from "./deliveryRecordsApi";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import { mockRecords } from "./mockDeliveryRecords";

const pageTopRef = React.createRef<HTMLTableElement>();
const isOdd = (n: number) => Math.abs(n % 2) === 1;

const tbodyCSS = css`
  td {
    width: 100%;
    display: block;
    padding: 6px 8px 20px;
    vertical-align: top;
    ${minWidth.tablet} {
      width: auto;
      display: table-cell;
      text-align: left;
      padding: 6px 10px;
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
`;

const trCSS = (rowNum: number, isFullWidth: boolean, hasBorder: boolean) => css`
  ${minWidth.tablet} {
    background: ${isOdd(rowNum) ? "#f6f6f6" : "none"};
  }
  td {
    ${isFullWidth && `${minWidth.tablet} {padding-top: 0;}`}
    border-bottom: 1px solid #dcdcdc;
    ${minWidth.tablet} {
      border-bottom: ${hasBorder ? "1px solid #dcdcdc" : "0"};
    }
  }
  td:first-child {
    background-color: ${isFullWidth ? "unset" : "#f6f6f6"};
    border-top: ${isFullWidth ? "0" : "2px solid #dcdcdc"};
    margin-top: ${isFullWidth ? "0" : "30"};
    ${minWidth.tablet} {
      background-color: unset;
      border-top: none;
      margin-top: 0;
    }
  }
  td:last-child {
    margin-bottom: ${hasBorder ? "30px" : "0"};
    ${minWidth.tablet} {
      margin-bottom: 0;
    }
  }
`;

const renderDeliveryRecords = (props: RouteableStepProps) => (
  data: DeliveryRecordsResponse
) => {
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
    if (
      currentAddress &&
      getRecordAddressAsString(filteredData.results[i]) !== currentAddress
    ) {
      // tslint:disable-next-line: no-object-mutation
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
        <RecordsTable data={filteredData.results} resultsPerPage={7} />
      </PageNavAndContentContainer>
    </>
  );
};

interface RecordsTableProps {
  data: DeliveryRecordsDetail[];
  resultsPerPage: number;
}
const RecordsTable = (props: RecordsTableProps) => {
  const totalPages = Math.ceil(props.data.length / props.resultsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <table
        ref={pageTopRef}
        css={css`
          width: 100%;
          margin-top: 30px;
          ${textSans.medium()};
          border-collapse: collapse;
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
              ${minWidth.tablet} {
                padding: 0 10px 6px;
              }
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
        <tbody css={tbodyCSS}>
          {props.data
            .filter(
              (element, index) =>
                index >= currentPage * 7 && index < currentPage * 7 + 7
            )
            .map((deliveryRecord: DeliveryRecordsApiItem, listIndex) => (
              <React.Fragment key={`delivery-record--${listIndex}`}>
                <tr
                  css={trCSS(
                    listIndex,
                    false,
                    !deliveryRecord.isChangedAddress
                  )}
                >
                  <td>
                    <RecordStatus
                      isDispatched={!!deliveryRecord.deliveryAddress}
                      isHolidayStop={!!deliveryRecord.hasHolidayStop}
                    />
                  </td>
                  <td data-title="Date">
                    {moment(deliveryRecord.deliveryDate).format("DD/MM/YYYY")}
                  </td>
                  <td
                    data-title="Delivery postcode"
                    css={css`
                      ${minWidth.tablet} {
                        width: 220px;
                      }
                    `}
                  >
                    {deliveryRecord.deliveryAddress ? (
                      <RecordAddress
                        addressLine1={deliveryRecord.addressLine1}
                        addressLine2={deliveryRecord.addressLine2}
                        town={deliveryRecord.addressTown}
                        postcode={deliveryRecord.addressPostcode}
                        country={deliveryRecord.addressCountry}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td
                    data-title-block="Delivery instructions"
                    css={css`
                      ${minWidth.tablet} {
                        width: 220px;
                      }
                    `}
                  >
                    {deliveryRecord.deliveryAddress ? "placeholder copy" : "-"}
                  </td>
                </tr>
                {deliveryRecord.isChangedAddress && (
                  <tr css={trCSS(listIndex, true, true)}>
                    <td colSpan={4}>
                      <InfoIcon />
                      <span
                        css={css`
                          display: inline-block;
                          margin-bottom: 2px;
                        `}
                      >
                        Delivery address changed
                      </span>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <PaginationNav
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          changeCallBack={scrollToTop}
        />
      )}
    </>
  );
};

const RecordAddress = (props: DeliveryAddress) => {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <div>
      <div
        css={css`
          ${minWidth.tablet} {
            display: flex;
            flex-direction: column-reverse;
          }
        `}
      >
        <span>{props.postcode}</span>
        {showAddress && (
          <ul
            css={css`
              list-style-type: none;
              padding: 0;
              margin: 0;
              text-align: left;
            `}
          >
            <li>{props.addressLine1}</li>
            {props.addressLine2 && <li>{props.addressLine2}</li>}
            {props.town && <li>{props.town}</li>}
            {props.region && <li>{props.region}</li>}
            {props.country && <li>{props.country}</li>}
          </ul>
        )}
      </div>
      <span
        css={css`
          display: block;
          text-align: left;
          font-style: italic;
          font-weight: 500;
          font-size: 15px;
          color: #767676;
          cursor: pointer;
        `}
        onClick={() => {
          setShowAddress(!showAddress);
        }}
      >
        Read {showAddress ? "less" : "more"}
      </span>
    </div>
  );
};

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
}

const RecordStatus = (props: RecordStatusProps) => (
  <span
    css={css`
      font-weight: bold;
      color: ${props.isDispatched
        ? palette.success.main
        : props.isHolidayStop
        ? palette.brand.dark
        : palette.news.main};
    `}
  >
    {props.isDispatched ? (
      "Dispatched"
    ) : props.isHolidayStop ? (
      "Holiday Stop"
    ) : (
      <>
        <ErrorIcon />
        <span
          css={css`
            display: inline-block;
            margin-bottom: 2px;
          `}
        >
          Delivery problem
        </span>
      </>
    )}
  </span>
);

interface DeliveryRecordsWindowLocation extends WindowLocation {
  state: DeliveryRecordsResponse;
}
interface DeliveryRecordsProps extends RouteableStepProps {
  location?: DeliveryRecordsWindowLocation;
}
export const DeliveryRecords = (props: DeliveryRecordsProps) => {
  return props.location &&
    props.location.state &&
    Array.isArray(props.location.state) ? (
    renderDeliveryRecords(props)(props.location.state)
  ) : (
    <DeliveryRecordsApiAsyncLoader
      render={renderDeliveryRecords(props)}
      // "subscriptionId": "A-S00052650"
      // props.location?.state.subscription.subscriptionId
      fetch={createDeliveryRecordsFetcher("A-S00052650")}
      loadingMessage={"Loading delivery records..."}
    />
  );
};
