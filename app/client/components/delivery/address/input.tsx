import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";

type setStateFunc = (value: string) => void;

interface InputProps {
  label: string;
  width: number;
  value: string;
  optional?: boolean;
  name?: string;
  id?: string;
  changeSetState?: setStateFunc;
  inErrorState?: boolean;
  errorMessage?: string;
}

export const Input = (props: InputProps) => (
  <label
    css={css`
      display: block;
      color: ${palette.neutral["7"]};
      ${textSans.medium()};
      font-weight: bold;
    `}
  >
    {props.label}
    {props.optional && (
      <span
        css={css`
          font-style: italic;
          font-weight: normal;
          color: ${palette.neutral["46"]};
        `}
      >
        {" "}
        optional
      </span>
    )}
    {props.inErrorState && (
      <span
        css={css`
          display: block;
          color: ${palette.error.main};
        `}
      >
        <ErrorIcon />
        {props.errorMessage}
      </span>
    )}
    <input
      type="text"
      name={name}
      id={props.id}
      value={props.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
        props.changeSetState && props.changeSetState(`${e.target.value}`)
      }
      css={css`
          display: block;
          width: ${props.width}ch;
          height: 44px;
          ${textSans.medium()}
          color: ${palette.neutral["7"]};
          margin-top: 4px;
          padding: 0 8px;
          background-color: ${palette.neutral["100"]};
          border: ${props.inErrorState ? 4 : 2}px solid ${
        props.inErrorState ? palette.error.main : palette.neutral["60"]
      };
          &:focus {
            ${focusHalo};
          }
        `}
    />
  </label>
);
