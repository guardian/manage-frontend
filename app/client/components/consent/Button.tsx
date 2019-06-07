import React from "react";
import { css } from "@emotion/core";

const buttonStyles = color => css`
  margin: 12px;
`;

interface ButtonProps extends CommonButtonProps {
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => (
  <button css={buttonStyles} onClick={props.onClick}>
    Click me!
  </button>
);
