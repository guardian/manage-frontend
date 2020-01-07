import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
}

export const RecordStatus = (props: RecordStatusProps) => (
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
