import { css } from "@emotion/core";
import React from "react";

const buttonStyles = color => css`
  margin: 12px;
`;

interface ButtonProps extends CommonButtonProps {
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => (
  <button css={buttonStyles} onClick={props.onClick}>
    {props.text}
  </button>
);
