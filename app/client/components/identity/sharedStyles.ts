import { CSSObject } from "@emotion/core";

const lightBorder: CSSObject = {
  border: "1px solid #dcdcdc"
};

const inputCss: CSSObject = {
  boxShadow: "none",
  boxSizing: "border-box",
  color: "#121212",
  display: "inline-block",
  margin: "5px 0 24px 0",
  padding: "8px 8px 7px",
  fontSize: "14px",
  lineHeight: "1.4",
  outline: "none",
  borderRadius: "0",
  width: "100%"
};

const textareaCss: CSSObject = {
  minHeight: "108px",
  overflow: "auto",
  resize: "vertical"
};

export const labelCss: CSSObject = {
  display: "block",
  width: "100%",
  "& input:not([type='file']), & textarea": { ...inputCss, ...lightBorder },
  "& input[type='file']": inputCss,
  "& textarea": textareaCss
};
