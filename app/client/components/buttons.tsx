import { css } from "@emotion/core";
import { Link } from "@reach/router";
import Color from "color";
import React from "react";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";

export interface CommonButtonProps {
  text: string;
  height?: string;
  fontWeight?: "bold";
  maxWidthIfWrapping?: string;
  left?: true;
  right?: true;
  disabled?: boolean;
  colour?: string;
  textColour?: string;
  primary?: true;
  hollow?: true;
  hide?: boolean;
}

export interface LinkButtonProps extends CommonButtonProps {
  to: string;
  state?: any;
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
    padding: "1px 18px 0 18px",
    svg: {
      display: "none"
    }
  };
};

const calcBackgroundColour = (
  disabled?: boolean,
  colour?: string,
  primary?: true,
  hollow?: true
) => {
  if (disabled) {
    return palette.neutral["4"];
  } else if (primary) {
    return palette.yellow.medium;
  } else if (hollow) {
    return palette.white;
  }
  return colour;
};

const calcTextColour = (
  disabled?: boolean,
  textColour?: string,
  primary?: true,
  hollow?: true
) => {
  if (disabled) {
    return palette.white;
  } else if (primary || hollow) {
    return palette.neutral["1"];
  }
  return textColour;
};

const defaultColour = palette.neutral["2"];
const buttonCss = ({
  disabled,
  height,
  fontWeight,
  maxWidthIfWrapping,
  colour = defaultColour,
  textColour = palette.white,
  left,
  right,
  primary,
  hollow,
  hide
}: CommonButtonProps) => {
  const backgroundColour = calcBackgroundColour(
    disabled,
    colour,
    primary,
    hollow
  );
  return css({
    fontSize: "16px",
    fontFamily: sans,
    borderRadius: "1000px",
    alignItems: "center",
    whiteSpace: "nowrap",
    position: "relative",
    ":active": {
      outline: "none"
    },
    minHeight: height || "36px",
    lineHeight: height || "36px",
    fontWeight,
    display: hide ? "none" : "inline-flex",
    background: backgroundColour,
    color: calcTextColour(disabled, textColour, primary, hollow),
    border: hollow ? "1px solid" : "none",
    ...applyArrowStyleIfApplicable(false, left, right),
    ":hover": disabled
      ? undefined
      : {
          background: Color(backgroundColour)
            .darken(backgroundColour === defaultColour ? 0.3 : 0.1)
            .string(),
          ...applyArrowStyleIfApplicable(true, left, right)
        },
    cursor: disabled ? "not-allowed" : "pointer",
    [maxWidth.mobile]: {
      maxWidth: maxWidthIfWrapping || "280px"
    },
    [maxWidth.mobileLarge]: {
      maxWidth: maxWidthIfWrapping || "320px",
      whiteSpace: "normal",
      lineHeight: "16px"
    }
  });
};

export const ButtonArrow = () => (
  <svg viewBox="0 0 30 30">
    <path d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
  </svg>
);

const styles = {
  leftHover: {
    svg: { transform: "translate(-5px, -50%) rotate(180deg)" }
  },
  left: {
    padding: "1px 18px 0 40px",
    svg: {
      fill: "currentColor",
      height: "34px",
      position: "absolute",
      left: "0px",
      top: "50%",
      transform: "translate(0, -50%) rotate(180deg)",
      transition: "transform .3s, background .3s",
      width: "40px"
    }
  },
  rightHover: {
    svg: { transform: "translate(5px, -50%)" }
  },
  right: {
    padding: "1px 40px 0 18px",
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
  <Link
    to={props.disabled ? "" : props.to}
    css={buttonCss(props)}
    state={props.state}
  >
    {props.text}
    <ButtonArrow />
  </Link>
);

export const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    css={buttonCss(props)}
    disabled={props.disabled}
    onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) =>
      (event.target as HTMLButtonElement).blur()
    }
  >
    {props.text}
    <ButtonArrow />
  </button>
);
