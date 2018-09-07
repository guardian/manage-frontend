import { Link } from "@reach/router";
import Color from "color";
import React from "react";
import palette from "../colours";
import { sans } from "../styles/fonts";

export interface CommonButtonProps {
  text: string;
  left?: true;
  right?: true;
  disabled?: boolean;
  colour?: string;
  textColour?: string;
}

export interface LinkButtonProps extends CommonButtonProps {
  to: string;
}

export interface ButtonProps extends CommonButtonProps {
  onClick?: () => void;
}

const applyArrowStyleIfApplicable = (
  hover: boolean,
  left?: true,
  right?: true
) => {
  if (left) {
    return hover ? styles.leftHover : styles.left;
  } else if (right) {
    return hover ? styles.rightHover : styles.right;
  }
  return {
    padding: "0 18px 0 18px",
    svg: {
      display: "none"
    }
  };
};

const defaultColour = palette.neutral["2"];
const buttonCss = ({
  disabled,
  colour = defaultColour,
  textColour = palette.white,
  left,
  right
}: CommonButtonProps) => ({
  ...styles.common,
  background: disabled ? palette.neutral["4"] : colour,
  color: textColour,
  ...applyArrowStyleIfApplicable(false, left, right),
  ":hover": disabled
    ? undefined
    : {
        background: Color(colour)
          .darken(colour === defaultColour ? 0.3 : 0.1)
          .string(),
        ...applyArrowStyleIfApplicable(true, left, right)
      },
  cursor: disabled ? "not-allowed" : "pointer"
});

export const ButtonArrow = () => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <path d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
  </svg>
);

const styles = {
  common: {
    height: "36px",
    lineHeight: "36px",
    fontSize: "16px",
    fontFamily: sans,
    borderRadius: "1000px",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    position: "relative"
  },
  leftHover: {
    svg: { transform: "translate(-5px, -50%) rotate(180deg)" }
  },
  left: {
    padding: "0 18px 0 40px",
    svg: {
      fill: "currentColor",
      height: "28px",
      position: "absolute",
      left: "5px",
      top: "50%",
      transform: "translate(0, -50%) rotate(180deg)",
      transition: "transform .3s, background .3s",
      width: "28px"
    }
  },
  rightHover: {
    svg: { transform: "translate(5px, -50%)" }
  },
  right: {
    padding: "0 40px 0 18px",
    svg: {
      fill: "currentColor",
      height: "34px",
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translate(0, -50%)",
      transition: "transform .3s, background .3s",
      width: "40px"
    }
  }
};

export const LinkButton = (props: LinkButtonProps) => (
  <Link to={props.disabled ? "" : props.to} css={buttonCss(props)}>
    {props.text}
    <ButtonArrow />
  </Link>
);

export const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    css={buttonCss(props)}
    disabled={props.disabled}
  >
    {props.text}
    <ButtonArrow />
  </button>
);
