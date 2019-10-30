import { AppearanceProperty, TextAlignProperty } from "csstype";
import { Moment } from "moment";
import React from "react";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";

const inputBoxCss = {
  fontFamily: sans,
  border: 0,
  width: "50px",
  fontSize: "16px",
  appearance: "textfield" as AppearanceProperty,
  textAlign: "center" as TextAlignProperty, // this cast shouldn't be required (weird TypeScript issue here)
  padding: 0,
  margin: 0
};

const dayMonthCss = {
  ...inputBoxCss,
  width: "25px"
};

const dividerCss = {
  display: "inline-block",
  fontSize: "16px",
  padding: 0,
  margin: 0
};

const adjustZeroIndexedMonth = (date: Moment) => date.month() + 1;

export interface DateInputProps {
  selectedDate?: Moment;
  defaultDate: Moment;
  labelText: string;
  disabled?: boolean;
  // onChange: (newValue: DateInputState) => void; // TODO: UNCOMMENT WHEN INPUT ACTIVATED
}

export interface DateInputState {
  day: number;
  month: number;
  year: number;
  dateVisible: boolean;
}

export class DateInput extends React.Component<DateInputProps, DateInputState> {
  public state: DateInputState = {
    day: this.props.defaultDate.date(),
    month: adjustZeroIndexedMonth(this.props.defaultDate),
    year: this.props.defaultDate.year(),
    dateVisible: false
  };

  public componentDidUpdate = (prevProps: DateInputProps) => {
    if (
      // prevProps.selectedDate && // TODO: may be required when input activated
      this.props.selectedDate &&
      prevProps.selectedDate !== this.props.selectedDate
    ) {
      this.setState({
        day: this.props.selectedDate.date(),
        month: adjustZeroIndexedMonth(this.props.selectedDate),
        // month: this.props.selectedDate.month(),
        year: this.props.selectedDate.year(),
        dateVisible: true
      });
    }
  };

  public render = () => (
    <>
      <div
        css={{
          fontFamily: sans,
          fontSize: "14px",
          [maxWidth.desktop]: {
            display: "none"
          }
        }}
      >
        {this.props.labelText}
        <br />
      </div>
      <fieldset
        css={{
          // display: "inline-block",
          border: "1px solid" + palette.neutral["5"],
          padding: "5px",
          whiteSpace: "nowrap",
          margin: 0
        }}
        aria-describedby="validation-message"
        disabled={this.props.disabled}
      >
        <input
          css={dayMonthCss}
          // type="number"
          aria-label="day"
          value={this.state.day}
          // onChange={event => {

          //   const day = parseInt(event.target.value, 10);
          //   if (day > 0) {
          //     this.setState({ day }, this.pushStateUpwards);
          //   }
          // }}
          readOnly // TODO: remove and replace with onChange when input boxes become active
        />
        <div css={dividerCss}>/</div>
        <input
          css={dayMonthCss}
          // type="number"
          aria-label="month"
          value={this.state.month}
          // onChange={event => {
          //   const month = parseInt(event.target.value, 10);
          //   if (month > 0) {
          //     this.setState(
          //       { month: parseInt(event.target.value, 10) },
          //       this.pushStateUpwards
          //     );
          //   }
          // }}
          readOnly // TODO: remove and replace with onChange when input boxes become active
        />
        <div css={dividerCss}>/</div>
        <input
          css={inputBoxCss}
          // type="number"
          arial-label="year"
          value={this.state.year}
          // onChange={event => {
          //   const year = parseInt(event.target.value, 10);
          //   if (year > 0) {
          //     this.setState({ year }, this.pushStateUpwards);
          //   }
          // }}
          readOnly // TODO: remove and replace with onChange when input boxes become active
        />
      </fieldset>
    </>
  );

  // private pushStateUpwards = () => this.props.onChange(this.state);
}
