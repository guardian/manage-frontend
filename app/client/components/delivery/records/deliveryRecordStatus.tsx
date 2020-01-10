import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../../../styles/breakpoints";
import { DeliveryRecordMessage } from "./deliveryRecordMessage";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
  isChangedAddress: boolean;
  deliveryProblem: string | null;
}

export const RecordStatus = (props: RecordStatusProps) => (
  <>
    <span
      css={css`
        display: block;
        font-weight: bold;
        color: ${props.isDispatched &&
        !props.deliveryProblem &&
        !props.isHolidayStop
          ? palette.success.main
          : props.isHolidayStop && !props.deliveryProblem
          ? palette.brand.dark
          : palette.news.main};
      `}
    >
      {props.isDispatched &&
        !props.deliveryProblem &&
        !props.isHolidayStop &&
        "Dispatched"}
      {props.isHolidayStop && "Holiday Stop"}
      {props.deliveryProblem && "Delivery problem"}
    </span>
    {props.deliveryProblem && (
      <div
        css={css`
          margin-top: ${space[2]}px;
          ${minWidth.tablet} {
            display: none;
          }
        `}
      >
        <DeliveryRecordMessage message={props.deliveryProblem} isError />
      </div>
    )}
    {props.isChangedAddress && (
      <div
        css={css`
          margin-top: ${space[2]}px;
          ${minWidth.tablet} {
            display: none;
          }
        `}
      >
        <DeliveryRecordMessage message={"Delivery address changed"} />
      </div>
    )}
  </>
);
