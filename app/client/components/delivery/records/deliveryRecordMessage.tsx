import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";

interface DeliveryRecordMessageProps {
  message: string;
  isError?: boolean;
}
export const DeliveryRecordMessage = (props: DeliveryRecordMessageProps) => {
  const infoIconSize = 22;
  return (
    <>
      <span
        css={css`
          display: block;
          margin: ${space[2]}px 0 2px;
          color: ${props.isError ? palette.news.main : palette.brand.dark};
        `}
      >
        {props.isError ? (
          <ErrorIcon />
        ) : (
          <i
            css={css`
              display: inline-block;
              height: ${infoIconSize}px;
              vertical-align: top;
              margin: 0 calc(0.5rem + ${space[1]}px) 0 ${space[1]}px;
            `}
          >
            <InfoIconDark fillColor={palette.brand.main} size={infoIconSize} />
          </i>
        )}
        {props.message}
      </span>
    </>
  );
};
