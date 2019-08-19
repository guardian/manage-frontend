import { css } from "@emotion/core";
import React from "react";
import palette from "../../colours";

const itemContainerStyles = css`
  margin-left: -12px;
  margin-right: -12px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 1px;
  background-color: ${palette.neutral[5]};
`;

export const CmpSeparator: React.FC = () => {
  return <div css={itemContainerStyles} />;
};
