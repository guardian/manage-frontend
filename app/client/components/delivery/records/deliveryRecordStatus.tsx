import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";
import { HolidayStopIcon } from "../../svgs/holidayStopIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { TickInCircle } from "../../svgs/tickInCircle";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
  isChangedAddress: boolean;
  isChangedDeliveryInstruction: boolean;
  deliveryProblem: string | null;
}
export const RecordStatus = (props: RecordStatusProps) => {
  let changesMessage = `${props.isChangedAddress ? "Delivery address" : ""}`;
  if (props.isChangedAddress && !props.isChangedDeliveryInstruction) {
    changesMessage = `${changesMessage} changed`;
  }
  if (props.isChangedDeliveryInstruction) {
    changesMessage = `${changesMessage} ${
      props.isChangedAddress ? " and d" : "D"
    }elivery instructions changed`;
  }
  return (
    <>
      {props.deliveryProblem && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <ErrorIcon />
          </i>
          Problem reported ({props.deliveryProblem})
        </span>
      )}
      {!props.deliveryProblem && props.isDispatched && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <TickInCircle />
          </i>
          Dispatched
        </span>
      )}
      {!props.deliveryProblem && props.isHolidayStop && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <HolidayStopIcon />
          </i>
          Holiday stop
        </span>
      )}
      {!props.isHolidayStop && changesMessage && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <InfoIconDark fillColor={palette.brand.bright} size={22} />
          </i>
          {changesMessage}
        </span>
      )}
    </>
  );
};
