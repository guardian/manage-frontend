import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useState } from "react";
import { DeliveryRecordsDetail } from "../../../../shared/productResponse";
import { DeliveryRecordsApiItem } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { RecordAddress } from "./deliveryRecordsAddress";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import { RecordStatus } from "./deliveryRecordStatus";

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

const trCSS = (
  rowNum: number,
  isFullWidth: boolean,
  hasBorder: boolean,
  hideAtMobile?: boolean
) => css`
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

interface RecordsTableProps {
  data: DeliveryRecordsDetail[];
  resultsPerPage: number;
}

export const RecordsTable = (props: RecordsTableProps) => {
  const totalPages = Math.ceil(props.data.length / props.resultsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <table
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
                      isChangedAddress={!!deliveryRecord.isChangedAddress}
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
                        max-width: 25ch;
                      }
                    `}
                  >
                    {deliveryRecord.deliveryAddress ? "placeholder copy" : "-"}
                  </td>
                </tr>
                {deliveryRecord.isChangedAddress && (
                  <tr css={trCSS(listIndex, true, true, true)}>
                    <td colSpan={4}>
                      <InfoMessage message={"Delivery address changed"} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <PaginationNav
          resultsPerPage={props.resultsPerPage}
          totalNumberOfResults={props.data.length}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          changeCallBack={scrollToTop}
        />
      )}
    </>
  );
};

interface InfoMessageProps {
  message: string;
}
export const InfoMessage = (props: InfoMessageProps) => (
  <>
    <div
      css={css`
        display: inline-block;
        height: 22px;
        vertical-align: top;
        margin: 0 calc(0.5rem + 4px) 0 4px;
      `}
    >
      <InfoIconDark fillColor={"#052962"} size={22} />
    </div>
    <span
      css={css`
        display: inline-block;
        margin-bottom: 2px;
      `}
    >
      {props.message}
    </span>
  </>
);
