import React from "react";
import { css, cx } from "@emotion/core";
import palette from "../../colours";

const getTransform = (collapsed: boolean): string => {
  if (collapsed) {
    return "rotate(45deg);";
  }

  return "rotate(-135deg)";
};

const collapsePurposeItemButtonStyles = (collapsed: boolean) => css`
  background-color: transparent;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0;
  position: relative;
  width: 20px;
  height: 20px;
  float: left;
  > * {
    pointer-events: none;
  }
  :before {
    position: absolute;
    top: 5px;
    left: 6px;
    border: 2px solid ${palette.neutral[4]};
    border-top: 0;
    border-left: 0;
    content: "";
    display: inline-block;
    transform: ${getTransform(collapsed)};
    height: 6px;
    width: 6px;
  }
`;

export const CollapsePurposeItemButton: React.FC<{
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({ collapsed, toggleCollapsed }) => {
  return (
    <button
      type="button"
      css={collapsePurposeItemButtonStyles(collapsed)}
      onClick={() => {
        toggleCollapsed(collapsed);
      }}
    />
  );
};
