import { Property } from "csstype";
import palette from "../colours";
import { maxWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";

const inputBoxCss = {
  fontFamily: sans,
  border: 0,
  width: "50px",
  fontSize: "16px",
  appearance: "textfield" as Property.Appearance,
  textAlign: "center" as Property.TextAlign, // this cast shouldn't be required (weird TypeScript issue here)
  padding: 0,
  margin: 0,
};

const dayMonthCss = {
  ...inputBoxCss,
  width: "25px",
};

const dividerCss = {
  display: "inline-block",
  fontSize: "16px",
  padding: 0,
  margin: 0,
};

interface DateInputProps {
  date: Date;
  labelText: string;
  disabled?: boolean;
}

export const DateInput = (props: DateInputProps) => (
  <>
    <div
      css={{
        fontFamily: sans,
        fontSize: "14px",
        [maxWidth.desktop]: {
          display: "none",
        },
      }}
    >
      {props.labelText}
      <br />
    </div>
    <fieldset
      css={{
        border: "1px solid" + palette.neutral["5"],
        padding: "5px",
        whiteSpace: "nowrap",
        margin: 0,
      }}
      aria-describedby="validation-message"
      disabled={props.disabled}
    >
      <input
        css={dayMonthCss}
        aria-label="day"
        value={props.date.getDate()}
        readOnly // TODO: remove and replace with onChange when input boxes become active
      />
      <div css={dividerCss}>/</div>
      <input
        css={dayMonthCss}
        aria-label="month"
        value={props.date.getMonth() + 1}
        readOnly // TODO: remove and replace with onChange when input boxes become active
      />
      <div css={dividerCss}>/</div>
      <input
        css={inputBoxCss}
        aria-label="year"
        value={props.date.getFullYear()}
        readOnly // TODO: remove and replace with onChange when input boxes become active
      />
    </fieldset>
  </>
);
