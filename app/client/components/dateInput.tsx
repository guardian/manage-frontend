import { Moment } from "moment";
import React from "react";
import { sans } from "../styles/fonts";
import palette from "../colours";

const inputBoxCss = {
  fontFamily: sans,
  height: "2rem",
  border: "0",
  width: "4rem",
  padding: "0 2px 0 2px",
  fontSize: "1rem",
  appearance: "textfield",
  textAlign: "left"
};

const dayMonthCss = {
  ...inputBoxCss,
  width: "2rem"
};

const hiddenDateCss = {
  color: "transparent"
};

const dividerCss = {
  display: "inline-block",
  fontSize: "1rem",
  margin: "0 5px 0 5px"
};

const adjustZeroIndexedMonth = (date: Moment) => date.month() + 1;

export interface DateInputProps {
  selectedDate?: Moment;
  defaultDate: Moment;
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
    <fieldset
      css={{
        // display: "inline-block",
        border: "1px solid" + palette.neutral["5"],
        padding: "5px 10px 5px 10px"
      }}
      aria-describedby="validation-message"
    >
      <input
        css={dayMonthCss}
        type="number"
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
        type="number"
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
        type="number"
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
  );

  // private pushStateUpwards = () => this.props.onChange(this.state);
}
