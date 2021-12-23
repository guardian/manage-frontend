import { css } from "@emotion/react";
import { space } from "@guardian/src-foundations";
import { brand } from "@guardian/src-foundations/palette";
import { capitalize } from "lodash";
import { ErrorIcon } from "../../svgs/errorIcon";
import { HolidayStopIcon } from "../../svgs/holidayStopIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { TickInCircle } from "../../svgs/tickInCircle";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
  bulkSuspensionReason?: string;
  productName?: string;
  isChangedAddress: boolean;
  isChangedDeliveryInstruction: boolean;
  isFutureRecord: boolean;
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
            margin-bottom: ${space[2]}px;
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
          Problem reported ({capitalize(props.deliveryProblem)})
        </span>
      )}
      {!props.deliveryProblem &&
        props.isDispatched &&
        !props.isHolidayStop &&
        !props.bulkSuspensionReason && (
          <span
            css={css`
              display: block;
              font-weight: bold;
              padding-left: 30px;
              position: relative;
              margin-bottom: ${space[2]}px;
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
            {props.isFutureRecord ? "Scheduled" : "Dispatched"}
          </span>
        )}
      {props.isHolidayStop && (
        <>
          <span
            css={css`
              display: block;
              font-weight: bold;
              padding-left: 30px;
              position: relative;
              margin-bottom: ${space[2]}px;
            `}
          >
            <i
              css={css`
                position: absolute;
                top: 0;
                left: 0;
              `}
            >
              {props.bulkSuspensionReason ? (
                <ErrorIcon downgradeToWarning />
              ) : (
                <HolidayStopIcon />
              )}
            </i>
            {props.bulkSuspensionReason
              ? `Imposed suspension (${props.bulkSuspensionReason})`
              : "Holiday stop"}
          </span>
          {props.bulkSuspensionReason && props.productName && (
            <p>
              Unfortunately due to {props.bulkSuspensionReason}, we are unable
              to deliver your {props.productName}. You will be credited for this
              issue off the subsequent payment.
            </p>
          )}
        </>
      )}
      {!props.isHolidayStop && changesMessage && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
            margin-bottom: ${space[2]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <InfoIconDark fillColor={brand[500]} size={22} />
          </i>
          {changesMessage}
        </span>
      )}
    </>
  );
};
