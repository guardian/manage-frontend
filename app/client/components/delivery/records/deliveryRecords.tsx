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
  // data.results.push({
  //   deliveryDate: "2019-12-05",
  //   deliveryInstruction: "Description",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-12-04",
  //   deliveryInstruction: "Description",
  //   hasHolidayStop: true
  // });
  // data.results.push({
  //   deliveryDate: "2019-12-03",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Different Address, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Different Address",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E2 3WB",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-12-02",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Different Address, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Different Address",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E2 3WB",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-12-01",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Main St, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Main St",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E1 2QA",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-11-30",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Main St, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Main St",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E1 2QA",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-11-29",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Main St, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Main St",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E1 2QA",
  //   hasHolidayStop: false
  // });
  // data.results.push({
  //   deliveryDate: "2019-11-28",
  //   deliveryInstruction: "Description",
  //   deliveryAddress: "Main St, Line 2, London, UK, E1 2QA",
  //   addressLine1: "Main St",
  //   addressLine2: "Line 2",
  //   addressTown: "London",
  //   addressCountry: "UK",
  //   addressPostcode: "E1 2QA",
  //   hasHolidayStop: false
  // });

  const filteredData = data;
  let currentAddress: string = "";
  for (let i = filteredData.results.length - 1; i >= 0; --i) {
    if (
      currentAddress &&
      filteredData.results[i].deliveryAddress !== currentAddress
    ) {
      // tslint:disable-next-line: no-object-mutation
      filteredData.results[i].isChangedAddress = true;
    }
    currentAddress = filteredData.results[i].deliveryAddress;
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
    if (pageTopRef.current) {
      // window.scrollTo(0, pageTopRef.current.offsetTop - 20);
      window.scrollTo(0, 0);
    }
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
type PaginationChangeCallBack = () => void;
interface PaginationNavProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  changeCallBack: PaginationChangeCallBack;
}
const PaginationNav = (props: PaginationNavProps) => {
  const pagesArr = [];
  for (let i = 0; i < props.totalPages; i++) {
    pagesArr.push(
      <li
        css={css`
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #dcdcdc;
          border-radius: 50%;
          position: relative;
        `}
        onClick={() => {
          props.setCurrentPage(i);
          props.changeCallBack();
        }}
      >
        {i === props.currentPage && (
          <div
            css={css`
              position: absolute;
              top: 4px;
              left: 4px;
              width: calc(100% - 8px);
              height: calc(100% - 8px);
              background-color: #666;
              border-radius: 50%;
            `}
          />
        )}
      </li>
    );
  }

  return (
    <ul
      css={css`
        list-style: none;
        padding: 0;
        margin: 30px 0;
        width: 100%;
        text-align: center;
        li + li {
          margin-left: 8px;
        }
      `}
    >
      {pagesArr}
    </ul>
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
export const DeliveryRecords = (props: DeliveryRecordsProps) =>
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
