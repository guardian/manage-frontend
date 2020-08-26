import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline } from "@guardian/src-foundations/typography";
import { SvgChevronDownSingle } from "@guardian/src-icons";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { maxWidth } from "../../styles/breakpoints";

interface InvoiceTableYearSelectProps {
  years: string[];
  selectedYear: string;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  onDirectUpdate: (newYear: string) => void;
}

export const InvoiceTableYearSelect = (props: InvoiceTableYearSelectProps) => {
  const selectCss = css`
    ${headline.xxsmall({ fontWeight: "bold" })};
    color: ${palette.neutral[7]};
    display: block;
    padding: 0 ${space[5]}px 0 10px;
    margin: 0;
    box-sizing: border-box;
    border: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    ${maxWidth.tablet} {
      font-size: 1.0625rem;
      line-height: 1.6;
    }
    ::-ms-expand {
      display: none;
    }
  `;
  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        border-left: 1px solid ${palette.neutral[86]};
      `}
    >
      <select
        css={selectCss}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          if (event.target.value !== props.selectedYear) {
            const newYear = event.target.value;
            props.setSelectedYear(newYear);
            props.onDirectUpdate(newYear);
          }
        }}
        value={props.selectedYear}
      >
        {props.years.map(year => (
          <option
            value={year}
            css={css`
              padding: 8px 0;
              line-height: 30px;
            `}
            key={`year-${year}`}
          >
            {year}
          </option>
        ))}
      </select>
      <div
        css={css`
          pointer-events: none;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
        `}
      >
        <SvgChevronDownSingle />
      </div>
    </div>
  );
};
