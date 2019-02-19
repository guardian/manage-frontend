import { css } from "@emotion/core";
import React, { ChangeEvent } from "react";
import palette from "../colours";

export interface RadioButtonProps {
  key: any;
  value: any;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  groupName: string;
}

export const RadioButton = (props: RadioButtonProps) => (
  <label
    css={css({
      display: "block",
      cursor: "pointer",
      marginBottom: "7px"
    })}
  >
    <input
      type="radio"
      value={props.value}
      name={props.groupName}
      onChange={props.onChange}
      checked={props.checked}
      css={{ display: "none" }}
    />
    <div css={{ position: "relative" }}>
      <div
        css={css({
          position: "absolute",
          display: "inline-block",
          width: "1.125rem",
          height: "1.125rem",
          border: "0.0625rem solid " + palette.neutral["5"],
          boxShadow: "inset 0 0 0 0.1875rem " + palette.white,
          borderRadius: "3.75rem",
          transition: ".2s box-shadow",
          top: "2.5px",
          ...(props.checked && {
            backgroundColor: palette.green.dark,
            borderColor: palette.green.dark
          })
        })}
      />
      <div css={{ marginLeft: "1.5rem" }}>{props.label}</div>
    </div>
  </label>
);
