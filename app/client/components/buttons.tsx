import { Link } from "@reach/router";
import Color from "color";
import React from "react";
import palette from "../colours";
import { sans } from "../styles/fonts";

export const LinkButton = ({
  color,
  textColor,
  text,
  left,
  to,
  disabled
}: {
  color: string;
  textColor?: string;
  text: string;
  left?: true;
  to: string;
  disabled?: boolean;
}) => {
  const hoverColor = Color(color)
    .darken(0.3)
    .string();
  // if (
  //   Color(hoverColor).contrast(Color(textColor)) < 4.5 ||
  //   Color(color).contrast(Color(textColor)) < 4.5
  // ) {
  //   console.error("insufficient constrast");
  // }
  return (
    <Link
      to={to}
      css={{
        ...styles.common,
        background: disabled ? palette.neutral["4"] : color,
        color: textColor,
        ...(left ? styles.left : styles.right),
        ":hover": disabled
          ? undefined
          : {
              background: hoverColor,
              ...(left ? styles.leftHover : styles.rightHover)
            },
        cursor: disabled ? "not-allowed" : "pointer"
      }}
    >
      {text}
      <svg width="30" height="30" viewBox="0 0 30 30">
        <path d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
      </svg>
    </Link>
  );
};

export const Button = ({
  color,
  textColor,
  text,
  left,
  onClick,
  disabled
}: {
  color: string;
  textColor?: string;
  text: string;
  left?: true;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const hoverColor = Color(color)
    .darken(0.3)
    .string();
  // if (
  //   Color(hoverColor).contrast(Color(textColor)) < 4.5 ||
  //   Color(color).contrast(Color(textColor)) < 4.5
  // ) {
  //   console.error("insufficient constrast");
  // }
  return (
    <button
      onClick={onClick}
      css={{
        ...styles.common,
        background: disabled ? palette.neutral["4"] : color,
        color: textColor,
        ...(left ? styles.left : styles.right),
        ":hover": disabled
          ? undefined
          : {
              background: hoverColor,
              ...(left ? styles.leftHover : styles.rightHover)
            },
        cursor: disabled ? "not-allowed" : "pointer"
      }}
      disabled={disabled}
    >
      {text}
      <svg width="30" height="30" viewBox="0 0 30 30">
        <path d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9" />
      </svg>
    </button>
  );
};

const styles = {
  common: {
    height: "36px",
    lineHeight: "36px",
    fontSize: "16px",
    fontFamily: sans,
    borderRadius: "1000px",
    border: "none",
    display: "inline-block",
    position: "relative"
  },
  leftHover: {
    svg: { transform: "translate(-5px, -50%) rotate(180deg)" }
  },
  left: {
    padding: "0 18px 0 45px",

    svg: {
      fill: "currentColor",
      height: "34px",
      position: "absolute",
      left: "5px",
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
    padding: "0 18px 0 18px",
    svg: {
      display: "none"
    }
  }
};
