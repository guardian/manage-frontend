import { CSSObject } from "@emotion/core";
import palette from "../../colours";

export const textSmall: CSSObject = {
  fontSize: "14px"
};

const lightBorder: CSSObject = {
  border: `1px solid ${palette.neutral["5"]}`
};

const errorBorder: CSSObject = {
  border: `1px solid ${palette.red.light}`
};

export const aCss = {
  color: palette.blue.dark,
  borderBottom: `1px solid ${palette.neutral["5"]}`,
  transition: "border-color .15s ease-out",
  "&:hover": {
    borderBottom: `1px solid ${palette.blue.dark}`
  }
};

const inputCss: CSSObject = {
  boxShadow: "none",
  boxSizing: "border-box",
  color: palette.neutral["1"],
  display: "inline-block",
  padding: "8px 8px 7px",
  fontSize: "14px",
  lineHeight: "1.4",
  outline: "none",
  borderRadius: "0",
  width: "100%"
};

const textareaCss: CSSObject = {
  verticalAlign: "top",
  minHeight: "108px",
  overflow: "auto",
  resize: "vertical"
};

export const labelCss: CSSObject = {
  margin: "5px 0 24px 0",
  display: "block",
  width: "100%",
  "& input:not([type='file']), & textarea": { ...inputCss, ...lightBorder },
  "& input[type='file']": inputCss,
  "& textarea": textareaCss
};

export const formFieldErrorCss: CSSObject = {
  "& input:not([type='file']), & textarea, & input": {
    ...errorBorder
  },
  "& p": {
    ...textSmall,
    color: palette.red.light,
    marginTop: "6px"
  }
};
