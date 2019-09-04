import { css } from "@emotion/core";
import { Link } from "@reach/router";
import Color from "color";
import React from "react";
import palette from "../colours";
import { sans } from "../styles/fonts";
import { ArrowIcon } from "./svgs/arrowIcon";
import { TickIcon } from "./svgs/tickIcon";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  height?: string;
  fontWeight?: "bold";
  left?: true;
  right?: true;
  disabled?: boolean;
  colour?: string;
  textColour?: string;
  primary?: true;
  hollow?: true;
  hide?: boolean;
  forceCircle?: true;
  hoverColour?: string;
  leftTick?: true;
}

export interface LinkButtonProps extends ButtonProps {
  to: string;
  state?: any;
}

const applyIconStyleIfApplicable = (
  hover: boolean,
  left?: true,
  right?: true,
  leftTick?: true
) => {
  if (left) {
    return hover ? styles.leftHover : styles.left;
  } else if (right) {
    return hover ? styles.rightHover : styles.right;
  } else if (leftTick) {
    return {
      padding: "4px 21px 3px 16px"
    };
  }
  return {
    padding: "1px 15px 0 15px",
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
  colour = defaultColour,
  textColour = palette.white,
  left,
  right,
  primary,
  hollow,
  hide,
  forceCircle,
  hoverColour,
  leftTick
}: ButtonProps) => {
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
    position: "relative",
    ":active": {
      outline: "none"
    },
    minHeight: height || "36px",
    fontWeight,
    display: hide ? "none" : "inline-flex",
    background: backgroundColour,
    color: calcTextColour(disabled, textColour, primary, hollow),
    border: hollow ? "1px solid" : "none",
    ...applyIconStyleIfApplicable(false, left, right, leftTick),
    ...(forceCircle
      ? {
          padding: "1px 18px 0 18px"
        }
      : {}),
    ":hover": disabled
      ? undefined
      : {
          background:
            hoverColour ||
            Color(backgroundColour)
              .darken(backgroundColour === defaultColour ? 0.3 : 0.1)
              .string(),
          ...applyIconStyleIfApplicable(true, left, right, leftTick)
        },
    cursor: disabled ? "not-allowed" : "pointer",
    maxWidth: "calc(100vw - 40px)"
    // [maxWidth.mobile]: {
    //   maxWidth: maxWidthIfWrapping || "280px"
    // },
    // [maxWidth.mobileLarge]: {
    //   maxWidth: maxWidthIfWrapping || "320px",
    //   whiteSpace: "normal",
    //   lineHeight: "16px"
    // }
  });
};

const styles = {
  leftHover: {
    svg: { transform: "translate(-3px, -50%) rotate(180deg)" }
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
      width: "36px"
    }
  },
  rightHover: {
    svg: { transform: "translate(3px, -50%)" }
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
      width: "36px"
    }
  }
};

export const LinkButton = (props: LinkButtonProps) => (
  <Link
    to={props.disabled ? "" : props.to}
    onClick={props.onClick}
    css={buttonCss(props)}
    state={props.state}
  >
    {props.text}
    <ArrowIcon />
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
    {props.leftTick && <TickIcon />}
    {props.text}
    {(props.left || props.right) && <ArrowIcon />}
  </button>
);
