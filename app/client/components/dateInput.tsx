import { Moment } from "moment";
import React from "react";

const inputBoxCss = {
  fontFamily: "inherit",
  height: "2rem",
  border: "0",
  width: "80px",
  fontSize: "1rem",
  appearance: "textfield",
  paddingLeft: "10px",
  textAlign: "center"
};

const hiddenDateCss = {
  color: "transparent"
};

const dividerCss = {
  display: "inline-block",
  fontSize: "1rem"
};

const dateInputCss = {
  display: "inline-block",
  border: 0,
  borderBottom: "1px solid #767676",
  margin: "0 10px 0 10px"
};

export interface DateInputProps {
  selectedDate?: Moment;
  defaultDate: Moment;
  onChange: (newValue: DateInputState) => void;
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
    month: this.adjustZeroIndexedMonth(this.props.defaultDate),
    year: this.props.defaultDate.year(),
    dateVisible: false
  };

  public componentDidUpdate = (prevProps: DateInputProps) => {
    if (
      prevProps.selectedDate &&
      this.props.selectedDate &&
      prevProps.selectedDate !== this.props.selectedDate
    ) {
      this.setState({
        day: this.props.selectedDate.date(),
        month: this.adjustZeroIndexedMonth(this.props.selectedDate),
        // month: this.props.selectedDate.month(),
        year: this.props.selectedDate.year(),
        dateVisible: true
      });
    }
  };

  public render = () => (
    <fieldset css={dateInputCss} aria-describedby="validation-message">
      <input
        css={inputBoxCss}
        type="number"
        aria-label="day"
        placeholder="day"
        value={this.state.day}
        onChange={event => {
          const day = parseInt(event.target.value, 10);
          if (day > 0) {
            this.setState({ day }, this.pushStateUpwards);
          }
        }}
      />
      <div css={dividerCss}>/</div>
      <input
        css={inputBoxCss}
        type="number"
        aria-label="month"
        placeholder="month"
        value={this.state.month}
        onChange={event => {
          const month = parseInt(event.target.value, 10);
          if (month > 0) {
            this.setState(
              { month: parseInt(event.target.value, 10) },
              this.pushStateUpwards
            );
          }
        }}
      />
      <div css={dividerCss}>/</div>
      <span css={inputBoxCss} type="number">
        {this.state.year}
      </span>
    </fieldset>
  );

  private pushStateUpwards = () => this.props.onChange(this.state);

  // Moment months are zero-indexed, this allows input to match calendar view
  private adjustZeroIndexedMonth = (selectedDate: Moment) => {
    return selectedDate.month() + 1;
  };
}
