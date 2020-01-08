import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../../../styles/breakpoints";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoMessage } from "./deliveryRecordsTable";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
  isChangedAddress: boolean;
}

export const RecordStatus = (props: RecordStatusProps) => (
  <>
    <span
      css={css`
        display: block;
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
    {props.isChangedAddress && (
      <div
        css={css`
          margin-top: 8px;
          ${minWidth.tablet} {
            position: sticky;
            top: 100%;
          }
        `}
      >
        <InfoMessage message={"Delivery address changed"} />
      </div>
    )}
  </>
);
