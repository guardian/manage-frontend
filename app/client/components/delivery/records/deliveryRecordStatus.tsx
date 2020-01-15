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

const getStatusColor = (
  isDispatched: boolean,
  hasDeliveryProblem: boolean,
  isHolidayStop: boolean
) => {
  if (isDispatched && !hasDeliveryProblem && !isHolidayStop) {
    return palette.success.main;
  } else if (isHolidayStop && !hasDeliveryProblem) {
    return palette.brand.dark;
  }
  return palette.news.main;
};

export const RecordStatus = (props: RecordStatusProps) => (
  <>
    <span
      css={css`
        display: block;
        font-weight: bold;
        color: ${getStatusColor(
          props.isDispatched,
          !!props.deliveryProblem,
          props.isHolidayStop
        )};
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
