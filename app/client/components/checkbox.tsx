import React from "react";
import palette from "../colours";

export interface CheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
  checkboxFill?: string;
}

export const Checkbox = (props: CheckboxProps) => (
  <label
    css={{
      display: "flex",
      cursor: "pointer",
      userSelect: "none",
      ":hover .checkbox": {
        boxShadow: `0 0 0 3px ${palette.neutral["6"]}`
      }
    }}
  >
    <input
      type="checkbox"
      css={{
        display: "none"
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.onChange(event.target.checked)
      }
      checked={props.checked}
    />
    <div
      className="checkbox"
      css={{
        transition: "all .2s ease-in-out",
        border: props.checked ? undefined : `1px solid ${palette.neutral["4"]}`,
        minWidth: "18px",
        height: "18px",
        display: "inline-block",
        margin: "3px",
        marginRight: "10px",
        background: props.checked
          ? props.checkboxFill || palette.green.checkbox
          : undefined,
        position: "relative",
        outline: 0,
        ":focus": {
          boxShadow: `0 0 0 3px ${palette.yellow.medium}`
        }
      }}
      // accessibility props below
      role="checkbox"
      aria-checked={props.checked}
      tabIndex={0}
      onKeyPress={() => props.onChange(!props.checked)}
    >
      <div
        css={{
          position: "absolute",
          left: "3px",
          top: "5px",
          width: "12px",
          height: "6px",
          transform: "rotate(-45deg)",
          textAlign: "right"
        }}
      >
        <div
          css={{
            width: props.checked ? "12px" : "2px",
            height: "6px",
            borderColor: palette.white,
            borderWidth: "0 0 2px 2px",
            borderStyle: "solid",
            transition: "all .2s ease-in-out",
            transitionDelay: ".1s"
          }}
        />
      </div>
    </div>
    <span>{props.label}</span>
  </label>
);
