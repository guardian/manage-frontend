import { css } from "@emotion/core";
import { headline } from "@guardian/src-foundations/typography";
import React from "react";

interface SelectHeaderInputProps {
  options: string[];
  preSelectedOption: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectHeaderInput = (props: SelectHeaderInputProps) => (
  <span
    css={css`
      position: relative;
      display: inline-block;
      ${headline.xxxsmall({ fontWeight: "bold" })};
    `}
  >
    {props.preSelectedOption}
    <select
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      `}
      onChange={e => {
        props.onChangeHandler(e);
      }}
    >
      {props.options.map((option, optionIndex) => (
        <option key={`option${optionIndex}`}>{option}</option>
      ))}
    </select>
  </span>
);
