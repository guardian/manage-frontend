import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";

interface DeliveryRecordMessageProps {
  message: string;
  isError?: boolean;
}
export const DeliveryRecordMessage = (props: DeliveryRecordMessageProps) => (
  <>
    <span
      css={css`
        display: inline-block;
        margin-bottom: 2px;
        color: ${props.isError ? palette.news.main : palette.brand.dark};
      `}
    >
      {props.isError ? (
        <ErrorIcon />
      ) : (
        <i
          css={css`
            display: inline-block;
            height: 22px;
            vertical-align: top;
            margin: 0 calc(0.5rem + 4px) 0 4px;
          `}
        >
          <InfoIconDark fillColor={palette.brand.main} size={22} />
        </i>
      )}
      {props.message}
    </span>
  </>
);
