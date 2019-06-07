import React from "react";

interface ButtonProps extends CommonButtonProps {
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => (
  <button onClick={props.onClick}>Click me!</button>
);
