import { css, SerializedStyles } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";

type setStateFunc = (value: string) => void;

interface SelectOption {
  name: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  width: number;
  value: string;
  optional?: boolean;
  additionalcss?: SerializedStyles;
  changeSetState?: setStateFunc;
  inErrorState?: boolean;
  errorMessage?: string;
}

export const Select = (props: SelectProps) => (
  <label
    css={css`
      display: block;
      color: ${palette.neutral["7"]};
      ${textSans.medium()} ${props.additionalcss};
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
    <select
      name="country"
      id="delivery-address-country"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
        props.changeSetState && props.changeSetState(`${e.target.value}`)
      }
      css={css`
          display: block;
          width: 100%;
          max-width: ${props.width}ch;;
          ${textSans.medium()}
          color: ${palette.neutral["7"]};
          box-sizing: border-box;
          margin-top: 4px;
          padding: 8px 0 8px 4px;
          border: ${props.inErrorState ? 4 : 2}px solid ${
        props.inErrorState ? palette.error.main : palette.neutral["60"]
      };
          &:focus {
            ${focusHalo};
          }
          & option {
            line-height: "40px";
            font-size: 1.0625rem;
          }
        `}
    >
      <option value="" key="init-value">
        &nbsp;
      </option>
      {props.options.map((option, index) => (
        <option value={option.value} key={`country-${index}`}>
          {option.name}
        </option>
      ))}
    </select>
  </label>
);
