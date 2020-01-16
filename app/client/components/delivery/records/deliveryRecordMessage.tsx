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
          position: relative;
          margin: ${space[2]}px 0 2px;
          padding-left: 38px;
          color: ${props.isError ? palette.news.main : palette.brand.dark};
        `}
      >
        <span
          css={css`
            position: absolute;
            top: 0;
            left: 0;
          `}
        >
          {props.isError ? (
            <ErrorIcon />
          ) : (
            <i
              css={css`
                height: ${infoIconSize}px;
                margin-left: ${space[1]}px;
              `}
            >
              <InfoIconDark
                fillColor={palette.brand.main}
                size={infoIconSize}
              />
            </i>
          )}
        </span>
        {props.message}
      </span>
    </>
  );
};
