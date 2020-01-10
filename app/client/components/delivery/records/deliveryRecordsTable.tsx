import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useState } from "react";
import { DeliveryRecordsDetail } from "../../../../shared/productResponse";
import { DeliveryRecordsApiItem } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";
import { DeliveryRecordMessage } from "./deliveryRecordMessage";
import { RecordAddress } from "./deliveryRecordsAddress";
import { DeliveryProblemMap } from "./deliveryRecordsApi";
import { PaginationNav } from "./deliveryRecordsPaginationNav";
import { RecordStatus } from "./deliveryRecordStatus";

const isOdd = (n: number) => Math.abs(n % 2) === 1;
const tbodyCSS = css`
  td {
    width: 100%;
    display: block;
    padding: ${space[2]}px ${space[2]}px ${space[5]}px;
    vertical-align: top;
    ${minWidth.tablet} {
      width: auto;
      display: table-cell;
      text-align: left;
      padding: ${space[2]}px 10px;
    }
  }
  td[data-title] {
    text-align: right;
    ${minWidth.tablet} {
      text-align: left;
    }
  }
  td[data-title]:before {
    content: attr(data-title);
    font-weight: bold;
    float: left;
    ${minWidth.tablet} {
      display: none;
    }
  }
  td[data-title-block]:before {
    content: attr(data-title-block);
    font-weight: bold;
    display: block;
    ${minWidth.tablet} {
      display: none;
    }
  }
`;

const trCSS = (rowNum: number, hasAdditionalMessages: boolean) => css`
  display: flex;
  flex-direction: column;
  ${minWidth.tablet} {
    display: table-row;
    background: ${isOdd(rowNum) ? palette.neutral[97] : "none"};
  }
  td {
    border-bottom: 1px solid ${palette.neutral[86]};
    ${minWidth.tablet} {
      border-bottom: ${hasAdditionalMessages
        ? "none"
        : `1px solid ${palette.neutral[86]}`};
    }
  }
`;

interface RecordsTableProps {
  data: DeliveryRecordsDetail[];
  deliveryProblemMap: DeliveryProblemMap;
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
          margin-top: ${space[9]}px;
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
                padding: 0 10px ${space[2]}px;
              }
            }
          `}
        >
          <tr>
            <th>Date</th>
            <th>Status</th>
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
                    !!deliveryRecord.isChangedAddress ||
                      !!deliveryRecord.problemCaseId
                  )}
                >
                  <td
                    data-title="Date"
                    css={css`
                      order: 2;
                    `}
                  >
                    {moment(deliveryRecord.deliveryDate).format("DD/MM/YYYY")}
                  </td>
                  <td
                    css={css`
                      order: 1;
                      background-color: ${palette.neutral[97]};
                      border-top: 2px solid ${palette.neutral[86]};
                      margin-top: ${space[5]}px;
                      ${minWidth.tablet} {
                        background-color: unset;
                        border-top: none;
                        margin-top: 0;
                      }
                    `}
                  >
                    <RecordStatus
                      isDispatched={!!deliveryRecord.deliveryAddress}
                      isHolidayStop={!!deliveryRecord.hasHolidayStop}
                      isChangedAddress={!!deliveryRecord.isChangedAddress}
                      deliveryProblem={
                        (deliveryRecord.problemCaseId &&
                          props.deliveryProblemMap[deliveryRecord.problemCaseId]
                            ?.problemType) ||
                        null
                      }
                    />
                  </td>
                  <td
                    data-title="Delivery postcode"
                    css={css`
                      order: 3;
                    `}
                  >
                    {deliveryRecord.addressLine1 &&
                    !deliveryRecord.hasHolidayStop ? (
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
                      order: 4;
                      margin-bottom: ${space[5]}px;
                      ${minWidth.tablet} {
                        max-width: 25ch;
                        margin-bottom: 0;
                      }
                    `}
                  >
                    {deliveryRecord.deliveryInstruction &&
                    !deliveryRecord.hasHolidayStop
                      ? deliveryRecord.deliveryInstruction
                      : "-"}
                  </td>
                </tr>
                {(deliveryRecord.isChangedAddress ||
                  deliveryRecord.problemCaseId) && (
                  <tr
                    css={css`
                      display: none;
                      ${minWidth.tablet} {
                        display: table-row;
                        background: ${isOdd(listIndex)
                          ? palette.neutral[97]
                          : "none"};
                      }
                      td {
                        padding-top: 0;
                        border-bottom: 1px solid ${palette.neutral[86]};
                      }
                    `}
                  >
                    <td />
                    <td colSpan={3}>
                      {!!deliveryRecord.problemCaseId && (
                        <DeliveryRecordMessage
                          isError
                          message={
                            deliveryRecord.problemCaseId &&
                            props.deliveryProblemMap[
                              deliveryRecord.problemCaseId
                            ]?.problemType
                          }
                        />
                      )}
                      {deliveryRecord.isChangedAddress && (
                        <DeliveryRecordMessage
                          message={"Delivery address changed"}
                        />
                      )}
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          changeCallBack={scrollToTop}
        />
      )}
    </>
  );
};
